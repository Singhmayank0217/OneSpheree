import type { ServicePageContent } from '@/types/service-page';

/** Digital Marketing — Milestone 1: Hero, Overview, SEO, Performance, Social. */
export const digitalMarketingPage: ServicePageContent = {
  slug: 'digital-marketing',

  hero: {
    eyebrow: 'Digital Marketing Solutions',
    headline: 'Accelerating Business Growth Through Digital Excellence',
    description: [
      'At OneSpheree, we help businesses establish a powerful digital presence, attract high-quality customers, and convert opportunities into measurable revenue.',
      'Our strategies combine creativity, technology, market intelligence, and performance analytics to ensure every marketing investment delivers tangible business results.',
      "Whether you're a startup, SME, enterprise, manufacturer, healthcare provider, educational institution, or corporate organization, we build customized digital marketing solutions aligned with your business objectives.",
    ],
    primaryCta: { label: 'Schedule a Consultation', href: '/contact' },
    secondaryCta: { label: 'Explore Our Services', href: '#overview' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'One integrated marketing team where strategy, creative, media and analytics answer to a single number: your growth.',
    highlights: ['strategy, creative, media and analytics', 'your growth'],
    support:
      'OneSpheree’s Digital Marketing division plans, builds and runs the entire engine — so creative decisions are informed by data, media spend follows evidence, and every campaign is accountable to revenue, not impressions.',
    pillars: [
      { icon: 'target', label: 'Strategy', blurb: 'Market intelligence that decides where to play and how to win.' },
      { icon: 'pen', label: 'Creative', blurb: 'Brand-true work engineered to stop the scroll and hold attention.' },
      { icon: 'zap', label: 'Performance', blurb: 'Paid media tuned continuously against cost and conversion.' },
      { icon: 'barChart', label: 'Analytics', blurb: 'One measurement framework proving what actually moved.' },
    ],
  },

  sections: [
    {
      id: 'seo',
      index: '01',
      eyebrow: 'Organic visibility',
      headline: 'Search Engine Optimization',
      description: 'Increase your visibility on Google with ethical, data-driven SEO strategies.',
      itemsLabel: "What's included",
      items: [
        { icon: 'fileCheck', label: 'Website SEO Audit' },
        { icon: 'zap', label: 'Technical SEO Optimization' },
        { icon: 'search', label: 'Keyword Research' },
        { icon: 'target', label: 'Competitor Analysis' },
        { icon: 'layoutGrid', label: 'On-Page SEO' },
        { icon: 'globe', label: 'Off-Page SEO' },
        { icon: 'mapPin', label: 'Local SEO' },
        { icon: 'star', label: 'Google Business Profile Optimization' },
        { icon: 'link', label: 'Link Building' },
        { icon: 'barChart', label: 'Monthly SEO Reports' },
      ],
    },
    {
      id: 'performance-marketing',
      index: '02',
      eyebrow: 'Paid acquisition',
      headline: 'Performance Marketing',
      description: 'Generate qualified leads through highly optimized paid advertising campaigns.',
      itemsLabel: 'Platforms & campaigns',
      items: [
        { icon: 'search', label: 'Google Ads' },
        { icon: 'users', label: 'Meta Ads' },
        { icon: 'briefcase', label: 'LinkedIn Ads' },
        { icon: 'play', label: 'YouTube Ads' },
        { icon: 'layoutGrid', label: 'Display Advertising' },
        { icon: 'refresh', label: 'Remarketing Campaigns' },
        { icon: 'shoppingCart', label: 'Shopping Campaigns' },
        { icon: 'inbox', label: 'Lead Generation Campaigns' },
      ],
    },
    {
      id: 'social-media',
      index: '03',
      eyebrow: 'Brand & community',
      headline: 'Social Media Marketing',
      description:
        'Build brand awareness and customer engagement through strategic social media management.',
      itemsLabel: "What's included",
      items: [
        { icon: 'calendar', label: 'Content Planning' },
        { icon: 'pen', label: 'Graphic Design' },
        { icon: 'video', label: 'Reels & Video Marketing' },
        { icon: 'clock', label: 'Daily Posting' },
        { icon: 'users', label: 'Community Management' },
        { icon: 'star', label: 'Influencer Campaigns' },
        { icon: 'megaphone', label: 'Social Media Advertising' },
        { icon: 'globe', label: 'Brand Awareness Campaigns' },
        { icon: 'trendingUp', label: 'Audience Growth Strategies' },
      ],
    },
    {
      id: 'web-development',
      index: '04',
      eyebrow: 'Digital platforms',
      headline: 'Website Design & Development',
      description:
        'Create fast, secure, responsive, and conversion-focused websites that help businesses establish credibility and generate measurable growth.',
      itemsLabel: 'Solutions',
      items: [
        { icon: 'window', label: 'Corporate Websites' },
        { icon: 'briefcase', label: 'Business Portals' },
        { icon: 'layoutGrid', label: 'Landing Pages' },
        { icon: 'shoppingCart', label: 'E-Commerce Websites' },
        { icon: 'globe', label: 'WordPress Development' },
        { icon: 'layers', label: 'Shopify Development' },
        { icon: 'pen', label: 'UI/UX Design' },
        { icon: 'wrench', label: 'Website Maintenance' },
        { icon: 'gauge', label: 'Speed Optimization' },
      ],
    },
    {
      id: 'content-marketing',
      index: '05',
      eyebrow: 'Editorial authority',
      headline: 'Content Marketing',
      description:
        'Build authority, trust, and customer engagement through strategic content creation that educates, informs, and converts.',
      itemsLabel: 'Contents',
      items: [
        { icon: 'pen', label: 'Blog Writing' },
        { icon: 'fileText', label: 'Website Content' },
        { icon: 'shoppingCart', label: 'Product Descriptions' },
        { icon: 'mail', label: 'Email Campaigns' },
        { icon: 'briefcase', label: 'Case Studies' },
        { icon: 'fileCheck', label: 'Whitepapers' },
        { icon: 'users', label: 'Company Profiles' },
        { icon: 'layers', label: 'Brochures' },
        { icon: 'video', label: 'Video Scripts' },
      ],
    },
    {
      id: 'lead-generation',
      index: '06',
      eyebrow: 'Qualified pipeline',
      headline: 'Lead Generation',
      description:
        'Deliver qualified business opportunities that help your sales teams increase revenue and accelerate business growth.',
      itemsLabel: 'Programs',
      items: [
        { icon: 'briefcase', label: 'B2B Lead Generation' },
        { icon: 'users', label: 'B2C Lead Generation' },
        { icon: 'link', label: 'LinkedIn Outreach' },
        { icon: 'mail', label: 'Email Campaigns' },
        { icon: 'layoutGrid', label: 'Landing Page Optimization' },
        { icon: 'database', label: 'CRM Integration' },
        { icon: 'target', label: 'Sales Funnel Development' },
      ],
    },
    {
      id: 'marketing-automation',
      index: '07',
      eyebrow: 'Connected systems',
      headline: 'Marketing Automation',
      description:
        'Automate repetitive marketing workflows, improve customer engagement, and scale business operations efficiently.',
      itemsLabel: 'Automation includes',
      items: [
        { icon: 'mail', label: 'Email Automation' },
        { icon: 'messageCircle', label: 'WhatsApp Automation' },
        { icon: 'database', label: 'CRM Automation' },
        { icon: 'mapPin', label: 'Customer Journey Mapping' },
        { icon: 'star', label: 'Lead Scoring' },
        { icon: 'cpu', label: 'AI Chatbots' },
        { icon: 'gitBranch', label: 'Workflow Automation' },
      ],
    },
    {
      id: 'analytics',
      index: '08',
      eyebrow: 'Decision intelligence',
      headline: 'Analytics & Business Intelligence',
      description:
        'Measure marketing performance through actionable insights, advanced reporting, and data-driven decision making.',
      itemsLabel: 'Reporting includes',
      items: [
        { icon: 'dollarSign', label: 'Campaign ROI' },
        { icon: 'trendingUp', label: 'Website Traffic' },
        { icon: 'target', label: 'Lead Tracking' },
        { icon: 'users', label: 'Customer Acquisition Cost (CAC)' },
        { icon: 'pieChart', label: 'Return on Ad Spend (ROAS)' },
        { icon: 'percent', label: 'Conversion Rates' },
        { icon: 'fileCheck', label: 'Monthly Executive Reports' },
        { icon: 'barChart', label: 'KPI Dashboards' },
      ],
    },
  ],

  /* ── Milestone 3 ─────────────────────────────────────────────────────── */

  industries: {
    headline: 'Industries We Serve',
    intro:
      'Our digital marketing solutions are tailored for businesses across diverse industries, helping organizations strengthen their digital presence, generate qualified leads, and achieve measurable growth.',
    items: [
      { icon: 'layers', label: 'Manufacturing', wide: true },
      { icon: 'flame', label: 'Fire & Safety' },
      { icon: 'wrench', label: 'EPC Companies' },
      { icon: 'heart', label: 'Healthcare', wide: true },
      { icon: 'star', label: 'Hospitality' },
      { icon: 'home', label: 'Real Estate' },
      { icon: 'award', label: 'Education' },
      { icon: 'shoppingCart', label: 'E-Commerce', wide: true },
      { icon: 'truck', label: 'Logistics' },
      { icon: 'tag', label: 'Retail' },
      { icon: 'cpu', label: 'IT Services' },
      { icon: 'briefcase', label: 'Professional Services', wide: true },
      { icon: 'zap', label: 'Startups' },
      { icon: 'shield', label: 'Government Projects' },
    ],
  },

  why: {
    headline: 'Why Businesses Choose OneSpheree',
    features: [
      {
        icon: 'target',
        title: 'Customized Growth Strategies',
        blurb: 'No templates — every strategy is built from your market, your customers, and your objectives.',
        featured: true,
      },
      {
        icon: 'barChart',
        title: 'Data-Driven Marketing Decisions',
        blurb: 'Budget follows evidence. Every decision is grounded in measurement, not opinion.',
        featured: true,
      },
      {
        icon: 'award',
        title: 'Certified Digital Marketing Professionals',
        blurb: 'Platform-certified specialists across search, paid media, and analytics.',
      },
      {
        icon: 'fileCheck',
        title: 'Transparent Monthly Reporting',
        blurb: 'Clear reports that show exactly what was done and what it delivered.',
      },
      {
        icon: 'trendingUp',
        title: 'ROI-Focused Campaign Management',
        blurb: 'Campaigns tuned continuously against cost, conversion, and revenue.',
      },
      {
        icon: 'layers',
        title: 'Multi-Channel Marketing Expertise',
        blurb: 'Search, social, content, and automation working as one coordinated system.',
      },
      {
        icon: 'users',
        title: 'Dedicated Account Managers',
        blurb: 'One accountable point of contact who knows your business end to end.',
      },
      {
        icon: 'globe',
        title: 'Scalable Solutions for Every Size',
        blurb: 'From startup launches to enterprise programs — the engine scales with you.',
      },
    ],
  },

  process: {
    headline: 'Our Proven Growth Process',
    steps: [
      { title: 'Business Discovery' },
      { title: 'Market & Competitor Research' },
      { title: 'Strategy Development' },
      { title: 'Campaign Planning' },
      { title: 'Creative Design & Content Production' },
      { title: 'Campaign Execution' },
      { title: 'Performance Monitoring' },
      { title: 'Continuous Optimization' },
      { title: 'Monthly Reporting' },
      { title: 'Growth Scaling' },
    ],
  },

  outcomes: {
    headline: 'Business Outcomes We Deliver',
    cards: [
      { label: 'Increased Brand Visibility', blurb: 'More of the right people seeing your brand, more often.', stat: { prefix: '+', value: 68, suffix: '%' } },
      { label: 'Higher Search Engine Rankings', blurb: 'Priority keywords moving onto page one — and staying there.', stat: { value: 3, suffix: 'x' } },
      { label: 'Qualified Lead Generation', blurb: 'Pipelines filled with prospects your sales team wants to call.', stat: { prefix: '+', value: 52, suffix: '%' } },
      { label: 'Improved Website Traffic', blurb: 'Sustained growth in visitors who match your customer profile.', stat: { prefix: '+', value: 74, suffix: '%' } },
      { label: 'Better Customer Engagement', blurb: 'Audiences that follow, respond, return, and refer.', stat: { value: 2, suffix: 'x' } },
      { label: 'Higher Conversion Rates', blurb: 'More of every visit turning into enquiry, signup, or sale.', stat: { prefix: '+', value: 41, suffix: '%' } },
      { label: 'Reduced Customer Acquisition Costs', blurb: 'The same budget acquiring meaningfully more customers.', stat: { prefix: '−', value: 34, suffix: '%' } },
      { label: 'Increased Sales Revenue', blurb: 'Marketing that shows up on the revenue line, not just the report.', stat: { prefix: '+', value: 47, suffix: '%' } },
      { label: 'Long-Term Business Growth', blurb: 'A compounding engine, not a one-off campaign.', stat: { value: 12, suffix: 'mo+' } },
    ],
  },

  cta: {
    headline: 'Grow Smarter with OneSpheree',
    description: [
      'Transform your digital presence into a sustainable growth engine.',
      'From strategic planning to execution and continuous optimization, OneSpheree delivers measurable marketing solutions that help businesses thrive in an increasingly competitive digital landscape.',
    ],
    primaryCta: { label: 'Schedule a Consultation', href: '/contact' },
    secondaryCta: { label: 'Talk to Our Experts', href: '/contact' },
  },
};
