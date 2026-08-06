import type { FinancialCompliancePageContent } from '@/types/financial';

/**
 * Financial & Compliance Services — Milestone 1 content (hero, the argument
 * for compliance, the eight core categories, the proof statistics).
 *
 * Register: a chartered practice, not a fintech product. Copy states what is
 * done and what it protects — no growth-hacking verbs, no unverifiable claims
 * (the statistics deliberately measure OneSphereee's commitments, never
 * invented client numbers). Detailed service breakdowns, industries, process,
 * FAQs and the closing CTA belong to Milestones 2 and 3.
 */
export const financialCompliancePage: FinancialCompliancePageContent = {
  slug: 'financial-compliance',

  hero: {
    index: '07',
    label: 'Financial & Compliance Services',
    headline: 'Numbers that stand up to scrutiny.',
    description:
      'Helping businesses stay compliant, financially organized and ready for growth through taxation, audits, accounting and strategic advisory.',
    pills: [
      'Direct Taxation',
      'GST',
      'Audit & Assurance',
      'Accounting',
      'ROC Compliance',
      'Payroll',
      'Virtual CFO',
      'Financial Advisory',
    ],
  },

  why: {
    eyebrow: 'Why financial compliance matters',
    headline: 'Strong businesses are built on clean books and compliant systems.',
    highlights: ['clean books', 'compliant systems'],
    intro:
      'Compliance is rarely what limits a business on the day it is filed. It is what limits the business two years later — in a funding round, a due diligence review, a tender qualification or an assessment notice, when every number is read back by someone with no reason to be generous.',
    points: [
      {
        index: '01',
        title: 'It removes avoidable risk',
        body: 'Late filings, mismatched returns and unreconciled books turn into penalties, interest and notices that cost far more than the work of staying current. Deadlines tracked and met is the cheapest risk management a business will ever buy.',
      },
      {
        index: '02',
        title: 'It unlocks funding',
        body: 'Lenders and investors underwrite what they can verify. Audited statements, consistent filings and a clean statutory record shorten diligence, widen the set of institutions willing to look, and keep the conversation about the business instead of its paperwork.',
      },
      {
        index: '03',
        title: 'It builds investor confidence',
        body: 'Books that reconcile month after month tell a board and a buyer something no pitch can: that the management team knows its own numbers. Governance is judged long before it is asked about.',
      },
      {
        index: '04',
        title: 'It makes growth sustainable',
        body: 'Accurate, timely reporting turns accounts from a compliance chore into a decision tool — margin visible by line, cash position known before it is a problem, and an organisation that can add a market, a subsidiary or an investor without rebuilding its finance function first.',
      },
    ],
  },

  categories: {
    eyebrow: 'Core service categories',
    headline: 'Every statutory obligation, under one practice.',
    intro:
      'Eight disciplines, run by qualified professionals and coordinated so nothing falls between advisors — from a monthly return to a board-ready set of accounts.',
    cards: [
      {
        index: '01',
        icon: 'percent',
        title: 'Direct Taxation',
        blurb: 'Income tax planning, returns and assessments handled end to end for companies, firms and individuals.',
        detail: ['Corporate & individual returns', 'TDS compliance', 'Advance tax planning', 'Assessments & notices'],
      },
      {
        index: '02',
        icon: 'fileCheck',
        title: 'GST Services',
        blurb: 'Registration, monthly and annual returns, reconciliation and refunds, filed on schedule.',
        detail: ['Registration & amendments', 'GSTR-1 / 3B / 9 filing', 'Input credit reconciliation', 'Refunds & departmental replies'],
      },
      {
        index: '03',
        icon: 'searchCheck',
        title: 'Audit & Assurance',
        blurb: 'Statutory, internal and tax audits that give management and stakeholders a verified position.',
        detail: ['Statutory audit', 'Internal audit', 'Tax audit', 'Stock & process audits'],
      },
      {
        index: '04',
        icon: 'database',
        title: 'Accounting & Bookkeeping',
        blurb: 'Day-to-day books maintained accurately, reconciled monthly and closed on time.',
        detail: ['Books of accounts', 'Bank & ledger reconciliation', 'Monthly closing', 'MIS reporting'],
      },
      {
        index: '05',
        icon: 'landmark',
        title: 'Company Law & ROC',
        blurb: 'Incorporation, secretarial records and every ROC filing a company owes the registrar.',
        detail: ['Company incorporation', 'Annual ROC filings', 'Board & statutory registers', 'Director and share changes'],
      },
      {
        index: '06',
        icon: 'trendingUp',
        title: 'Financial Advisory',
        blurb: 'Structuring, projections and funding readiness built on the numbers as they actually are.',
        detail: ['Financial projections', 'Business structuring', 'Funding & loan documentation', 'Due diligence support'],
      },
      {
        index: '07',
        icon: 'users',
        title: 'Payroll Compliance',
        blurb: 'Salary processing with PF, ESI and TDS handled as one monthly cycle.',
        detail: ['Payroll processing', 'PF & ESI compliance', 'Salary TDS & Form 16', 'Labour law registers'],
      },
      {
        index: '08',
        icon: 'briefcase',
        title: 'Virtual CFO',
        blurb: 'Senior finance leadership on a retainer — controls, cash, reporting and board conversations.',
        detail: ['Cash flow & budgeting', 'Financial controls', 'Board & investor reporting', 'Strategic finance support'],
      },
    ],
  },

  proof: {
    eyebrow: 'Why businesses choose OneSphereee',
    headline: 'One practice accountable for the whole picture.',
    intro:
      'Finance work is only useful when it is complete. These are the commitments the division is built around.',
    stats: [
      {
        value: { number: 100, suffix: '%' },
        label: 'Compliance Focus',
        blurb: 'Every engagement is run to statutory deadlines first — filings tracked, calendared and confirmed.',
      },
      {
        value: { word: 'Accurate' },
        label: 'Financial Reporting',
        blurb: 'Books reconciled and reviewed before they are reported, so the numbers hold up when they are checked.',
      },
      {
        value: { word: 'End-to-End' },
        label: 'Business Support',
        blurb: 'From incorporation and bookkeeping to audit and advisory, without handing you between advisors.',
      },
      {
        value: { number: 360, suffix: '°' },
        label: 'Regulatory Coverage',
        blurb: 'Income tax, GST, company law, payroll and labour obligations reviewed as one connected position.',
      },
    ],
  },

  /* ── Milestone 2 — the service showcase ────────────────────────────────
     Services are grouped into divisions, each with a layout of its own, so
     the page keeps changing register instead of repeating one section
     template seven times. */

  taxation: {
    index: '01',
    eyebrow: 'Direct Taxation',
    headline: 'Direct Taxation',
    intro: [
      'Tax is decided long before the return is filed. Structure, timing and documentation are what determine the liability — the filing only reports it.',
      'The division handles the whole cycle: planning through the year, computation and filing on time, and representation when the department asks a question. For companies, firms, trusts and individuals.',
    ],
    itemsLabel: 'Scope of work',
    items: [
      'Income Tax Return (ITR) Filing',
      'Corporate Tax Compliance',
      'Tax Planning & Advisory',
      'TDS / TCS Compliance',
      'Advance Tax Computation',
      'Capital Gain Tax Planning',
      'Trust & NGO Tax Compliance',
      '12AB / 80G Registration',
      'Income Tax Assessments',
      'Drafting Replies to Tax Notices',
      'Transfer Pricing Compliance',
    ],
  },

  gst: {
    index: '02',
    eyebrow: 'GST Solutions',
    headline: 'GST, from registration to appeal.',
    intro: [
      'GST is not a monthly task but a continuous position: every return, credit and document has to agree with the last one. We run the whole line — registration, filing, reconciliation, audit and, where it comes to it, appeals.',
    ],
    steps: [
      { code: 'REG', title: 'GST Registration', blurb: 'New registrations, amendments and additional places of business.' },
      { code: 'RET', title: 'GST Return Filing', blurb: 'GSTR-1 and 3B prepared, reconciled and filed to the monthly calendar.' },
      { code: 'ANN', title: 'Annual Return (GSTR-9 & 9C)', blurb: 'Annual return and reconciliation statement, tied back to the books.' },
      { code: 'ADV', title: 'GST Advisory', blurb: 'Rate, place-of-supply and credit positions confirmed before you commit.' },
      { code: 'AUD', title: 'GST Audit', blurb: 'Turnover, credit and output verified against records and returns.' },
      { code: 'ASM', title: 'GST Assessment', blurb: 'Scrutiny and assessment proceedings handled with the department.' },
      { code: 'APL', title: 'GST Appeals', blurb: 'Appeals drafted and represented before the appellate authority.' },
      { code: 'REF', title: 'GST Refunds', blurb: 'Export, inverted-duty and excess-payment refund claims filed and followed.' },
      { code: 'EWB', title: 'E-Way Bill', blurb: 'E-way bill generation, controls and movement documentation.' },
      { code: 'INV', title: 'E-Invoice Compliance', blurb: 'E-invoicing set up, mapped to your billing system and monitored.' },
    ],
  },

  audit: {
    index: '03',
    eyebrow: 'Audit & Assurance',
    headline: 'An independent read of the numbers.',
    intro: [
      'Assurance work is what turns a set of accounts into a position a bank, a board or a buyer can rely on. Each engagement is scoped to what it has to prove, and reported in language the reader can act on.',
    ],
    cards: [
      {
        icon: 'searchCheck',
        title: 'Statutory Audit',
        blurb: 'The audit the Companies Act requires, delivered to schedule.',
        detail: 'Planned around your close calendar so the report is signed when the board and the registrar need it.',
        scope: ['Audit planning & risk assessment', 'Substantive verification', 'Audit report & annexures'],
      },
      {
        icon: 'percent',
        title: 'Tax Audit',
        blurb: 'Section 44AB audit with the reporting the department expects.',
        detail: 'Books tested against the tax positions actually claimed, so Form 3CD reports what can be defended.',
        scope: ['Form 3CA / 3CB & 3CD', 'Disallowance review', 'Clause-wise documentation'],
      },
      {
        icon: 'clipboardCheck',
        title: 'Internal Audit',
        blurb: 'Controls, processes and exceptions reviewed on a running cycle.',
        detail: 'Findings come with the control gap that caused them and the fix, not a list of transactions.',
        scope: ['Process & control testing', 'Exception reporting', 'Management action tracking'],
      },
      {
        icon: 'package',
        title: 'Stock Audit',
        blurb: 'Physical verification of inventory against the books and the bank.',
        detail: 'Counts, valuation and drawing-power statements verified where lenders rely on them.',
        scope: ['Physical verification', 'Valuation review', 'Lender reporting'],
      },
      {
        icon: 'landmark',
        title: 'Bank Audit',
        blurb: 'Branch statutory and revenue audit for banking clients.',
        detail: 'Advances, income recognition and asset classification examined to the regulator’s expectations.',
        scope: ['Advances & NPA review', 'Income leakage', 'LFAR reporting'],
      },
      {
        icon: 'refresh',
        title: 'Concurrent Audit',
        blurb: 'Continuous audit that catches exceptions in the month they occur.',
        detail: 'Run alongside operations, so errors are corrected in period rather than reported after the year.',
        scope: ['Daily / weekly transaction checks', 'Exception escalation', 'Periodic reporting'],
      },
      {
        icon: 'fileCheck',
        title: 'Due Diligence Audit',
        blurb: 'A verified financial position before investment or acquisition.',
        detail: 'Quality of earnings, liabilities and compliance history examined before the money moves.',
        scope: ['Quality of earnings', 'Liability & contingency review', 'Compliance history'],
      },
      {
        icon: 'award',
        title: 'Statutory Certifications',
        blurb: 'Certificates that carry a chartered accountant’s signature.',
        detail: 'Issued only on verified records — the reason a certificate is accepted without a second look.',
        scope: ['Net worth & turnover', 'Fund utilisation', 'Regulatory formats'],
      },
    ],
  },

  operations: {
    index: '04',
    eyebrow: 'Accounting & Business Operations',
    headline: 'The finance function, run for you.',
    intro: [
      'Accounting and payroll are monthly machinery: they either run on time or they quietly accumulate a problem. We operate both as one cycle — books closed, salaries paid, statutory dues deposited, reporting on your desk.',
    ],
    metrics: [
      { value: { number: 12 }, label: 'Monthly Closes', caption: 'A reconciled close every month, not a year-end scramble.', fill: 1 },
      { value: { number: 100, suffix: '%' }, label: 'Ledger Reconciliation', caption: 'Bank, vendor and statutory ledgers agreed before reporting.', fill: 1 },
      { value: { number: 7, prefix: 'T+' }, label: 'MIS Turnaround', caption: 'Management reporting within a week of the period close.', fill: 0.72 },
      { value: { number: 5, suffix: ' Heads' }, label: 'Payroll Statutory', caption: 'PF, ESIC, PT, TDS and labour registers in one payroll run.', fill: 0.86 },
    ],
    seriesLabel: 'Close cycle · last 12 months',
    series: [0.52, 0.64, 0.58, 0.71, 0.66, 0.79, 0.74, 0.86, 0.8, 0.92, 0.88, 1],
    groups: [
      {
        icon: 'database',
        title: 'Accounting',
        blurb: 'Books maintained, reconciled and closed to a fixed monthly calendar.',
        items: [
          'Bookkeeping',
          'Outsourced Accounting',
          'Financial Statements',
          'MIS Reporting',
          'Bank Reconciliation',
          'Accounting System Setup',
        ],
      },
      {
        icon: 'users',
        title: 'Payroll',
        blurb: 'Salaries processed with every statutory head handled in the same cycle.',
        items: [
          'PF Compliance',
          'ESIC Compliance',
          'Professional Tax',
          'Payroll Processing',
          'Labour Law Advisory',
        ],
      },
    ],
  },

  corporate: {
    index: '05',
    eyebrow: 'Corporate Compliance',
    headline: 'One registry of everything the company owes.',
    intro: [
      'Company law and business registrations are separate filings with one thing in common: they all point back to the same entity. Held together, a change in one place updates the rest — held apart, that is where lapses begin.',
    ],
    hub: { label: 'THE ENTITY', caption: 'One compliance record, both directions.' },
    clusters: [
      {
        icon: 'landmark',
        title: 'Company Law & ROC',
        blurb: 'Incorporation through to strike-off, with the registers kept current in between.',
        items: [
          'Company Incorporation',
          'LLP Registration',
          'Annual ROC Filing',
          'Director KYC',
          'Share Compliance',
          'Board Resolutions',
          'Statutory Registers',
          'Company Strike Off',
        ],
      },
      {
        icon: 'idCard',
        title: 'Business Registrations',
        blurb: 'Every licence and registration a business needs to trade lawfully.',
        items: [
          'PAN',
          'TAN',
          'MSME',
          'IEC',
          'FSSAI',
          'Professional Tax',
          'Shop & Establishment',
          'Trade License',
        ],
      },
    ],
  },

  advisory: {
    index: '06',
    eyebrow: 'Financial Advisory',
    headline: 'Numbers put to work on the decision in front of you.',
    intro: [
      'Advisory work starts from the accounts as they actually are. Projections that a lender will accept, working capital sized to the cycle, and a plan the business can hold to after the meeting ends.',
    ],
    cards: [
      { icon: 'fileText', title: 'Project Reports', blurb: 'Bankable project reports built on verifiable assumptions.' },
      { icon: 'barChart', title: 'CMA Data', blurb: 'CMA statements prepared to the format lenders assess.' },
      { icon: 'landmark', title: 'Loan Assistance', blurb: 'Documentation, submission and follow-through with the bank.' },
      { icon: 'refresh', title: 'Working Capital', blurb: 'Limits sized to the real operating cycle, not a rule of thumb.' },
      { icon: 'pieChart', title: 'Budgeting', blurb: 'Annual budgets with variance tracked against actuals.' },
      { icon: 'target', title: 'Financial Planning', blurb: 'Medium-term plans that connect capital, cost and growth.' },
      { icon: 'trendingUp', title: 'Cash Flow Management', blurb: 'Forecasting and controls that keep the position known in advance.' },
    ],
  },

  growth: {
    index: '07',
    eyebrow: 'Business Growth Solutions',
    headline: 'Senior finance capability, without the hire.',
    intro: [
      'Beyond compliance, the practice takes on the work a finance leadership team would: strategy and controls, valuation, consulting, sector-specific compliance, representation and the certifications that support all of it.',
    ],
    action: { label: 'Discuss Your Requirement', href: '/contact' },
    groups: [
      {
        icon: 'briefcase',
        title: 'Virtual CFO',
        blurb: 'Finance leadership on retainer — strategy, controls and the board conversation.',
        featured: true,
        items: [
          'Financial Strategy',
          'Compliance Management',
          'Investor Reporting',
          'Cost Control',
          'Performance Monitoring',
          'Decision Support',
        ],
      },
      {
        icon: 'scale',
        title: 'Valuation',
        blurb: 'Defensible values for transactions, regulation and reporting.',
        items: ['Share Valuation', 'Fair Value', 'Net Worth Certification'],
      },
      {
        icon: 'settings',
        title: 'Management Consulting',
        blurb: 'Process and control work that makes the numbers reliable at source.',
        items: [
          'SOP Development',
          'Process Improvement',
          'Internal Financial Controls',
          'Cost Optimization',
          'Business Process Automation',
        ],
      },
      {
        icon: 'heart',
        title: 'Trust & NGO',
        blurb: 'Registration and ongoing compliance for the non-profit sector.',
        items: ['Trust Registration', 'NGO Compliance', 'CSR Advisory', 'FCRA Advisory'],
      },
      {
        icon: 'gavel',
        title: 'Litigation',
        blurb: 'Representation and drafting when a position has to be defended.',
        items: ['Representation', 'Appeals', 'Notice Management', 'Legal Drafting'],
      },
      {
        icon: 'award',
        title: 'Certifications',
        blurb: 'Certificates issued on verified records, in the format the recipient requires.',
        featured: true,
        items: [
          'Net Worth Certificate',
          'Turnover Certificate',
          'Bank Certificates',
          'Visa Documentation',
          'Fund Utilization',
          'Form 15CB',
          'Other Statutory Certifications',
        ],
      },
    ],
  },

  /* ── Milestone 3 — trust, process and the close ────────────────────────
     The page has said what it does; these chapters say who it is for, why
     this practice, how an engagement runs, what it produces, and then ask
     for the conversation. */

  industries: {
    index: '08',
    eyebrow: 'Industries we serve',
    headline: 'The same rules. Very different businesses.',
    intro: [
      'Statutory obligations are common to everyone; what changes is how a business actually earns, records and moves money. Our financial and compliance solutions are tailored to the size, sector and stage of the organisation — a manufacturer reconciling stock, an e-commerce seller reconciling settlements and a trust reporting on grants each need the same accuracy from a different starting point.',
    ],
    items: [
      { icon: 'factory', label: 'Manufacturing' },
      { icon: 'store', label: 'Retail' },
      { icon: 'shoppingBag', label: 'E-Commerce' },
      { icon: 'heart', label: 'Healthcare' },
      { icon: 'home', label: 'Hospitality' },
      { icon: 'building', label: 'Real Estate' },
      { icon: 'wrench', label: 'Construction' },
      { icon: 'cpu', label: 'Information Technology' },
      { icon: 'briefcase', label: 'Professional Services' },
      { icon: 'zap', label: 'Startups' },
      { icon: 'layers', label: 'MSMEs' },
      { icon: 'globe', label: 'Large Enterprises' },
      { icon: 'users', label: 'NGOs & Trusts' },
      { icon: 'graduationCap', label: 'Educational Institutions' },
      { icon: 'truck', label: 'Logistics & Supply Chain' },
      { icon: 'package', label: 'Import & Export Businesses' },
    ],
  },

  whyChoose: {
    index: '09',
    eyebrow: 'Why choose OneSphereee',
    headline: 'A practice built to be relied on, not just retained.',
    intro: [
      'Eight commitments that decide what an engagement is actually like once the proposal is signed.',
    ],
    points: [
      {
        icon: 'award',
        title: 'Experienced Financial Professionals',
        blurb:
          'Qualified professionals who have carried these filings, audits and assessments before — so positions are taken with judgement, not guesswork.',
      },
      {
        icon: 'shield',
        title: 'Complete Regulatory Compliance',
        blurb:
          'Income tax, GST, company law, payroll and labour obligations tracked as one calendar, so nothing is missed because it belonged to someone else’s list.',
      },
      {
        icon: 'layers',
        title: 'End-to-End Business Support',
        blurb:
          'Incorporation, books, payroll, audit, advisory and representation from one practice — no hand-offs between advisors who never speak to each other.',
      },
      {
        icon: 'searchCheck',
        title: 'Transparent Advisory',
        blurb:
          'Advice comes with the reasoning and the risk stated plainly, including when the answer is that a position will not hold.',
      },
      {
        icon: 'clock',
        title: 'Timely Filing & Reporting',
        blurb:
          'Deadlines are worked backwards from, not towards. Filings are prepared ahead of the date and confirmed once accepted.',
      },
      {
        icon: 'target',
        title: 'Strategic Financial Planning',
        blurb:
          'Compliance work feeds the plan: structure, timing and capital decided with the tax and funding consequences already understood.',
      },
      {
        icon: 'cpu',
        title: 'Technology-Driven Processes',
        blurb:
          'Cloud accounting, reconciliation tooling and e-invoicing integrations, so the record is current rather than reconstructed at year-end.',
      },
      {
        icon: 'users',
        title: 'Dedicated Relationship Managers',
        blurb:
          'One point of contact who knows your entity, your calendar and your history — and who answers when something is urgent.',
      },
    ],
  },

  process: {
    index: '10',
    eyebrow: 'Our engagement process',
    headline: 'How an engagement actually runs.',
    intro: [
      'Eight stages from the first conversation to a standing relationship. The first four establish the position; the last four keep it that way.',
    ],
    steps: [
      {
        index: '01',
        icon: 'messageCircle',
        title: 'Business Consultation',
        blurb: 'We understand the entity, the sector and what is already in place before anything is proposed.',
      },
      {
        index: '02',
        icon: 'clipboardCheck',
        title: 'Compliance Assessment',
        blurb: 'Registrations, filings and open matters reviewed to establish exactly where you stand today.',
      },
      {
        index: '03',
        icon: 'inbox',
        title: 'Document Collection',
        blurb: 'A defined list, collected once, through a single channel — not asked for piece by piece.',
      },
      {
        index: '04',
        icon: 'searchCheck',
        title: 'Financial Review',
        blurb: 'Books, balances and past positions examined so the numbers we work from are verified.',
      },
      {
        index: '05',
        icon: 'target',
        title: 'Planning & Strategy',
        blurb: 'Tax, structure and reporting decisions agreed with you, with the trade-offs stated.',
      },
      {
        index: '06',
        icon: 'settings',
        title: 'Execution',
        blurb: 'Filings, registrations, accounting and payroll run to the agreed calendar.',
      },
      {
        index: '07',
        icon: 'barChart',
        title: 'Review & Reporting',
        blurb: 'Periodic reporting with the position explained — what changed, what it means, what is next.',
      },
      {
        index: '08',
        icon: 'refresh',
        title: 'Ongoing Advisory & Compliance Support',
        blurb: 'A standing relationship: deadlines tracked, questions answered, and notices handled as they arrive.',
      },
    ],
  },

  outcomes: {
    index: '11',
    eyebrow: 'Business outcomes',
    headline: 'What changes once the finance function is run properly.',
    intro: [
      'These are the results the work is measured against — the reasons a business notices the difference long after the filing is done.',
    ],
    outcomes: [
      {
        title: 'Accurate Financial Records',
        blurb: 'Books that reconcile every month, so every report after them starts from something true.',
      },
      {
        title: 'Timely Regulatory Compliance',
        blurb: 'Returns and filings submitted ahead of their dates, with acknowledgements on record.',
      },
      {
        title: 'Lower Financial Risk',
        blurb: 'Penalties, interest and notices avoided by staying current rather than correcting later.',
      },
      {
        title: 'Better Tax Efficiency',
        blurb: 'Liability managed through structure and timing, within what the law actually allows.',
      },
      {
        title: 'Audit Readiness',
        blurb: 'Records, registers and reconciliations kept in a state where an audit is routine.',
      },
      {
        title: 'Improved Cash Flow Visibility',
        blurb: 'The cash position known in advance, not discovered at the end of the month.',
      },
      {
        title: 'Stronger Corporate Governance',
        blurb: 'Statutory records, board documentation and controls that hold up to inspection.',
      },
      {
        title: 'Investor & Bank Confidence',
        blurb: 'A clean, verifiable financial history that shortens diligence and widens your options.',
      },
    ],
  },

  faq: {
    index: '12',
    eyebrow: 'Frequently asked questions',
    headline: 'Questions we are asked before we start.',
    intro: [
      'If your question is not here, ask it directly — a straight answer costs nothing and saves both of us time.',
    ],
    items: [
      {
        question: 'Why should I outsource accounting?',
        answer:
          'Because an in-house junior is rarely cheaper once you count supervision, software, statutory knowledge and the cost of a mistake. Outsourcing gives you a qualified team, a fixed monthly cost, continuity when someone leaves, and a review layer above the person doing the entries.',
      },
      {
        question: 'How often should GST returns be filed?',
        answer:
          'Most registered businesses file GSTR-1 and GSTR-3B monthly; smaller taxpayers under the QRMP scheme file quarterly with monthly tax payment. The annual return (GSTR-9, with GSTR-9C where applicable) is filed once a year. We confirm the correct cycle for your registration at the assessment stage and then run it to the calendar.',
      },
      {
        question: 'Can you represent us before tax authorities?',
        answer:
          'Yes. We draft and file replies to notices, appear in assessment and scrutiny proceedings, and represent appeals before the appellate authorities — for both income tax and GST matters.',
      },
      {
        question: 'Do you provide Virtual CFO services?',
        answer:
          'Yes. The Virtual CFO engagement gives you senior finance capability on a retainer: financial strategy, controls, cash and budgeting, investor and board reporting, and decision support — without the cost of a full-time hire.',
      },
      {
        question: 'Can startups use these services?',
        answer:
          'Startups are one of the groups this suits best. We handle incorporation, registrations, books, payroll and the first audit, then scale the engagement as funding and headcount grow — so the finance function is investor-ready before diligence begins, not after.',
      },
      {
        question: 'Do you help with company incorporation?',
        answer:
          'Yes — private limited companies, LLPs and other structures, including name approval, documentation, PAN, TAN and the post-incorporation filings. We also advise on which structure fits before it is registered, which is harder to change afterwards.',
      },
      {
        question: 'Can you handle annual ROC compliance?',
        answer:
          'Yes. Annual ROC filings, director KYC, statutory registers, board and general meeting documentation, share-related filings and event-based forms are handled as a standing part of the engagement.',
      },
      {
        question: 'How quickly can we begin?',
        answer:
          'Usually within a few working days of the consultation. Once the scope is agreed and documents are shared, the compliance assessment starts immediately — and any filing already close to its due date is prioritised in the first cycle.',
      },
    ],
  },

  cta: {
    headline: 'Financial clarity begins with the right partner.',
    description: [
      'Whether you’re a startup, SME, growing enterprise or established corporation, OneSphereee delivers integrated financial, taxation and compliance solutions that help you stay compliant, make informed decisions and scale with confidence.',
    ],
    primaryCta: { label: 'Schedule a Consultation', href: '/contact' },
    secondaryCta: { label: 'Explore Our Services', href: '/services' },
  },
};
