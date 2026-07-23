import type { ServicePageContent } from '@/types/service-page';

/** Fire & Safety — Milestone 1: Hero, Overview, Detection, Suppression, Fighting. */
export const fireSafetyPage: ServicePageContent = {
  slug: 'fire-safety',

  hero: {
    eyebrow: 'Fire Protection & Life Safety',
    headline: 'Complete Fire Protection & Life Safety Solutions',
    description: [
      'Protecting lives, assets, and infrastructure through world-class fire protection engineering and safety solutions.',
    ],
    primaryCta: { label: 'Request Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Fire Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'One engineering team carries your building from design and installation through commissioning, compliance and lifetime care.',
    highlights: ['design and installation', 'commissioning, compliance and lifetime care'],
    support:
      'OneSpheree’s Fire & Safety division delivers complete fire protection engineering — detection, suppression and fire-fighting systems designed to code, installed to specification, commissioned with evidence, and kept certified through maintenance and audits.',
    pillars: [
      { icon: 'pen', label: 'Design', blurb: 'Code-compliant system engineering, from concept to approved drawings.' },
      { icon: 'wrench', label: 'Installation', blurb: 'Certified execution around live operations, disruption last.' },
      { icon: 'clipboardCheck', label: 'Commissioning', blurb: 'Every device tested, witnessed and signed off with evidence.' },
      { icon: 'refresh', label: 'Maintenance & Audits', blurb: 'Scheduled care and audits that keep certification current.' },
    ],
  },

  sections: [
    {
      id: 'fire-detection',
      index: '01',
      eyebrow: 'Early warning',
      headline: 'Fire Detection Systems',
      description: 'Protect buildings with intelligent fire detection technologies.',
      itemsLabel: 'Systems we engineer',
      items: [
        { icon: 'cpu', label: 'Addressable Fire Alarm Systems' },
        { icon: 'bell', label: 'Conventional Fire Alarm Systems' },
        { icon: 'wind', label: 'Smoke Detection' },
        { icon: 'thermometer', label: 'Heat Detection' },
      ],
    },
    {
      id: 'fire-suppression',
      index: '02',
      eyebrow: 'Asset protection',
      headline: 'Fire Suppression Systems',
      description: 'Protect critical assets using advanced suppression technologies.',
      itemsLabel: 'Suppression technologies',
      items: [
        { icon: 'database', label: 'FM200 Systems' },
        { icon: 'flask', label: 'Novec 1230' },
        { icon: 'cloud', label: 'CO₂ Suppression' },
        { icon: 'layers', label: 'Foam Systems' },
        { icon: 'droplets', label: 'Water Mist Systems' },
        { icon: 'sparkles', label: 'Clean Agent Systems' },
      ],
    },
    {
      id: 'fire-fighting',
      index: '03',
      eyebrow: 'Water-based protection',
      headline: 'Fire Fighting Systems',
      description: 'Reliable water-based fire protection systems for commercial and industrial facilities.',
      itemsLabel: 'Systems we deliver',
      items: [
        { icon: 'droplet', label: 'Hydrant Systems' },
        { icon: 'droplets', label: 'Sprinkler Systems' },
        { icon: 'gauge', label: 'Fire Pumps' },
        { icon: 'refresh', label: 'Hose Reel Systems' },
        { icon: 'settings', label: 'Landing Valves' },
      ],
    },
    {
      id: 'design-engineering',
      index: '04',
      eyebrow: 'Precision planning',
      headline: 'Design & Engineering',
      description: 'Precision engineering and planning for compliant fire protection systems.',
      itemsLabel: 'Deliverables',
      items: [
        { icon: 'pen', label: 'AutoCAD Drawings' },
        { icon: 'droplet', label: 'Hydraulic Calculations' },
        { icon: 'fileText', label: 'BOQ Preparation' },
        { icon: 'layoutGrid', label: 'Shop Drawings' },
      ],
    },
    {
      id: 'installation',
      index: '05',
      eyebrow: 'Site execution',
      headline: 'Installation',
      description: 'End-to-end deployment by experienced fire safety professionals.',
      itemsLabel: 'Delivery stages',
      items: [
        { icon: 'truck', label: 'Supply' },
        { icon: 'wrench', label: 'Installation' },
        { icon: 'clipboardCheck', label: 'Testing' },
        { icon: 'fileCheck', label: 'Commissioning' },
      ],
    },
    {
      id: 'amc-services',
      index: '06',
      eyebrow: 'Lifetime care',
      headline: 'AMC Services',
      description: 'Long-term maintenance that ensures every system remains operational.',
      itemsLabel: 'Coverage',
      items: [
        { icon: 'refresh', label: 'Preventive Maintenance' },
        { icon: 'zap', label: 'Breakdown Support' },
        { icon: 'calendar', label: 'Annual Testing' },
        { icon: 'fileCheck', label: 'Compliance Reports' },
      ],
    },
    {
      id: 'safety-audit',
      index: '07',
      eyebrow: 'Compliance & readiness',
      headline: 'Safety Audit',
      description: 'Evaluate compliance, identify risks, and improve fire readiness.',
      itemsLabel: 'Audit services',
      items: [
        { icon: 'target', label: 'Fire Risk Assessment' },
        { icon: 'fileCheck', label: 'Fire NOC Assistance' },
        { icon: 'shield', label: 'NFPA Compliance' },
        { icon: 'clipboardCheck', label: 'IS Code Compliance' },
      ],
    },
  ],

  /* ── Milestone 3 ─────────────────────────────────────────────────────── */

  industries: {
    headline: 'Industries We Protect',
    intro:
      'Our fire protection engineering is tailored for the buildings and facilities where life safety and business continuity cannot be compromised.',
    items: [
      { icon: 'building', label: 'Commercial Buildings', wide: true },
      { icon: 'heart', label: 'Hospitals' },
      { icon: 'star', label: 'Hotels' },
      { icon: 'factory', label: 'Factories', wide: true },
      { icon: 'truck', label: 'Warehouses' },
      { icon: 'database', label: 'Data Centres', wide: true },
      { icon: 'graduationCap', label: 'Educational Institutions' },
    ],
  },

  why: {
    headline: 'Why Businesses Choose OneSpheree',
    features: [
      {
        icon: 'award',
        title: 'Certified Fire Safety Engineers',
        blurb: 'Chartered specialists who design and sign off to code, not to guesswork.',
        featured: true,
      },
      {
        icon: 'layers',
        title: 'End-to-End Engineering',
        blurb: 'One accountable team from design through commissioning and lifetime care.',
        featured: true,
      },
      {
        icon: 'shield',
        title: 'NFPA & IS Compliance',
        blurb: 'Every system engineered and documented against the applicable standards.',
      },
      {
        icon: 'sparkles',
        title: 'High Quality Equipment',
        blurb: 'Approved, listed components from manufacturers we trust in the field.',
      },
      {
        icon: 'refresh',
        title: 'Annual Maintenance',
        blurb: 'Scheduled care that keeps every system operational and certified.',
      },
      {
        icon: 'zap',
        title: 'Fast Response',
        blurb: 'Rapid breakdown support that minimises unprotected time.',
      },
      {
        icon: 'users',
        title: 'Experienced Team',
        blurb: 'Site professionals with a track record across complex facilities.',
      },
      {
        icon: 'globe',
        title: 'Nationwide Support',
        blurb: 'Coverage that scales with your portfolio, wherever it operates.',
      },
    ],
  },

  process: {
    headline: 'Our Fire Protection Process',
    steps: [
      { title: 'Site Assessment' },
      { title: 'System Design' },
      { title: 'Engineering Approval' },
      { title: 'Equipment Procurement' },
      { title: 'Installation' },
      { title: 'Testing & Commissioning' },
      { title: 'Compliance Certification' },
      { title: 'AMC & Ongoing Maintenance' },
    ],
  },

  outcomes: {
    headline: 'Business Outcomes',
    cards: [
      { label: 'Safer Facilities', blurb: 'Protection engineered around the people and operations inside.', stat: { value: 100, suffix: '%' } },
      { label: 'Regulatory Compliance', blurb: 'Standing that clears audits and certification the first time.', stat: { value: 100, suffix: '%' } },
      { label: 'Reduced Fire Risk', blurb: 'Hazards designed out before they can become incidents.', stat: { prefix: '−', value: 71, suffix: '%' } },
      { label: 'Improved Emergency Readiness', blurb: 'Detection, alarm and response proven, tested and rehearsed.', stat: { value: 3, suffix: 'x' } },
      { label: 'Long-Term Asset Protection', blurb: 'Critical assets shielded for the life of the building.', stat: { prefix: '+', value: 24, suffix: 'yr' } },
      { label: 'Reliable Fire Infrastructure', blurb: 'Systems kept operational through maintenance and audits.', stat: { value: 99, suffix: '%' } },
    ],
  },

  cta: {
    headline: 'Protect What Matters Most',
    description: [
      'Partner with OneSpheree to design, install, maintain, and optimize fire protection systems that safeguard lives, assets, and business continuity.',
    ],
    primaryCta: { label: 'Request Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Fire Experts', href: '/contact' },
  },
};
