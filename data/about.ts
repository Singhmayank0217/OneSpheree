import type { AboutContent } from '@/types/about';

/**
 * /about — copy.
 *
 * Positioning, per the brief: OneSpheree is a YOUNG company built by people who
 * are not young in their fields. Nothing here claims a long corporate history,
 * a founding decade, or volume metrics a new company could not have earned; the
 * proof points are the team's combined experience and the breadth of the six
 * practices. Tone: professional, knowledge-driven, forward-looking.
 */
export const about: AboutContent = {
  hero: {
    eyebrow: 'About OneSpheree',
    lines: ['A new company.', 'Experienced people.', 'One partner.'],
    lede:
      'OneSpheree is a young business group built by professionals with years of experience across marketing, diligence, safety engineering, commerce, workforce and consulting. We brought those disciplines under one name so businesses no longer have to assemble them one vendor at a time.',
    primaryCta: { label: 'Talk to our team', href: '/contact' },
    secondaryCta: { label: 'Explore our services', href: '/services' },
    facts: [
      { value: 'Six', label: 'practice areas under one team' },
      { value: 'Multi-industry', label: 'experience behind every engagement' },
      { value: 'One', label: 'point of accountability' },
    ],
  },

  intro: {
    eyebrow: 'Who we are',
    headline: 'Built by specialists who were tired of working in isolation.',
    body: [
      'OneSpheree is a young company, and we say so plainly. What is not young is the experience behind it — our team has spent years inside marketing agencies, audit and diligence practices, fire and safety engineering, marketplace operations, staffing firms and consulting rooms.',
      'Working in those fields, we kept seeing the same problem from different sides: a client with a question that spanned two or three disciplines, and nobody willing to own the whole of it. Strategy stopped where compliance began. Hiring was somebody else’s problem. The gaps between vendors cost more than the vendors did.',
      'So we built the company we would have wanted to call. One team, six practices, one person accountable for the outcome — with the specialists in the building rather than on a referral list.',
    ],
    points: [
      {
        title: 'Experience first, scale second',
        blurb: 'Every practice is led by someone who has done the work for years elsewhere, not learned it on a client.',
      },
      {
        title: 'Knowledge-driven, not headcount-driven',
        blurb: 'We would rather bring the right specialist and the right data than a larger team.',
      },
      {
        title: 'Built for what comes next',
        blurb: 'A new company can be designed properly from the start — modern tooling, clear reporting, no legacy habits.',
      },
    ],
  },

  visionMission: {
    eyebrow: 'Vision & mission',
    headline: 'Where we are going, and what we do every day to get there.',
    intro:
      'Our ambition is specific, and so is the work it takes. These are the two statements the whole team is measured against.',
    vision: {
      label: 'Our vision',
      statement: 'To become the one partner ambitious businesses call first, whatever the problem turns out to be.',
      body:
        'We are building a group where a company can bring a challenge without first working out which kind of specialist it needs — and get an answer from people who genuinely have the depth to give one.',
      points: [
        'Integrated capability instead of a vendor list',
        'Depth in every practice, not a generalist veneer',
        'Relationships built to last well beyond one project',
      ],
    },
    mission: {
      label: 'Our mission',
      statement: 'To solve problems that cross departments, through knowledge, collaboration and execution.',
      body:
        'Day to day that means putting the right specialists in the same room, agreeing what success looks like in numbers before we start, and staying on the engagement until the result is running — not until the deck is delivered.',
      points: [
        'One accountable owner on every engagement',
        'Clear reporting a client can take to their board',
        'Collaboration across practices by default',
      ],
    },
  },

  expertise: {
    eyebrow: 'Our expertise',
    headline: 'Six practices, one team.',
    intro:
      'These are the disciplines our people came from, and the reason a single conversation with us can cover ground that would otherwise take several.',
    items: [
      {
        slug: 'digital-marketing',
        index: '01',
        name: 'Digital Marketing',
        icon: 'megaphone',
        blurb:
          'Brand, performance and content work that is measured properly — built by people who have run it in-house and agency-side.',
        capabilities: ['SEO & content', 'Performance media', 'Brand & creative'],
      },
      {
        slug: 'due-diligence',
        index: '02',
        name: 'Due Diligence',
        icon: 'searchCheck',
        blurb:
          'Corporate, financial, legal and vendor verification, so decisions are made on what is confirmed rather than what is claimed.',
        capabilities: ['Corporate & legal', 'Financial review', 'Vendor & employee checks'],
      },
      {
        slug: 'fire-safety',
        index: '03',
        name: 'Fire & Safety',
        icon: 'flame',
        blurb:
          'Detection, suppression and safety systems designed, installed, commissioned and maintained by licensed engineers.',
        capabilities: ['Design & engineering', 'Installation & commissioning', 'AMC & audits'],
      },
      {
        slug: 'e-commerce',
        index: '04',
        name: 'Reselling & E-Commerce',
        icon: 'store',
        blurb:
          'Catalogues, listings, marketplace operations and fulfilment — the unglamorous machinery that decides whether online selling works.',
        capabilities: ['Marketplace operations', 'Catalogue & listings', 'Order management'],
      },
      {
        slug: 'manpower-solutions',
        index: '05',
        name: 'Manpower Solutions',
        icon: 'users',
        blurb:
          'Sourcing, staffing, payroll, compliance and training, because the best plan still needs the right people running it.',
        capabilities: ['Permanent & contract staffing', 'Payroll & compliance', 'Training'],
      },
      {
        slug: 'sales-consulting',
        index: '06',
        name: 'Sales & Consulting',
        icon: 'target',
        blurb:
          'Go-to-market strategy, sales process and business advisory that ends in an operating plan rather than a recommendation.',
        capabilities: ['Sales strategy', 'Market expansion', 'Business advisory'],
      },
    ],
    cta: { label: 'See all services', href: '/services' },
  },

  reasons: {
    eyebrow: 'Why businesses choose us',
    headline: 'Young company. Grown-up delivery.',
    intro:
      'Clients do not hire us for our history. They hire us for the four things below — and we would rather be judged on them.',
    reasons: [
      {
        index: '01',
        icon: 'layers',
        title: 'One partner across domains',
        blurb:
          'Marketing, diligence, safety, commerce, workforce and consulting under one agreement, one escalation path and one set of numbers — no gaps between vendors to manage.',
      },
      {
        index: '02',
        icon: 'award',
        title: 'Senior people on the work',
        blurb:
          'Because we are deliberately small, the person who understands your problem is the person doing the work — not a partner who appears at the kickoff and the review.',
      },
      {
        index: '03',
        icon: 'barChart',
        title: 'Evidence over opinion',
        blurb:
          'Baselines and success criteria agreed before we start, reported on a fixed cadence, in a format that can go straight to a board or a regulator.',
      },
      {
        index: '04',
        icon: 'shield',
        title: 'Accountable to the outcome',
        blurb:
          'We stay past the strategy — through installation, hiring, launch and the operating year that follows. There is no handover, so there is nobody to hand the blame to.',
      },
    ],
  },

  values: {
    eyebrow: 'Company values',
    headline: 'How we work, written down.',
    intro:
      'Short enough to remember, specific enough to hold us to. These decide who we hire and what we agree to take on.',
    values: [
      {
        index: '01',
        title: 'Build before you sell',
        blurb: 'No practice is offered until the people, licences and tooling behind it are genuinely in place.',
      },
      {
        index: '02',
        title: 'Say the difficult thing early',
        blurb: 'A problem reaches the client from us first, with the correction already in motion.',
      },
      {
        index: '03',
        title: 'Curiosity is part of the job',
        blurb: 'Every practice is expected to learn from the others. That is the whole advantage of being one team.',
      },
      {
        index: '04',
        title: 'Precision over volume',
        blurb: 'We take on what we can do properly, and we would rather decline than dilute.',
      },
      {
        index: '05',
        title: 'Own the whole result',
        blurb: 'Accountability does not stop at the edge of a scope document.',
      },
      {
        index: '06',
        title: 'Build for the long term',
        blurb: 'We optimise for the client we still have in five years, not the quarter we are in.',
      },
    ],
  },

  cta: {
    eyebrow: 'Work with us',
    headline: 'Bring us the problem nobody wants to own.',
    description:
      'If your challenge spans more than one discipline, that is exactly the conversation we built this company to have. Tell us what you are working on.',
    primaryCta: { label: 'Start a conversation', href: '/contact' },
    secondaryCta: { label: 'Explore our services', href: '/services' },
  },
};
