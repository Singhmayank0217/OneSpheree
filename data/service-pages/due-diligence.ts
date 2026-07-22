import type { ServicePageContent } from '@/types/service-page';

/** Due Diligence — Milestone 1: Hero, Overview, Corporate, Financial, Vendor. */
export const dueDiligencePage: ServicePageContent = {
  slug: 'due-diligence',

  hero: {
    eyebrow: 'Due Diligence Services',
    headline: 'Comprehensive Due Diligence & Business Verification',
    description: [
      'Every successful business decision begins with accurate information.',
      'At OneSpheree, we provide professional due diligence services to help organizations minimize risks, verify business credentials, and make informed investment and partnership decisions.',
    ],
    primaryCta: { label: 'Schedule Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Our Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'Before you invest, partner, or sign, one accountable team verifies who you are really dealing with — and what the risk truly is.',
    highlights: ['verifies who you are really dealing with', 'what the risk truly is'],
    support:
      'OneSpheree’s Due Diligence division verifies organizations, suppliers, financial health, legal compliance, and operational risk — turning uncertain decisions into evidence-backed ones, before capital or reputation is on the line.',
    pillars: [
      { icon: 'building', label: 'Corporate', blurb: 'Identity, registrations and certifications, confirmed at source.' },
      { icon: 'scale', label: 'Financial', blurb: 'Statements, solvency and credit, independently assessed.' },
      { icon: 'factory', label: 'Vendor', blurb: 'Suppliers and factories vetted before you commit.' },
      { icon: 'shield', label: 'Compliance', blurb: 'Legal and regulatory standing checked against current records.' },
    ],
  },

  sections: [
    {
      id: 'corporate-due-diligence',
      index: '01',
      eyebrow: 'Corporate verification',
      headline: 'Corporate Due Diligence',
      description:
        'Help businesses verify corporate identity, registrations, certifications, and operational legitimacy.',
      itemsLabel: 'What we verify',
      items: [
        { icon: 'building', label: 'Company Verification' },
        { icon: 'clipboardCheck', label: 'Registration Validation' },
        { icon: 'fileText', label: 'CIN Verification' },
        { icon: 'percent', label: 'GST Verification' },
        { icon: 'idCard', label: 'PAN Verification' },
        { icon: 'award', label: 'UDYAM Verification' },
        { icon: 'shield', label: 'ISO Certification Validation' },
      ],
    },
    {
      id: 'financial-due-diligence',
      index: '02',
      eyebrow: 'Financial assessment',
      headline: 'Financial Due Diligence',
      description: 'Assess financial stability before investment or partnership decisions.',
      itemsLabel: 'What we assess',
      items: [
        { icon: 'scale', label: 'Balance Sheet Review' },
        { icon: 'refresh', label: 'Cash Flow Analysis' },
        { icon: 'wallet', label: 'Debt Verification' },
        { icon: 'gauge', label: 'Credit Assessment' },
        { icon: 'landmark', label: 'Banking Verification' },
      ],
    },
    {
      id: 'vendor-due-diligence',
      index: '03',
      eyebrow: 'Supplier evaluation',
      headline: 'Vendor Due Diligence',
      description: 'Evaluate suppliers before entering strategic business relationships.',
      itemsLabel: 'What we evaluate',
      items: [
        { icon: 'searchCheck', label: 'Supplier Background Verification' },
        { icon: 'factory', label: 'Factory Verification' },
        { icon: 'layers', label: 'Manufacturing Capacity Assessment' },
        { icon: 'trendingUp', label: 'Financial Stability' },
        { icon: 'fileCheck', label: 'Compliance Review' },
      ],
    },
    {
      id: 'legal-due-diligence',
      index: '04',
      eyebrow: 'Legal intelligence',
      headline: 'Legal Due Diligence',
      description: 'Protect businesses through legal verification and compliance reviews.',
      itemsLabel: 'What we review',
      items: [
        { icon: 'gavel', label: 'Litigation Search' },
        { icon: 'fileText', label: 'Contract Review' },
        { icon: 'award', label: 'Trademark Verification' },
        { icon: 'lightbulb', label: 'Intellectual Property Review' },
        { icon: 'clipboardCheck', label: 'Regulatory Compliance' },
      ],
    },
    {
      id: 'employee-verification',
      index: '05',
      eyebrow: 'Candidate verification',
      headline: 'Employee Background Verification',
      description: 'Verify candidate authenticity before hiring.',
      itemsLabel: 'What we verify',
      items: [
        { icon: 'idCard', label: 'Identity Verification' },
        { icon: 'briefcase', label: 'Employment History' },
        { icon: 'graduationCap', label: 'Education Verification' },
        { icon: 'shield', label: 'Criminal Record Screening' },
        { icon: 'mapPin', label: 'Address Verification' },
      ],
    },
    {
      id: 'risk-assessment',
      index: '06',
      eyebrow: 'Risk monitoring',
      headline: 'Risk Assessment',
      description: 'Identify potential business risks before they become costly problems.',
      itemsLabel: 'Risk categories',
      items: [
        { icon: 'briefcase', label: 'Business Risk' },
        { icon: 'dollarSign', label: 'Financial Risk' },
        { icon: 'settings', label: 'Operational Risk' },
        { icon: 'trendingUp', label: 'Market Risk' },
        { icon: 'shield', label: 'Compliance Risk' },
      ],
    },
  ],

  /* ── Milestone 3 ─────────────────────────────────────────────────────── */

  industries: {
    headline: 'Industries We Serve',
    intro:
      'Our due diligence solutions are tailored for organizations across regulated and high-stakes industries — verifying the people, partners and records that decisions depend on.',
    items: [
      { icon: 'layers', label: 'Manufacturing', wide: true },
      { icon: 'wrench', label: 'Construction' },
      { icon: 'heart', label: 'Healthcare' },
      { icon: 'landmark', label: 'Financial Services', wide: true },
      { icon: 'tag', label: 'Retail' },
      { icon: 'cpu', label: 'Technology', wide: true },
      { icon: 'shield', label: 'Government' },
      { icon: 'star', label: 'Hospitality' },
    ],
  },

  why: {
    headline: 'Why Businesses Choose OneSpheree',
    features: [
      {
        icon: 'clipboardCheck',
        title: 'Accurate Business Verification',
        blurb: 'Records confirmed at source, not taken on trust — evidence you can act on.',
        featured: true,
      },
      {
        icon: 'searchCheck',
        title: 'Experienced Investigation Team',
        blurb: 'Seasoned investigators who know where risk hides and how to surface it.',
        featured: true,
      },
      {
        icon: 'fileCheck',
        title: 'Comprehensive Reports',
        blurb: 'Clear, documented findings with a defensible audit trail behind every conclusion.',
      },
      {
        icon: 'shield',
        title: 'Confidential Process',
        blurb: 'Every engagement handled discreetly, with your information protected end to end.',
      },
      {
        icon: 'zap',
        title: 'Fast Turnaround',
        blurb: 'Rigorous checks delivered on the timeline your decision actually runs on.',
      },
      {
        icon: 'scale',
        title: 'Regulatory Expertise',
        blurb: 'Deep familiarity with the compliance standards that govern your sector.',
      },
      {
        icon: 'target',
        title: 'Risk-Focused Analysis',
        blurb: 'Findings framed around the risks that matter to the decision at hand.',
      },
      {
        icon: 'award',
        title: 'Trusted Business Partner',
        blurb: 'A long-term partner organizations return to before every major decision.',
      },
    ],
  },

  process: {
    headline: 'Our Due Diligence Process',
    steps: [
      { title: 'Initial Consultation' },
      { title: 'Information Collection' },
      { title: 'Verification & Investigation' },
      { title: 'Analysis & Risk Assessment' },
      { title: 'Documentation' },
      { title: 'Final Report Submission' },
    ],
  },

  outcomes: {
    headline: 'Business Outcomes',
    cards: [
      { label: 'Reduced Business Risk', blurb: 'Threats surfaced and quantified before they reach the balance sheet.', stat: { prefix: '−', value: 58, suffix: '%' } },
      { label: 'Better Investment Decisions', blurb: 'Capital committed on verified facts, not assumptions.', stat: { value: 3, suffix: 'x' } },
      { label: 'Verified Business Partners', blurb: 'Every counterparty confirmed before the relationship begins.', stat: { value: 100, suffix: '%' } },
      { label: 'Stronger Compliance', blurb: 'Standing checked against current regulatory records.', stat: { prefix: '+', value: 46, suffix: '%' } },
      { label: 'Improved Corporate Governance', blurb: 'Decisions backed by a clear, defensible evidence trail.', stat: { prefix: '+', value: 38, suffix: '%' } },
      { label: 'Increased Business Confidence', blurb: 'Leadership moving forward with certainty, not hesitation.', stat: { prefix: '+', value: 64, suffix: '%' } },
    ],
  },

  cta: {
    headline: 'Build Business Relationships With Confidence',
    description: [
      'Make every investment, partnership, supplier relationship, and hiring decision with complete confidence through OneSpheree’s professional due diligence services.',
    ],
    primaryCta: { label: 'Schedule Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Our Experts', href: '/contact' },
  },
};
