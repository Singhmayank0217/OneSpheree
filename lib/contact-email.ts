import { FIELD_LABELS } from '@/lib/contact-validation';
import { CONTACT_FIELDS, type ContactValues } from '@/types/contact';

/**
 * Enquiry delivery — server-only.
 *
 * Sends through Resend's REST API with `fetch` rather than the `resend` npm
 * package: the request is nine lines, and this project deliberately ships a
 * minimal dependency set (gsap / lenis / three / clsx). Swapping in the SDK
 * later means replacing `deliverEnquiry` and nothing else.
 *
 * The API key never leaves the server — this module is imported only by the
 * `'use server'` action in app/contact/actions.ts.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Where enquiries land. Overridable per environment, but this is the default. */
const DEFAULT_TO = 'Info@Onespheree.com';

/**
 * Resend requires the From domain to be verified in the account. Until
 * onespheree.com is verified there, set CONTACT_FROM_EMAIL to Resend's
 * onboarding sender (`onboarding@resend.dev`).
 */
const DEFAULT_FROM = 'OneSpheree Website <no-reply@onespheree.com>';

export type DeliveryOutcome =
  | { ok: true }
  | { ok: false; reason: 'config' | 'delivery'; detail: string };

/** Submission timestamp in the office's own timezone, spelled out. */
function submittedAt(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

/** Minimal HTML escaping — every value below is visitor-supplied. */
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The rows of the enquiry, in form order, with empty optionals spelled out. */
function rows(values: ContactValues) {
  return CONTACT_FIELDS.map((field) => ({
    label: FIELD_LABELS[field],
    value: values[field] || '—',
    multiline: field === 'message',
  }));
}

function buildHtml(values: ContactValues, timestamp: string) {
  const body = rows(values)
    .map(
      ({ label, value, multiline }) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #EDEFF3;font:600 13px/1.4 Helvetica,Arial,sans-serif;color:#636B7A;vertical-align:top;white-space:nowrap;">${esc(
          label
        )}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #EDEFF3;font:400 15px/1.6 Helvetica,Arial,sans-serif;color:#12151C;${
          multiline ? 'white-space:pre-wrap;' : ''
        }">${esc(value)}</td>
      </tr>`
    )
    .join('');

  return `<!doctype html>
<html><body style="margin:0;background:#F6F7FA;padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #EDEFF3;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:24px 24px 20px;background:#0A0C10;">
        <p style="margin:0;font:700 11px/1.2 Helvetica,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#FFA46B;">New Website Enquiry</p>
        <p style="margin:8px 0 0;font:700 22px/1.25 Helvetica,Arial,sans-serif;color:#FFFFFF;">OneSpheree — Contact Form</p>
        <p style="margin:6px 0 0;font:400 13px/1.5 Helvetica,Arial,sans-serif;color:#A7ADBB;">Submitted ${esc(
          timestamp
        )} (IST)</p>
      </td>
    </tr>
    <tr><td style="padding:8px 8px 16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table></td></tr>
    <tr>
      <td style="padding:16px 24px 24px;">
        <p style="margin:0;font:400 12px/1.6 Helvetica,Arial,sans-serif;color:#8891A0;">Replying to this email goes straight to ${esc(
          values.email
        )}.</p>
      </td>
    </tr>
  </table>
</body></html>`;
}

function buildText(values: ContactValues, timestamp: string) {
  const lines = rows(values).map(({ label, value }) => `${label}: ${value}`);
  return [`New website enquiry — OneSpheree`, `Submitted: ${timestamp} (IST)`, '', ...lines].join('\n');
}

/**
 * Posts the enquiry to Resend. `config` failures mean the environment is not
 * set up (missing key); `delivery` failures mean Resend rejected or the network
 * failed — both are reported to the visitor as "try again", never as detail.
 */
export async function deliverEnquiry(values: ContactValues): Promise<DeliveryOutcome> {
  // Local development without burning Resend quota (or without a key at all):
  // CONTACT_DRY_RUN=1 logs the enquiry to the server console and reports
  // success, so the whole submit → loading → confirmation flow can be worked on
  // offline. Ignored unless NODE_ENV is development, so it can never silently
  // swallow a real enquiry in production.
  if (process.env.CONTACT_DRY_RUN === '1' && process.env.NODE_ENV === 'development') {
    console.info(`[contact] DRY RUN — enquiry not sent:\n${buildText(values, submittedAt())}`);
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: 'config', detail: 'RESEND_API_KEY is not set' };
  }

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const timestamp = submittedAt();
  const subject = `New enquiry — ${values.service} — ${values.fullName}${
    values.companyName ? ` (${values.companyName})` : ''
  }`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        // the team can reply to the enquiry directly from their inbox
        reply_to: values.email,
        subject,
        html: buildHtml(values, timestamp),
        text: buildText(values, timestamp),
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return { ok: false, reason: 'delivery', detail: `Resend responded ${response.status}: ${detail.slice(0, 500)}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: 'delivery', detail: error instanceof Error ? error.message : 'unknown network error' };
  }
}
