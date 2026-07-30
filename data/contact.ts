import type { ContactPageContent } from '@/types/contact';

/**
 * Contact page content (/contact).
 *
 * The page runs on the `.hub-theme` token scope — OneSpheree Orange — because
 * contact, like the services hub, speaks for the whole company rather than one
 * division. Support-category cards keep their division's own colour inline
 * (the same hexes the hub cards and service pages use), so the queue a visitor
 * picks is visually the practice they will reach.
 */
export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: 'Contact OneSpheree',
    headline: ["Let's Build", 'Something', 'Exceptional', 'Together'],
    description:
      "Whether you're looking for strategic consulting, digital transformation, compliance support, workforce solutions, or business growth services, our team is ready to help.",
    primaryCta: { label: 'Start a Conversation', href: '#enquiry' },
    secondaryCta: { label: 'Schedule a Consultation', href: '#support' },
  },

  experience: {
    eyebrow: 'The Enquiry',
    headline: ['Tell Us About', 'Your Business'],
    description: [
      'Every engagement begins the same way — a conversation about where your business is today and what is standing between it and the next stage of growth.',
      'Tell us the shape of the problem. We will route your enquiry to the division that owns it, and come back with people who have solved it before, not a generic proposal.',
    ],
    assurances: [
      { icon: 'clock', label: 'One business day', detail: 'Every enquiry is acknowledged within 24 working hours.' },
      { icon: 'users', label: 'Specialists, not a queue', detail: 'You speak to the practice lead for your requirement.' },
      { icon: 'shield', label: 'Handled confidentially', detail: 'Commercial details stay between your team and ours.' },
    ],
    form: {
      eyebrow: 'Enquiry Form',
      title: 'Send us the brief',
      note: 'Fields marked with an asterisk are required.',
      submitLabel: 'Send Message',
      pendingLabel: 'Sending…',
    },
  },

  offices: {
    eyebrow: 'Office Information',
    headline: 'Where to find us, and when.',
    intro:
      'One head office, a nationwide delivery footprint, and a single point of accountability for every engagement — whichever division you are working with.',
    cards: [
      {
        id: 'head-office',
        icon: 'briefcase',
        kind: 'Head Office',
        title: 'OneSpheree',
        lines: [{ text: 'Salt Lake Sector V' }, { text: 'Kolkata, West Bengal 700091' }, { text: 'India' }],
        note: 'Visits by appointment — tell us a time and we will confirm the same day.',
      },
      {
        id: 'email',
        icon: 'mail',
        kind: 'Email',
        title: 'Write to us',
        lines: [
          { text: 'Info@Onespheree.com', href: 'mailto:Info@Onespheree.com' },
          { text: 'Careers@Onespheree.com', href: 'mailto:Careers@Onespheree.com' },
        ],
        note: 'General enquiries and new business both arrive at the first address.',
      },
      {
        id: 'phone',
        icon: 'phone',
        kind: 'Phone',
        title: 'Talk to us',
        lines: [
          { text: '+91 33 4602 8100', href: 'tel:+913346028100' },
          { text: '+91 98300 22400', href: 'tel:+919830022400' },
        ],
        note: 'Reception routes you to the right practice — no switchboard maze.',
      },
      {
        id: 'hours',
        icon: 'clock',
        kind: 'Business Hours',
        title: 'When we are open',
        lines: [
          { text: 'Monday – Friday · 9:30 to 18:30 IST' },
          { text: 'Saturday · 10:00 to 14:00 IST' },
          { text: 'Sunday · Closed' },
        ],
        note: 'Fire & Safety maintenance contracts are supported outside these hours.',
      },
      {
        id: 'coverage',
        icon: 'globe',
        kind: 'Location & Coverage',
        title: 'Delivering across India',
        lines: [
          { text: 'Kolkata · Delhi · Mumbai' },
          { text: 'Hyderabad · Bangalore' },
          { text: 'Pan-India project teams' },
        ],
        note: 'International engagements are run remotely from the Kolkata office.',
      },
    ],
  },

  location: {
    eyebrow: 'Find the Office',
    headline: 'Salt Lake Sector V, Kolkata.',
    description:
      "The head office sits in Kolkata's technology district — ten minutes from Sector V's transit spine and a short drive from the bypass. Park on site; reception is on the ground floor.",
    districts: ['Sector V', 'Technopolis', 'Bypass', 'Transit Hub'],
    address: ['OneSpheree', 'Salt Lake Sector V', 'Kolkata, West Bengal 700091', 'India'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Salt+Lake+Sector+V%2C+Kolkata%2C+West+Bengal+700091',
    mapsLabel: 'View on Google Maps',
  },

  support: {
    eyebrow: 'Business Support',
    headline: 'Reach the desk that owns your question.',
    intro:
      'Seven queues, seven teams. Pick the one closest to your requirement and your enquiry lands with the people who handle it every day.',
    categories: [
      {
        id: 'sales-consulting',
        motif: 'consulting',
        name: 'Sales & Consulting',
        description:
          'Growth strategy, market entry, sales enablement and the operating model that has to carry it.',
        email: 'Info@Onespheree.com',
        href: '/services/sales-consulting',
        accent: '#06B6D4',
      },
      {
        id: 'digital-marketing',
        motif: 'marketing',
        name: 'Digital Marketing',
        description: 'Performance media, SEO, content and brand — measured against pipeline, not impressions.',
        email: 'Info@Onespheree.com',
        href: '/services/digital-marketing',
        accent: '#8B5CF6',
      },
      {
        id: 'due-diligence',
        motif: 'diligence',
        name: 'Due Diligence',
        description: 'Corporate, financial, legal, vendor and employee verification before you commit.',
        email: 'Info@Onespheree.com',
        href: '/services/due-diligence',
        accent: '#10B981',
      },
      {
        id: 'fire-safety',
        motif: 'safety',
        name: 'Fire & Safety',
        description: 'Detection and protection systems, installation, audits, training and annual maintenance.',
        email: 'Info@Onespheree.com',
        href: '/services/fire-safety',
        accent: '#C9392B',
      },
      {
        id: 'manpower',
        motif: 'manpower',
        name: 'Manpower Solutions',
        description: 'Permanent and contract staffing, executive search, RPO, payroll and workforce management.',
        email: 'Info@Onespheree.com',
        href: '/services/manpower-solutions',
        accent: '#2563EB',
      },
      {
        id: 'reselling',
        motif: 'commerce',
        name: 'Reselling & E-Commerce',
        description: 'Marketplace listings, catalogue and order operations, and the storefront behind them.',
        email: 'Info@Onespheree.com',
        href: '/services/e-commerce',
        accent: '#F59E0B',
      },
      {
        id: 'general',
        motif: 'general',
        name: 'General Enquiries',
        description: 'Partnerships, careers, press, invoicing — anything that does not belong to one division.',
        email: 'Info@Onespheree.com',
        accent: '#F26B21',
      },
    ],
  },

  faq: {
    eyebrow: 'Before You Write',
    headline: 'Questions we are asked first.',
    intro: 'The practical answers — response times, scope, meetings and how an engagement actually starts.',
    entries: [
      {
        q: 'How quickly do you respond?',
        a: 'Every enquiry is acknowledged within one business day, and the practice lead for your requirement replies within two. Fire & Safety maintenance callouts under an active contract are answered the same day, including outside office hours.',
      },
      {
        q: 'Do you offer custom solutions?',
        a: 'Almost always. Our six divisions are the building blocks, not the product — most engagements combine two or three of them into one scope with one contract and one point of accountability. Tell us the outcome you need and we will propose the shape.',
      },
      {
        q: 'Can we schedule meetings?',
        a: 'Yes. Pick "Schedule a Consultation" or say so in your message and we will send two or three slots within a business day. First conversations run 30 to 45 minutes, remote by default, in person at the Kolkata office or your site if that is easier.',
      },
      {
        q: 'Do you work internationally?',
        a: 'We do. Delivery teams are based in India with a nationwide project footprint, and international engagements are run remotely from the Kolkata office with a schedule that overlaps your working hours. On-site work outside India is arranged per project.',
      },
      {
        q: 'How do projects begin?',
        a: 'A discovery call, then a written scope: objectives, workstreams, the team assigned, milestones and commercials. Discovery usually starts within a business week of the first conversation, and most engagements reach a signed roadmap inside a month.',
      },
      {
        q: 'What should I include in my enquiry?',
        a: 'The service you need, roughly where your business is today, and any date you are working towards. That is enough for us to put the right specialist on the reply — details, documents and diligence can follow once we know who is talking to whom.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'The Next Step',
    headline: ['Your Next Business', 'Success Story', 'Starts Here'],
    description:
      "Let's discuss your goals and build solutions that help your business grow with confidence.",
    primaryCta: { label: 'Contact Our Team', href: '#enquiry' },
    secondaryCta: { label: 'Book a Meeting', href: 'mailto:Info@Onespheree.com?subject=Meeting%20request' },
    signature: 'One Vision. Endless Solutions.',
  },
};

/* ── form option lists ──────────────────────────────────────────────────── */

/** Business type is optional context, so the list stays short and inclusive. */
export const BUSINESS_TYPES = [
  'Startup',
  'Small or Medium Business',
  'Large Enterprise',
  'Government or PSU',
  'Non-Profit or NGO',
  'Individual or Sole Proprietor',
  'Other',
] as const;

/** Required — this is what routes the enquiry to a practice. */
export const SERVICE_OPTIONS = [
  'Sales & Consulting',
  'Digital Marketing',
  'Due Diligence',
  'Fire & Safety',
  'Manpower Solutions',
  'Reselling & E-Commerce',
  'Multiple Services',
  'General Enquiry',
] as const;
