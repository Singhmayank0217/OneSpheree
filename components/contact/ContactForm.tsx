'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@/components/ds/Icon';
import { ContactModal } from './ContactModal';
import { submitEnquiry } from '@/app/contact/actions';
import { BUSINESS_TYPES, SERVICE_OPTIONS } from '@/data/contact';
import {
  EMPTY_VALUES,
  FIELD_LABELS,
  REQUIRED_FIELDS,
  validateContact,
  validateField,
} from '@/lib/contact-validation';
import { CONTACT_FIELDS, type ContactErrors, type ContactField, type ContactValues } from '@/types/contact';
import type { ContactExperienceContent } from '@/types/contact';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * The enquiry form — the page's centrepiece.
 *
 * A glass panel on the dark stage: hairline border, a barely-there fill, and
 * per-field orange lighting on focus (an edge bar draws across the top of the
 * field and a warm ring lifts off it). Labels are permanent rather than
 * placeholder-only, because a form this long is unusable once the placeholder
 * disappears.
 *
 * Motion: the fields REVEAL PROGRESSIVELY — each one is uncovered by a
 * clip-path wipe on a stagger when the panel scrolls in, so the form assembles
 * top-to-bottom instead of fading in as a block.
 *
 * Submission: validated here for immediate inline messages, re-validated in the
 * Server Action (the authority), delivered by Resend server-side. While a
 * request is in flight the button is disabled and shows a spinner, so a double
 * click cannot produce a second enquiry; the outcome is a success or error
 * dialog. A failed send never clears what the visitor typed.
 */

interface FieldSpec {
  name: ContactField;
  control: 'input' | 'select' | 'textarea';
  type?: string;
  placeholder: string;
  autoComplete?: string;
  options?: readonly string[];
  /** spans both columns of the grid */
  wide?: boolean;
}

const FIELDS: FieldSpec[] = [
  { name: 'fullName', control: 'input', type: 'text', placeholder: 'Priya Sharma', autoComplete: 'name' },
  {
    name: 'companyName',
    control: 'input',
    type: 'text',
    placeholder: 'Acme Industries Pvt. Ltd.',
    autoComplete: 'organization',
  },
  { name: 'email', control: 'input', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { name: 'phone', control: 'input', type: 'tel', placeholder: '+91 98300 00000', autoComplete: 'tel' },
  { name: 'businessType', control: 'select', placeholder: 'Select business type', options: BUSINESS_TYPES },
  { name: 'service', control: 'select', placeholder: 'Select a service', options: SERVICE_OPTIONS },
  {
    name: 'message',
    control: 'textarea',
    placeholder:
      'Where is your business today, what do you need, and is there a date you are working towards?',
    wide: true,
  },
];

const SUCCESS_COPY = [
  'Thank you for contacting OneSpheree. We have received your enquiry successfully.',
  'Our team will review your request and get back to you as soon as possible.',
];

const ERROR_COPY = ["We couldn't send your enquiry at the moment.", 'Please try again in a few moments.'];

/**
 * Colours for the native `<option>` list. The OS paints this popup outside the
 * page's own stacking context, so it cannot inherit the panel's glass surface —
 * it needs literal values, and it needs them on every option. Both are DS
 * tokens: the elevated dark surface and on-dark text, which clears AA contrast
 * comfortably (≈14:1).
 */
const OPTION_STYLE = {
  backgroundColor: 'var(--surface-dark-elevated)',
  color: 'var(--text-on-dark)',
} as const;

/** Field shell — owns the glass surface, the focus lighting and the error state. */
function Field({
  spec,
  value,
  error,
  onChange,
  onBlur,
}: {
  spec: FieldSpec;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const id = `contact-${spec.name}`;
  const errorId = `${id}-error`;
  const required = REQUIRED_FIELDS.includes(spec.name);
  const invalid = Boolean(error);

  const controlBase =
    'peer w-full bg-transparent px-4 py-[13px] font-sans text-[1rem] text-ondark outline-none placeholder:text-[rgba(167,173,187,.55)]';

  return (
    <div data-form-field="" className={cn('flex flex-col gap-2', spec.wide && 'sm:col-span-2')}>
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-[length:var(--text-label-size)] font-semibold text-ondark-muted"
      >
        {FIELD_LABELS[spec.name]}
        {required && (
          <span aria-hidden="true" className="text-[var(--violet-300)]">
            *
          </span>
        )}
        {!required && <span className="font-normal text-[rgba(167,173,187,.6)]">(optional)</span>}
      </label>

      <div
        className={cn(
          'group relative rounded-lg border bg-[rgba(255,255,255,.028)] transition-[border-color,background-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out)]',
          invalid
            ? 'border-[rgba(224,102,102,.55)]'
            : 'border-[rgba(255,255,255,.10)] focus-within:border-[color-mix(in_srgb,var(--violet-400)_62%,transparent)] focus-within:bg-[rgba(255,255,255,.05)] focus-within:shadow-[0_0_30px_-6px_color-mix(in_srgb,var(--violet-500)_55%,transparent)]'
        )}
      >
        {/* the orange edge that draws across the field on focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-px origin-left scale-x-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-focus-within:scale-x-100"
          style={{ background: 'linear-gradient(90deg, transparent, var(--violet-300), transparent)' }}
        />

        {spec.control === 'input' && (
          <input
            id={id}
            name={spec.name}
            type={spec.type}
            value={value}
            placeholder={spec.placeholder}
            autoComplete={spec.autoComplete}
            required={required}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={controlBase}
          />
        )}

        {spec.control === 'textarea' && (
          <textarea
            id={id}
            name={spec.name}
            rows={5}
            value={value}
            placeholder={spec.placeholder}
            required={required}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={cn(controlBase, 'resize-y min-h-[132px] leading-[1.6]')}
          />
        )}

        {spec.control === 'select' && (
          <>
            <select
              id={id}
              name={spec.name}
              value={value}
              required={required}
              aria-invalid={invalid}
              aria-describedby={invalid ? errorId : undefined}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              // The native popup is painted by the OS, not by this panel, so it
              // has to be given real colours of its own: `colorScheme` puts the
              // list into dark mode, and each option carries an explicit
              // background and text colour because a transparent control leaves
              // the popup inheriting whatever the platform picks — which is how
              // the list ended up near-invisible. The closed control keeps a
              // solid surface for the same reason.
              style={{ colorScheme: 'dark', backgroundColor: 'var(--surface-dark-elevated)' }}
              className={cn(
                controlBase,
                'cursor-pointer appearance-none pr-11',
                !value && 'text-[rgba(167,173,187,.72)]'
              )}
            >
              <option value="" style={OPTION_STYLE}>
                {spec.placeholder}
              </option>
              {spec.options?.map((option) => (
                <option key={option} value={option} style={OPTION_STYLE}>
                  {option}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ondark-muted transition-colors duration-[var(--duration-base)] group-focus-within:text-[var(--violet-300)]"
            />
          </>
        )}
      </div>

      {invalid && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-[6px] text-[length:var(--text-caption-size)]"
          style={{ color: 'color-mix(in srgb, var(--red-500) 42%, #ffffff)' }}
        >
          <Icon name="alertTriangle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ content }: { content: ContactExperienceContent['form'] }) {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sending, setSending] = useState(false);
  const [outcome, setOutcome] = useState<'success' | 'error' | null>(null);
  const [status, setStatus] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  /* progressive reveal — each field uncovered in turn as the panel arrives */
  useEffect(() => {
    const el = panelRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-form-chrome]', { opacity: 0, y: 16 });
      gsap.set('[data-form-field]', { opacity: 0, y: 20, clipPath: 'inset(0% 0% 100% 0%)' });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
        .to('[data-form-chrome]', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0)
        .to(
          '[data-form-field]',
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.085,
            // the clip is dropped once it has done its job — a surviving clip
            // region would cut the select's native popup on some browsers
            onComplete: () => gsap.set('[data-form-field]', { clearProps: 'clipPath' }),
          },
          0.18
        );
    }, el);
    return () => ctx.revert();
  }, []);

  const setField = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // once a field is flagged, clear the flag as soon as it becomes valid —
    // never introduce a new one mid-typing
    setErrors((prev) => {
      if (!prev[field]) return prev;
      if (validateField(field, value)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const blurField = (field: ContactField) => {
    const message = validateField(field, values[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = CONTACT_FIELDS.find((field) => found[field]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return; // in-flight guard: no duplicate enquiries

    const found = validateContact(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus('Some details need attention before this can be sent.');
      focusFirstError(found);
      return;
    }

    setSending(true);
    setStatus('Sending your enquiry…');
    try {
      const result = await submitEnquiry(values);
      if (result.ok) {
        setValues(EMPTY_VALUES);
        setErrors({});
        setStatus('Your enquiry has been sent.');
        setOutcome('success');
      } else if (result.reason === 'validation') {
        setErrors(result.errors);
        setStatus('Some details need attention before this can be sent.');
        focusFirstError(result.errors);
      } else {
        // the visitor's input is deliberately left untouched so they can retry
        setStatus('Your enquiry could not be sent.');
        setOutcome('error');
      }
    } catch {
      setStatus('Your enquiry could not be sent.');
      setOutcome('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div
        ref={panelRef}
        className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,.09)] p-6 shadow-dark-lg sm:p-8 lg:p-10"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,255,255,.055), rgba(255,255,255,.014) 42%, rgba(255,255,255,.03))',
          backdropFilter: 'blur(14px)',
        }}
      >
        {/* the panel's own light — warm, top-left, static */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(72% 48% at 12% 0%, color-mix(in srgb, var(--violet-500) 14%, transparent), transparent 68%)',
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)' }}
        />

        <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={sending} className="relative">
          <div data-form-chrome="">
            <p className="t-eyebrow t-eyebrow-ondark">{content.eyebrow}</p>
            <h3 className="t-h3 ondark-heading mt-2">{content.title}</h3>
            <p className="mt-2 text-[length:var(--text-body-sm-size)] text-ondark-muted">{content.note}</p>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {FIELDS.map((spec) => (
              <Field
                key={spec.name}
                spec={spec}
                value={values[spec.name]}
                error={errors[spec.name]}
                onChange={(value) => setField(spec.name, value)}
                onBlur={() => blurField(spec.name)}
              />
            ))}
          </div>

          <div
            data-form-field=""
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <button
              ref={submitRef}
              type="submit"
              disabled={sending}
              className={cn(
                'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent px-[26px] py-[14px] font-sans text-[1rem] font-semibold tracking-[.01em] text-white transition-[background-color,transform,box-shadow,opacity] duration-[var(--duration-fast)]',
                sending
                  ? 'cursor-wait bg-primary-hover opacity-80'
                  : 'cursor-pointer bg-primary hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--violet-500)_85%,transparent)] active:translate-y-0 active:scale-[.98]'
              )}
            >
              {sending ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/35 border-t-white"
                  />
                  {content.pendingLabel}
                </>
              ) : (
                <>
                  {content.submitLabel}
                  <Icon name="arrowRight" size={20} />
                </>
              )}
            </button>

            <p className="text-[length:var(--text-caption-size)] text-ondark-muted sm:max-w-[26ch] sm:text-right">
              Sent straight to our enquiries desk — no third-party forms.
            </p>
          </div>

          {/* screen-reader narration for every state change */}
          <p aria-live="polite" role="status" className="sr-only">
            {status}
          </p>
        </form>
      </div>

      <ContactModal
        open={outcome === 'success'}
        variant="success"
        title="Thank You!"
        message={SUCCESS_COPY}
        actionLabel="Close"
        onClose={() => setOutcome(null)}
        returnFocusRef={submitRef}
      />
      <ContactModal
        open={outcome === 'error'}
        variant="error"
        title="Something Went Wrong"
        message={ERROR_COPY}
        actionLabel="Try Again"
        onClose={() => setOutcome(null)}
        returnFocusRef={submitRef}
      />
    </>
  );
}
