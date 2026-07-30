'use server';

import { deliverEnquiry } from '@/lib/contact-email';
import { toContactValues, validateContact } from '@/lib/contact-validation';
import type { ContactResult } from '@/types/contact';

/**
 * The enquiry endpoint — a Server Action, so no route handler, no client-side
 * API key, and no email library in the browser bundle. It re-validates
 * everything (the client's inline messages are a courtesy, not a gate), then
 * hands off to `deliverEnquiry`.
 *
 * Failures are returned, never thrown: the form turns them into the error
 * modal and keeps the visitor's typing intact. Internal detail is logged
 * server-side only.
 */

/**
 * Cheap in-process replay guard. The form already disables its own button
 * while a request is in flight; this catches the double-submit that survives a
 * fast double-click or a retried request, and it deliberately reports success
 * so the visitor is not told their (already delivered) enquiry failed.
 *
 * Module scope, so it is per server instance and evaporates on restart — this
 * is a courtesy, not rate limiting.
 */
const RECENT_WINDOW_MS = 60_000;
const recent = new Map<string, number>();

function isReplay(key: string) {
  const now = Date.now();
  for (const [k, at] of recent) if (now - at > RECENT_WINDOW_MS) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

export async function submitEnquiry(input: unknown): Promise<ContactResult> {
  const values = toContactValues(input);

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: 'validation', errors };
  }

  if (isReplay(`${values.email}|${values.message}`)) {
    return { ok: true };
  }

  const outcome = await deliverEnquiry(values);
  if (outcome.ok) return { ok: true };

  // a failed send must not keep its replay lock — the visitor will retry
  recent.delete(`${values.email}|${values.message}`);
  console.error(`[contact] enquiry delivery failed (${outcome.reason}): ${outcome.detail}`);

  return {
    ok: false,
    reason: outcome.reason,
    message: "We couldn't send your enquiry at the moment. Please try again in a few moments.",
  };
}
