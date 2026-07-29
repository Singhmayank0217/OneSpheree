import type { ServicePageContent } from '@/types/service-page';

/**
 * Manpower Solutions — Milestone 1: Hero, Overview, Permanent Staffing,
 * Contract Staffing, Executive Search. Built on the shared service-page
 * blueprint; the `.mp-theme` scope retunes the accent tokens to royal blue
 * (see globals.css). Surfaces stay dark charcoal.
 */
export const manpowerPage: ServicePageContent = {
  slug: 'manpower-solutions',

  hero: {
    eyebrow: 'Manpower Solutions',
    headline: 'Connecting Businesses With Exceptional Talent',
    description: [
      'OneSpheree helps organizations build stronger teams through professional recruitment, workforce management, executive hiring, and staffing solutions across multiple industries.',
    ],
    primaryCta: { label: 'Hire Talent', href: '/contact' },
    secondaryCta: { label: 'Talk To Recruitment Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'One workforce partner runs the whole journey — from finding the right people to placing them to managing the team long after they start.',
    highlights: ['finding the right people', 'managing the team long after they start'],
    support:
      'OneSpheree’s Manpower Solutions division builds stronger teams end to end — sourcing and screening professionals, placing them into permanent, contract, and leadership roles, and running payroll, compliance, and workforce management so organizations grow with the right people in place.',
    pillars: [
      { icon: 'searchCheck', label: 'Recruitment', blurb: 'Sourcing and screening the right professionals for every role.' },
      { icon: 'idCard', label: 'Screening', blurb: 'Background, credential and reference verification done right.' },
      { icon: 'briefcase', label: 'Deployment', blurb: 'Onboarding talent into teams, on time and role-ready.' },
      { icon: 'layers', label: 'Management', blurb: 'Payroll, compliance and long-term workforce operations.' },
    ],
  },

  sections: [
    {
      id: 'permanent-staffing',
      index: '01',
      eyebrow: 'Long-term talent',
      headline: 'Permanent Staffing',
      description: 'Recruit high-quality professionals for long-term organizational growth.',
      itemsLabel: 'Roles we recruit',
      items: [
        { icon: 'cpu', label: 'Technical Hiring' },
        { icon: 'users', label: 'Non-Technical Hiring' },
        { icon: 'graduationCap', label: 'Campus Recruitment' },
        { icon: 'award', label: 'Industry Specialists' },
      ],
    },
    {
      id: 'contract-staffing',
      index: '02',
      eyebrow: 'Flexible workforce',
      headline: 'Contract Staffing',
      description: 'Flexible workforce solutions that help businesses scale quickly.',
      itemsLabel: 'How we engage',
      items: [
        { icon: 'clock', label: 'Temporary Staffing' },
        { icon: 'layoutGrid', label: 'Project-Based Hiring' },
        { icon: 'wallet', label: 'Payroll Management' },
        { icon: 'clipboardCheck', label: 'Compliance Support' },
      ],
    },
    {
      id: 'executive-search',
      index: '03',
      eyebrow: 'Leadership hiring',
      headline: 'Executive Search',
      description: 'Identify and recruit leadership talent for strategic business growth.',
      itemsLabel: 'What we deliver',
      items: [
        { icon: 'award', label: 'CXO Hiring' },
        { icon: 'target', label: 'Leadership Recruitment' },
        { icon: 'shield', label: 'Confidential Search' },
        { icon: 'globe', label: 'Talent Mapping' },
      ],
    },
    {
      id: 'recruitment-process-outsourcing',
      index: '04',
      eyebrow: 'Recruitment outsourcing',
      headline: 'Recruitment Process Outsourcing',
      description: 'End-to-end recruitment services for growing organizations.',
      itemsLabel: 'The RPO pipeline',
      items: [
        { icon: 'search', label: 'Candidate Sourcing' },
        { icon: 'searchCheck', label: 'Screening' },
        { icon: 'messageCircle', label: 'Interview Coordination' },
        { icon: 'clipboardCheck', label: 'Offer Management' },
      ],
    },
    {
      id: 'payroll-compliance',
      index: '05',
      eyebrow: 'Payroll & statutory',
      headline: 'Payroll & Compliance',
      description: 'Manage payroll and statutory compliance efficiently.',
      itemsLabel: 'What we handle',
      items: [
        { icon: 'wallet', label: 'Payroll Processing' },
        { icon: 'shield', label: 'PF & ESI' },
        { icon: 'scale', label: 'Labour Compliance' },
        { icon: 'fileText', label: 'Documentation' },
      ],
    },
    {
      id: 'workforce-management',
      index: '06',
      eyebrow: 'Operational efficiency',
      headline: 'Workforce Management',
      description: 'Optimize workforce performance and operational efficiency.',
      itemsLabel: 'What we run',
      items: [
        { icon: 'calendar', label: 'Attendance' },
        { icon: 'layoutGrid', label: 'Workforce Planning' },
        { icon: 'gauge', label: 'Performance Tracking' },
        { icon: 'messageCircle', label: 'HR Support' },
      ],
    },
    {
      id: 'training-skill-development',
      index: '07',
      eyebrow: 'Talent development',
      headline: 'Training & Skill Development',
      description: 'Prepare employees with the skills needed for business success.',
      itemsLabel: 'Programs we deliver',
      items: [
        { icon: 'cpu', label: 'Technical Training' },
        { icon: 'messageCircle', label: 'Soft Skills' },
        { icon: 'award', label: 'Leadership Development' },
        { icon: 'graduationCap', label: 'Corporate Learning' },
      ],
    },
  ],

  /* 10 · Industries We Serve — reuses the interactive mosaic (IndustriesSection). */
  industries: {
    headline: 'Industries We Serve',
    intro:
      'We recruit and manage talent across the sectors that keep the economy moving — matching specialists to the industries that need them most.',
    items: [
      { icon: 'cpu', label: 'IT & Software', wide: true },
      { icon: 'factory', label: 'Manufacturing' },
      { icon: 'building', label: 'Construction', wide: true },
      { icon: 'heart', label: 'Healthcare' },
      { icon: 'shoppingBag', label: 'Retail' },
      { icon: 'star', label: 'Hospitality', wide: true },
      { icon: 'truck', label: 'Logistics' },
      { icon: 'landmark', label: 'Finance' },
    ],
  },

  /* 11 · Why Choose OneSpheree — reuses the feature bento (WhySection). */
  why: {
    headline: 'Why Choose OneSpheree',
    features: [
      {
        icon: 'users',
        title: 'Experienced Recruitment Team',
        blurb: 'Specialists who have placed talent across roles, levels, and industries.',
        featured: true,
      },
      {
        icon: 'globe',
        title: 'Large Talent Network',
        blurb: 'A deep, active pool of vetted professionals ready to deploy.',
        featured: true,
      },
      {
        icon: 'award',
        title: 'Industry Expertise',
        blurb: 'Recruiters who understand the roles and the sectors they hire for.',
      },
      {
        icon: 'zap',
        title: 'Fast Hiring Process',
        blurb: 'Streamlined sourcing and screening that shortens time-to-hire.',
      },
      {
        icon: 'shield',
        title: 'Compliance Focus',
        blurb: 'Payroll, PF/ESI, and labour compliance handled correctly, every time.',
      },
      {
        icon: 'layers',
        title: 'Scalable Workforce Solutions',
        blurb: 'Capacity that flexes up or down with your business needs.',
      },
      {
        icon: 'messageCircle',
        title: 'Dedicated HR Support',
        blurb: 'A named team that owns your account and its outcomes.',
      },
      {
        icon: 'refresh',
        title: 'Long-Term Partnership',
        blurb: 'A relationship built to support hiring for years, not one role.',
      },
    ],
  },

  /* 12 · Our Recruitment Process — reuses the animated snake timeline (ProcessSection). */
  process: {
    headline: 'Our Recruitment Process',
    steps: [
      { title: 'Workforce Consultation' },
      { title: 'Requirement Analysis' },
      { title: 'Talent Sourcing' },
      { title: 'Candidate Screening' },
      { title: 'Interviews' },
      { title: 'Selection' },
      { title: 'Deployment' },
      { title: 'Ongoing Support' },
    ],
  },

  /* 13 · Business Outcomes — reuses the editorial metric ledger (OutcomesSection). */
  outcomes: {
    headline: 'Business Outcomes',
    cards: [
      { label: 'Faster Hiring', blurb: 'Open roles filled in a fraction of the usual time.', stat: { value: 3, suffix: 'x' } },
      { label: 'Better Talent Quality', blurb: 'Screened, verified candidates matched to the role.', stat: { value: 95, suffix: '%' } },
      { label: 'Reduced Recruitment Costs', blurb: 'Sourcing and screening overheads engineered down.', stat: { prefix: '−', value: 40, suffix: '%' } },
      { label: 'Improved Employee Retention', blurb: 'Right-fit hires that stay and grow with the business.', stat: { prefix: '+', value: 32, suffix: '%' } },
      { label: 'Scalable Workforce', blurb: 'Capacity that scales up or down without friction.', stat: { value: 5, suffix: 'x' } },
      { label: 'Stronger Business Growth', blurb: 'Teams built to drive the next stage of growth.', stat: { prefix: '+', value: 60, suffix: '%' } },
    ],
  },

  /* 14 · Final CTA — reuses the growth-horizon closer (ServiceCtaSection). */
  cta: {
    headline: 'Build Your Workforce With Confidence',
    description: [
      'Whether you’re hiring one specialist or building an entire workforce, OneSpheree delivers reliable manpower solutions tailored to your business goals.',
    ],
    primaryCta: { label: 'Hire Talent', href: '/contact' },
    secondaryCta: { label: 'Talk To Recruitment Experts', href: '/contact' },
  },
};
