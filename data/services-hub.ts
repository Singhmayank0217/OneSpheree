import type { ServicesHubContent } from '@/types/services-hub';

/**
 * All-Services hub content (/services). The hub introduces the seven divisions
 * and sends visitors on to the dedicated service pages — so every card's
 * accent is the accent of the page it links to (see the `.dm-/.dd-/.fire-/
 * .ec-/.mp-/.sc-/.fc-theme` scopes in globals.css). The page itself runs on the
 * OneSpheree Orange `.hub-theme` scope.
 */
export const servicesHub: ServicesHubContent = {
  hero: {
    eyebrow: 'Our Services',
    headline: 'Business Solutions Built Around Your Growth',
    description: [
      'OneSpheree brings together specialised expertise across consulting, technology, compliance, operations, workforce, commerce, and business transformation.',
      "Whether you're launching, expanding, or optimising your business, we provide end-to-end solutions under one trusted partner.",
    ],
    primaryCta: { label: 'Explore Services', href: '#services-grid' },
    secondaryCta: { label: 'Talk To Our Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'Services Overview',
    headline: 'Seven divisions. One accountable partner.',
    body: [
      'Most organizations assemble their growth from a dozen disconnected vendors — an agency here, a staffing firm there, a consultant on retainer, a compliance contractor once a year. Coordination becomes the job.',
      'OneSpheree runs all seven divisions under one roof, one contract and one point of accountability. Each practice is deep enough to stand alone, and connected enough that strategy, people, systems, finance and safety move as one programme.',
    ],
    figures: [
      { value: 7, label: 'Business divisions' },
      { value: 120, suffix: '+', label: 'Organizations served' },
      { value: 18, label: 'Industries covered' },
      { value: 98, suffix: '%', label: 'Client retention' },
    ],
  },

  grid: {
    eyebrow: 'Flagship Services',
    headline: 'Seven practices, each with its own team.',
    intro:
      'Every division below has a dedicated page of its own — the full scope of work, the methodology and the standards behind it. Start wherever your business needs the most help.',
    cards: [
      {
        slug: 'digital-marketing',
        name: 'Digital Marketing',
        short: 'MARKETING',
        index: '01',
        icon: 'trendingUp',
        headline: 'Growth you can measure.',
        description:
          'Performance media, search, content and brand campaigns built around the numbers that actually move your business.',
        visual: 'signal',
        accent: { base: '#8B5CF6', glow: '#A78BFA', soft: 'rgba(139,92,246,.16)' },
      },
      {
        slug: 'due-diligence',
        name: 'Due Diligence',
        short: 'DILIGENCE',
        index: '02',
        icon: 'fileCheck',
        headline: 'Decisions built on certainty.',
        description:
          'Corporate, financial, legal and vendor verification that replaces assumption with evidence before you commit.',
        visual: 'scan',
        accent: { base: '#10B981', glow: '#34D399', soft: 'rgba(16,185,129,.16)' },
      },
      {
        slug: 'fire-safety',
        name: 'Fire & Safety',
        short: 'FIRE & SAFETY',
        index: '03',
        icon: 'shield',
        headline: 'Protection that never sleeps.',
        description:
          'Detection, suppression and firefighting systems engineered, installed and maintained to code — and to conscience.',
        visual: 'blueprint',
        accent: { base: '#C9392B', glow: '#E85D45', soft: 'rgba(201,57,43,.18)' },
      },
      {
        slug: 'e-commerce',
        name: 'Reselling & E-Commerce',
        short: 'E-COMMERCE',
        index: '04',
        icon: 'shoppingCart',
        headline: 'Commerce built to scale.',
        description:
          'Marketplace operations, sourcing, listings and fulfilment run as one commercial engine across every channel you sell on.',
        visual: 'marketplace',
        accent: { base: '#F59E0B', glow: '#FBBF24', soft: 'rgba(245,158,11,.18)' },
      },
      {
        slug: 'manpower-solutions',
        name: 'Manpower Solutions',
        short: 'MANPOWER',
        index: '05',
        icon: 'users',
        headline: 'The right people, in place.',
        description:
          'Permanent, contract and executive hiring — plus payroll, compliance and workforce management once they are on board.',
        visual: 'network',
        accent: { base: '#2563EB', glow: '#60A5FA', soft: 'rgba(37,99,235,.18)' },
      },
      {
        slug: 'sales-consulting',
        name: 'Sales & Consulting',
        short: 'SALES',
        index: '06',
        icon: 'target',
        headline: 'Strategy that moves revenue.',
        description:
          'Sales strategy, business consulting, market expansion and CRM discipline, delivered hands-on until the numbers move.',
        visual: 'growth',
        accent: { base: '#06B6D4', glow: '#22D3EE', soft: 'rgba(6,182,212,.18)' },
      },
      {
        slug: 'financial-compliance',
        name: 'Financial & Compliance Services',
        short: 'FINANCE',
        index: '07',
        icon: 'scale',
        headline: 'Numbers that stand up to scrutiny.',
        description:
          'Taxation, audit, accounting, company law and payroll run by qualified professionals — filed on time, and defensible when it is checked.',
        visual: 'ledger',
        accent: { base: '#0F766E', glow: '#14B8A6', soft: 'rgba(20,184,166,.18)' },
      },
    ],
  },

  beyond: {
    eyebrow: 'Beyond Services',
    headline: 'Building Complete Business Ecosystems',
    description: [
      'OneSpheree is more than a service provider.',
      'We become a long-term business partner by delivering specialised solutions that support every stage of business growth.',
    ],
    groups: [
      {
        index: '01',
        name: 'Business Operations',
        blurb:
          'The operational backbone — the work that has to run every day, run properly, and never pull your leadership into it.',
        visual: 'operations',
        capabilities: [
          {
            icon: 'users',
            name: 'Business Process Outsourcing (BPO)',
            blurb: 'Back-office and customer operations run by trained teams, without the cost of building them in-house.',
          },
          {
            icon: 'package',
            name: 'Procurement & Vendor Management',
            blurb: 'Sourcing, negotiation and vendor governance that protect margin and keep supply predictable.',
          },
          {
            icon: 'fileText',
            name: 'Tender Support',
            blurb: 'Bid documentation, compliance packs and submission management for public and private tenders.',
          },
          {
            icon: 'clipboardCheck',
            name: 'Project Management Office (PMO)',
            blurb: 'Governance, reporting and delivery discipline across programmes that span multiple teams.',
          },
        ],
      },
      {
        index: '02',
        name: 'Compliance & Registrations',
        blurb:
          'The paperwork that unlocks everything else — registrations, certifications and approvals handled end to end.',
        visual: 'compliance',
        capabilities: [
          {
            icon: 'landmark',
            name: 'Government Registration Assistance',
            blurb: 'Entity, licence and statutory registrations taken off your desk and carried through to approval.',
          },
          {
            icon: 'award',
            name: 'ISO Certification Support',
            blurb: 'Gap assessment, documentation and audit readiness for the standards your clients ask you to hold.',
          },
          {
            icon: 'idCard',
            name: 'MSME Registration',
            blurb: 'Udyam registration and the benefit schemes that follow it, from eligibility check to certificate.',
          },
        ],
      },
      {
        index: '03',
        name: 'Business Growth',
        blurb:
          'The work that decides what comes next — where to play, who to partner with, and how to get there deliberately.',
        visual: 'growth',
        capabilities: [
          {
            icon: 'lightbulb',
            name: 'Startup Advisory',
            blurb: 'Structure, compliance and go-to-market guidance for founders through their first critical years.',
          },
          {
            icon: 'search',
            name: 'Market Research',
            blurb: 'Demand, competitor and pricing research that turns an assumption into a decision you can defend.',
          },
          {
            icon: 'link',
            name: 'Strategic Partnerships',
            blurb: 'Partner identification, introductions and commercial structuring that open genuinely new channels.',
          },
        ],
      },

      /* ── Part 2 ─────────────────────────────────────────────────────────── */
      {
        index: '04',
        name: 'Technology & Intelligence',
        blurb:
          'The layer that makes everything else measurable — systems that capture the work, and intelligence that explains it.',
        visual: 'technology',
        reveal: 'wipe',
        capabilities: [
          {
            icon: 'cpu',
            name: 'AI Business Solutions',
            blurb: 'Practical AI applied to real workflows — where it saves hours, not where it demonstrates well.',
          },
          {
            icon: 'settings',
            name: 'Automation Consulting',
            blurb: 'Repetitive process mapped and automated, with the exceptions still handled by someone who cares.',
          },
          {
            icon: 'barChart',
            name: 'Business Analytics',
            blurb: 'The numbers behind the operation, modelled so they answer questions instead of raising them.',
          },
          {
            icon: 'database',
            name: 'ERP & CRM Consulting',
            blurb: 'Selection, implementation and adoption of the systems your business will run on for a decade.',
          },
          {
            icon: 'gauge',
            name: 'Business Intelligence & Dashboarding',
            blurb: 'Live reporting leadership actually opens, built on figures every department agrees on.',
          },
        ],
      },
    ],

    focus: [
      {
        index: '05',
        name: 'Global Business',
        blurb: 'Trade beyond your borders without learning customs law the hard way.',
        motif: 'trade',
        capabilities: [
          {
            icon: 'globe',
            name: 'Import & Export Consulting',
            blurb:
              'Documentation, licensing, customs and logistics guidance for businesses moving goods across borders.',
          },
        ],
      },
      {
        index: '06',
        name: 'Learning & Development',
        blurb: 'Capability you keep — built into your own people rather than rented by the day.',
        motif: 'learning',
        capabilities: [
          {
            icon: 'graduationCap',
            name: 'Corporate Training',
            blurb:
              'Structured programmes in sales, compliance, safety and leadership, delivered to your teams on site.',
          },
        ],
      },
      {
        index: '07',
        name: 'Business Expansion',
        blurb: 'The two moves that decide whether growth scales or stalls.',
        motif: 'franchise',
        capabilities: [
          {
            icon: 'store',
            name: 'Franchise Consulting',
            blurb: 'Model design, unit economics and franchisee frameworks for businesses ready to replicate.',
          },
          {
            icon: 'wallet',
            name: 'Investment Readiness',
            blurb: 'Financials, documentation and narrative prepared to the standard investors actually diligence.',
          },
        ],
      },
      {
        index: '08',
        name: 'Custom Solutions',
        blurb: "When the requirement doesn't match anything on the list, we build to it.",
        motif: 'custom',
        capabilities: [
          {
            icon: 'wrench',
            name: 'Custom Business Solutions',
            blurb:
              'Scoped engagements assembled from across our divisions for problems that do not fit a standard brief.',
          },
        ],
      },
    ],
  },

  why: {
    eyebrow: 'Why OneSpheree',
    headline: 'Why choose OneSpheree',
    intro:
      'The reasons clients consolidate with us are rarely about price. They are about range, judgement and the certainty that someone is accountable.',
    features: [
      {
        icon: 'layers',
        title: 'Multi-Domain Expertise',
        blurb:
          'Seven flagship divisions and the capabilities behind them, so growth, people, systems, finance and compliance are planned together.',
      },
      {
        icon: 'shield',
        title: 'One Trusted Partner',
        blurb:
          'One contract, one point of accountability, one team that already knows your business by the second engagement.',
      },
      {
        icon: 'gitBranch',
        title: 'End-to-End Business Solutions',
        blurb:
          'From first assessment to installation, hiring, launch and long-term maintenance, the whole chain stays with us.',
      },
      {
        icon: 'award',
        title: 'Experienced Professionals',
        blurb:
          'Senior specialists lead every engagement — engineers, recruiters, analysts and strategists with real operating history.',
      },
      {
        icon: 'trendingUp',
        title: 'Scalable Engagement Models',
        blurb:
          'Retained, project-based or on demand — the commercial model flexes as the requirement does, in either direction.',
      },
      {
        icon: 'lightbulb',
        title: 'Innovation-Driven Approach',
        blurb:
          'Automation and applied AI built into delivery, so the work gets faster over the life of the engagement, not slower.',
      },
      {
        icon: 'clipboardCheck',
        title: 'Compliance & Quality Focus',
        blurb:
          'Documented process, verified credentials and audit-ready records as standard, never as a paid upgrade.',
      },
      {
        icon: 'link',
        title: 'Long-Term Partnership',
        blurb:
          'Most of our work comes from clients extending scope and from the referrals they make on our behalf.',
      },
    ],
  },

  industries: {
    eyebrow: 'Industries',
    headline: 'Industries we serve',
    intro:
      'The same divisions, tuned to the pressures of each sector. Select an industry to see where our work lands.',
    items: [
      {
        index: '01',
        name: 'Manufacturing',
        icon: 'factory',
        blurb: 'Plant safety systems, skilled workforce supply and vendor verification for continuous operations.',
      },
      {
        index: '02',
        name: 'Healthcare',
        icon: 'heart',
        blurb: 'Compliance-grade fire protection, credential-verified hiring and patient-acquisition marketing.',
      },
      {
        index: '03',
        name: 'Construction',
        icon: 'wrench',
        blurb: 'Site manpower, fire NOC readiness and procurement discipline across projects that cannot slip.',
      },
      {
        index: '04',
        name: 'Retail',
        icon: 'shoppingBag',
        blurb: 'Marketplace growth, store staffing and campaign performance across every channel you sell on.',
      },
      {
        index: '05',
        name: 'Hospitality',
        icon: 'store',
        blurb: 'Guest-facing teams, life-safety maintenance and reputation-led digital demand.',
      },
      {
        index: '06',
        name: 'Logistics',
        icon: 'truck',
        blurb: 'Warehouse workforce, fulfilment systems and supplier due diligence at network scale.',
      },
      {
        index: '07',
        name: 'Real Estate',
        icon: 'building',
        blurb: 'Fire NOC readiness, facility manpower and project marketing from launch through to handover.',
      },
      {
        index: '08',
        name: 'IT & Software',
        icon: 'cpu',
        blurb: 'Specialist and executive hiring, go-to-market strategy and demand generation for growth teams.',
      },
    ],
  },

  process: {
    eyebrow: 'Our Business Process',
    headline: 'One process, every engagement.',
    intro:
      'Whatever the work — a hiring mandate, a fire system, a marketplace launch, an automation programme — the path from first conversation to sustained growth is the same.',
    steps: [
      {
        index: '01',
        title: 'Discover',
        blurb:
          'We start with your business, not our service list — objectives, constraints, current state and the gaps nobody has had time to fix.',
      },
      {
        index: '02',
        title: 'Analyse',
        blurb:
          'Findings are tested against evidence: what the numbers actually say, where the risk sits, and which problems are worth solving first.',
      },
      {
        index: '03',
        title: 'Strategise',
        blurb:
          'A scoped programme with owners, sequence, standards and commercials, agreed in writing before a single hour is billed.',
      },
      {
        index: '04',
        title: 'Implement',
        blurb:
          'Specialist teams deliver against the plan — installed, hired, launched, published, integrated — with progress visible throughout.',
      },
      {
        index: '05',
        title: 'Optimise',
        blurb:
          'Results are reviewed against the objectives we set together, and the work is tuned on evidence rather than instinct.',
      },
      {
        index: '06',
        title: 'Scale',
        blurb:
          'What works is extended — more sites, more channels, more people — on standards already proven inside your business.',
      },
    ],
  },

  cta: {
    eyebrow: 'Start Here',
    headline: "Let's Build Your Business Together",
    description:
      'Whether you need a specialised service or a complete business ecosystem, OneSpheree is your trusted partner for sustainable growth, innovation, and long-term success.',
    primaryCta: { label: 'Explore Our Services', href: '#services-grid' },
    secondaryCta: { label: 'Book A Consultation', href: '/contact' },
  },
};
