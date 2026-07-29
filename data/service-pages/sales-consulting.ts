import type { ServicePageContent } from '@/types/service-page';

/**
 * Sales & Consulting — Milestone 1: Hero, Overview, Sales Strategy, Business
 * Consulting, Market Expansion. Built on the shared service-page blueprint;
 * the `.sc-theme` scope retunes the accent tokens to cyan (see globals.css).
 * Surfaces stay dark charcoal. Later milestones append sections 04+ plus the
 * shared Industries / Why / Process / Outcomes / CTA closers without touching
 * anything here.
 */
export const salesConsultingPage: ServicePageContent = {
  slug: 'sales-consulting',

  hero: {
    eyebrow: 'Sales & Consulting',
    headline: 'Driving Business Growth Through Strategy & Expertise',
    description: [
      'OneSphereee partners with businesses to develop winning sales strategies, optimize operations, unlock new markets, and achieve sustainable growth through expert consulting.',
    ],
    primaryCta: { label: 'Book a Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Our Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'Growth stops being guesswork when strategy, sales and operations are designed as one system.',
    highlights: ['strategy, sales and operations', 'designed as one system'],
    support:
      'OneSphereee’s Sales & Consulting division works alongside leadership teams to set direction and then make it real — building sales systems that convert, sharpening operations that carry the load, and opening new markets on evidence rather than instinct. Strategic planning, sales optimization, market expansion and business transformation, delivered as one engagement.',
    pillars: [
      { icon: 'lightbulb', label: 'Strategy', blurb: 'Clear direction, turned into a roadmap the business can execute.' },
      { icon: 'target', label: 'Sales', blurb: 'Repeatable sales systems that convert pipeline into revenue.' },
      { icon: 'briefcase', label: 'Consulting', blurb: 'Expert guidance on performance, process and operating efficiency.' },
      { icon: 'globe', label: 'Expansion', blurb: 'New markets entered with evidence, timing and a plan.' },
    ],
  },

  sections: [
    {
      id: 'sales-strategy',
      index: '01',
      eyebrow: 'Revenue systems',
      headline: 'Sales Strategy',
      description: 'Develop scalable sales systems that increase revenue and improve customer acquisition.',
      itemsLabel: 'What we build',
      items: [
        { icon: 'target', label: 'Sales Planning' },
        { icon: 'users', label: 'Lead Generation Strategy' },
        { icon: 'gitBranch', label: 'Sales Process Optimization' },
        { icon: 'dollarSign', label: 'Revenue Growth Planning' },
      ],
    },
    {
      id: 'business-consulting',
      index: '02',
      eyebrow: 'Performance & operations',
      headline: 'Business Consulting',
      description: 'Strategic consulting that helps businesses improve performance and operational efficiency.',
      itemsLabel: 'How we advise',
      items: [
        { icon: 'refresh', label: 'Business Process Improvement' },
        { icon: 'settings', label: 'Operational Consulting' },
        { icon: 'trendingUp', label: 'Growth Strategy' },
        { icon: 'gauge', label: 'Performance Analysis' },
      ],
    },
    {
      id: 'market-expansion',
      index: '03',
      eyebrow: 'New markets',
      headline: 'Market Expansion',
      description: 'Identify new opportunities and expand confidently into new markets.',
      itemsLabel: 'What we deliver',
      items: [
        { icon: 'search', label: 'Market Research' },
        { icon: 'barChart', label: 'Competitive Analysis' },
        { icon: 'megaphone', label: 'Go-to-Market Strategy' },
        { icon: 'globe', label: 'Business Expansion Planning' },
      ],
    },

    /* ── Milestone 2 — sections 04-07, appended sequentially ─────────────── */
    {
      id: 'sales-training',
      index: '04',
      eyebrow: 'Team capability',
      headline: 'Sales Training',
      description: 'Equip sales teams with the skills and frameworks needed to consistently exceed targets.',
      itemsLabel: 'What we coach',
      items: [
        { icon: 'messageCircle', label: 'Sales Coaching' },
        { icon: 'scale', label: 'Negotiation Skills' },
        { icon: 'heart', label: 'Customer Relationship Building' },
        { icon: 'graduationCap', label: 'Performance Workshops' },
      ],
    },
    {
      id: 'crm-sales-automation',
      index: '05',
      eyebrow: 'Systems & automation',
      headline: 'CRM & Sales Automation',
      description: 'Improve productivity using modern CRM systems and sales automation.',
      itemsLabel: 'What we implement',
      items: [
        { icon: 'database', label: 'CRM Implementation' },
        { icon: 'zap', label: 'Sales Funnel Automation' },
        { icon: 'layers', label: 'Pipeline Management' },
        { icon: 'pieChart', label: 'Reporting Dashboards' },
      ],
    },
    {
      id: 'business-development',
      index: '06',
      eyebrow: 'Long-term growth',
      headline: 'Business Development',
      description: 'Create long-term growth opportunities through strategic planning and relationship building.',
      itemsLabel: 'Where we focus',
      items: [
        { icon: 'searchCheck', label: 'Opportunity Identification' },
        { icon: 'idCard', label: 'Client Acquisition' },
        { icon: 'users', label: 'Strategic Alliances' },
        { icon: 'trendingUp', label: 'Growth Planning' },
      ],
    },
    {
      id: 'partnership-consulting',
      index: '07',
      eyebrow: 'Alliances & channels',
      headline: 'Partnership Consulting',
      description: 'Build strong partnerships that accelerate business growth.',
      itemsLabel: 'What we build',
      items: [
        { icon: 'store', label: 'Channel Partnerships' },
        { icon: 'truck', label: 'Distribution Strategy' },
        { icon: 'link', label: 'Alliance Development' },
        { icon: 'clipboardCheck', label: 'Partner Management' },
      ],
    },
  ],

  /* ── Milestone 3 — the shared blueprint closers ──────────────────────────
     Rendered through IndustriesSection / WhySection / ProcessSection /
     OutcomesSection / ServiceCtaSection, retuned to cyan by .sc-theme like the
     other service pages. Sections 01-07 above are untouched. */

  /* 10 · Industries We Serve — the interactive mosaic. The `wide` flags are set
     so the eight cards fill the lg 6-column grid exactly: 2+1+2+1 / 1+2+1+2. */
  industries: {
    headline: 'Industries We Serve',
    intro:
      'We advise across the sectors where strategy meets execution — bringing the commercial patterns that work in one industry to the businesses that need them in another.',
    items: [
      { icon: 'factory', label: 'Manufacturing', wide: true },
      { icon: 'shoppingBag', label: 'Retail' },
      { icon: 'cpu', label: 'IT & Software', wide: true },
      { icon: 'heart', label: 'Healthcare' },
      { icon: 'home', label: 'Real Estate' },
      { icon: 'building', label: 'Construction', wide: true },
      { icon: 'truck', label: 'Logistics' },
      { icon: 'briefcase', label: 'Professional Services', wide: true },
    ],
  },

  /* 11 · Why Choose OneSphereee — the feature bento. */
  why: {
    headline: 'Why Choose OneSphereee',
    features: [
      {
        icon: 'users',
        title: 'Experienced Business Consultants',
        blurb: 'Advisors who have sat on both sides of the table — operating and consulting.',
        featured: true,
      },
      {
        icon: 'target',
        title: 'Customized Growth Strategies',
        blurb: 'Plans built for your market and your constraints, never a template.',
        featured: true,
      },
      {
        icon: 'award',
        title: 'Industry-Specific Expertise',
        blurb: 'Sector knowledge that shortens the distance to a working answer.',
      },
      {
        icon: 'barChart',
        title: 'Data-Driven Decision Making',
        blurb: 'Decisions grounded in evidence, modelled before they are made.',
      },
      {
        icon: 'wrench',
        title: 'Practical Implementation Support',
        blurb: 'We stay past the recommendation and help you land it.',
      },
      {
        icon: 'layers',
        title: 'Scalable Business Solutions',
        blurb: 'Systems that hold up as volume, headcount and complexity grow.',
      },
      {
        icon: 'refresh',
        title: 'Long-Term Strategic Partnership',
        blurb: 'A relationship measured in years and outcomes, not billable hours.',
      },
      {
        icon: 'trendingUp',
        title: 'Results-Oriented Approach',
        blurb: 'Engagements judged on the numbers they move, not the decks they produce.',
      },
    ],
  },

  /* 12 · Our Consulting Process — the animated snake timeline. */
  process: {
    headline: 'Our Consulting Process',
    steps: [
      { title: 'Business Discovery' },
      { title: 'Market Analysis' },
      { title: 'Strategy Development' },
      { title: 'Solution Design' },
      { title: 'Implementation Planning' },
      { title: 'Execution Support' },
      { title: 'Performance Monitoring' },
      { title: 'Continuous Growth' },
    ],
  },

  /* 13 · Business Outcomes — the editorial metric ledger. */
  outcomes: {
    headline: 'Business Outcomes',
    cards: [
      { label: 'Increased Revenue', blurb: 'Sales systems that convert more of the demand you already create.', stat: { prefix: '+', value: 42, suffix: '%' } },
      { label: 'Stronger Market Position', blurb: 'A sharper proposition in the markets that matter most.', stat: { value: 2, suffix: 'x' } },
      { label: 'Higher Sales Performance', blurb: 'Teams coached and equipped to close at a better rate.', stat: { prefix: '+', value: 37, suffix: '%' } },
      { label: 'Improved Operational Efficiency', blurb: 'Process and cost engineered down without losing capability.', stat: { prefix: '−', value: 28, suffix: '%' } },
      { label: 'Better Customer Retention', blurb: 'Relationships managed as assets, not as transactions.', stat: { value: 91, suffix: '%' } },
      { label: 'Sustainable Business Growth', blurb: 'Growth that compounds because the system behind it holds.', stat: { value: 4, suffix: 'x' } },
    ],
  },

  /* 14 · Final CTA — the growth-horizon closer into the global footer. */
  cta: {
    headline: 'Transform Your Business With Strategic Consulting',
    description: [
      'Whether you’re looking to accelerate sales, improve operations, or expand into new markets, OneSphereee delivers practical consulting solutions that create measurable business results.',
    ],
    primaryCta: { label: 'Book a Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk To Our Experts', href: '/contact' },
  },
};
