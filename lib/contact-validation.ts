import { CONTACT_FIELDS, type ContactErrors, type ContactField, type ContactValues } from '@/types/contact';

/**
 * The single validation rulebook for the enquiry form — imported by the client
 * component (inline messages as the visitor leaves each field) AND by the
 * server action (the authoritative pass, because a client can never be
 * trusted). Deliberately dependency-free: this project ships gsap, lenis,
 * three and clsx only, and one shared pure module is cheaper than a schema
 * library for seven fields.
 */

/** Fields the visitor must complete. Company name and business type are optional. */
export const REQUIRED_FIELDS: ContactField[] = ['fullName', 'email', 'phone', 'service', 'message'];

export const FIELD_LABELS: Record<ContactField, string> = {
  fullName: 'Full name',
  companyName: 'Company name',
  email: 'Email address',
  phone: 'Phone number',
  businessType: 'Business type',
  service: 'Service interested in',
  message: 'Message',
};

/** Upper bounds — generous for humans, tight enough to keep a payload sane. */
const MAX_LENGTH: Record<ContactField, number> = {
  fullName: 120,
  companyName: 160,
  email: 200,
  phone: 32,
  businessType: 80,
  service: 120,
  message: 4000,
};

export const EMPTY_VALUES: ContactValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  businessType: '',
  service: '',
  message: '',
};

/** Pragmatic address shape — one @, a dotted domain, no whitespace. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Digits, with the punctuation people actually type: + ( ) - . and spaces. */
const PHONE_ALLOWED_RE = /^[+()\-.\s\d]+$/;

/** Normalises unknown input (FormData, JSON, anything) into the value shape. */
export function toContactValues(input: unknown): ContactValues {
  const source = (input ?? {}) as Record<string, unknown>;
  const values = { ...EMPTY_VALUES };
  for (const field of CONTACT_FIELDS) {
    const raw = source[field];
    values[field] = typeof raw === 'string' ? raw.trim().slice(0, MAX_LENGTH[field]) : '';
  }
  return values;
}

/** Validates one field in isolation — used for on-blur inline messages. */
export function validateField(field: ContactField, value: string): string | undefined {
  const v = value.trim();

  if (!v) {
    return REQUIRED_FIELDS.includes(field) ? `${FIELD_LABELS[field]} is required.` : undefined;
  }

  switch (field) {
    case 'fullName':
      if (v.length < 2) return 'Please enter your full name.';
      return undefined;
    case 'email':
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
      return undefined;
    case 'phone': {
      if (!PHONE_ALLOWED_RE.test(v)) return 'Please use digits, spaces, + ( ) or -.';
      const digits = v.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number.';
      return undefined;
    }
    case 'message':
      if (v.length < 10) return 'Please tell us a little more — 10 characters or more.';
      return undefined;
    default:
      return undefined;
  }
}

/** Validates the whole enquiry. An empty object means it is ready to send. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
