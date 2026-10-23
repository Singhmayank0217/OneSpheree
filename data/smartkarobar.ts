export interface IntegrationChannel {
  name: string;
  category: 'Marketplace' | 'Storefront' | 'Advertising' | 'Messaging';
  status: 'In Development' | 'Planned' | 'Planned / Partner API';
  description: string;
  note: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  highlighted?: boolean;
  skuLimit: string;
  channelLimit: string;
  features: string[];
  exclusions?: string[];
  ctaText: string;
  ctaHref: string;
}

export interface ListingStep {
  step: number;
  title: string;
  description: string;
}

export interface SyncStep {
  step: number;
  title: string;
  description: string;
  detail: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const smartkarobarData = {
  meta: {
    title: 'SmartKarobar — Run Your E-commerce Business Smarter | Onespheree',
    description:
      'SmartKarobar by Onespheree helps online sellers simplify product listings, synchronize inventory across Amazon, Flipkart, Meesho, and own stores, manage orders, and access AI-driven insights.',
    tagline: 'Run Smarter. Grow Faster.',
    headline: 'Run Your E-commerce Business Smarter, from One Dashboard.',
    subheadline:
      'SmartKarobar helps online sellers simplify product listings, synchronize inventory, manage orders, organize advertising workflows, and access AI-powered business insights through one connected platform.',
    canonicalUrl: 'https://onespheree.com/smartkarobar',
  },

  integrations: [
    {
      name: 'Amazon India',
      category: 'Marketplace',
      status: 'In Development',
      description: 'Unified listing, order ingestion, and inventory balance synchronization via Amazon Selling Partner API (SP-API).',
      note: 'Subject to official Amazon SP-API developer registration, scope authorization, and sandbox validation.',
    },
    {
      name: 'Flipkart',
      category: 'Marketplace',
      status: 'Planned',
      description: 'Order retrieval, catalog mapping, and multi-location inventory updates for active Flipkart seller accounts.',
      note: 'Integration planned; dependent on seller authorization and official Flipkart developer API access.',
    },
    {
      name: 'Meesho',
      category: 'Marketplace',
      status: 'Planned',
      description: 'Direct listing preparation, order tracking, and stock synchronization tailored for Meesho sellers.',
      note: 'In active architectural planning; subject to platform API policies and seller integration capabilities.',
    },
    {
      name: 'Own E-Commerce Website',
      category: 'Storefront',
      status: 'In Development',
      description: 'Direct webhook and REST API integration with custom storefronts, Shopify, or WooCommerce stores.',
      note: 'Real-time two-way synchronization for orders and central stock levels.',
    },
    {
      name: 'Meta Ads',
      category: 'Advertising',
      status: 'Planned',
      description: 'Campaign configuration, catalog selection, and return-on-ad-spend (ROAS) tracking for authorized Meta accounts.',
      note: 'Requires customer-authorized Meta Business account. Ad spend is billed directly by Meta.',
    },
    {
      name: 'WhatsApp Business',
      category: 'Messaging',
      status: 'Planned',
      description: 'Conversational controller operated by Onespheree for on-demand order reports, low-stock alerts, and listing status.',
      note: 'Operated through official Meta WhatsApp Business Platform APIs with strict tenant session isolation.',
    },
  ] as IntegrationChannel[],

  listingWorkflow: {
    heading: 'Create Once. Publish to Your Connected Sales Channels.',
    subheading:
      'Eliminate repetitive catalog entry. Enter your product attributes, identifiers, pricing, and media once, validate requirements against each channel’s category taxonomy, and prepare verified listings for external publication.',
    steps: [
      {
        step: 1,
        title: 'Create Product Master',
        description:
          'Input your unified SKU, brand, title, description, dimensions, tax rate, and master pricing in SmartKarobar.',
      },
      {
        step: 2,
        title: 'Add Images & Compliance Details',
        description:
          'Upload high-resolution media, HSN codes, manufacturer details, and country of origin required by Indian e-commerce norms.',
      },
      {
        step: 3,
        title: 'Select Connected Channels',
        description:
          'Choose target channels among Amazon, Flipkart, Meesho, and your own website, customizing channel-specific margins if needed.',
      },
      {
        step: 4,
        title: 'Validate Schema & Identifiers',
        description:
          'SmartKarobar pre-checks required attributes, ASIN/FSN mappings, barcode (EAN/UPC) requirements, and category-specific fields.',
      },
      {
        step: 5,
        title: 'Publish & Monitor Status',
        description:
          'Transmit listings to authorized APIs with tracked submission feeds. Distinguish stored drafts from live marketplace listings with clear error reports.',
      },
    ] as ListingStep[],
    disclaimer:
      'SmartKarobar distinguishes internal catalog drafts from successfully published external listings. Publishing capability depends on active marketplace API permissions, authorized seller credentials, and marketplace catalog approval policies. No scraping or unauthorized mechanisms are used.',
  },

  inventorySync: {
    heading: 'Keep Inventory Consistent Across Your Connected Channels.',
    subheading:
      'Prevent manual updates and reduce overselling risks with an automated, event-driven synchronization workflow designed for reliability across multi-channel operations.',
    example:
      'Illustrative Example: A seller maintains 10 units of an apparel SKU. A customer purchases 1 unit on Amazon. SmartKarobar captures and validates the order event, decrements the central balance to 9 units, and immediately queues inventory adjustment requests to the seller’s other connected channels (Flipkart, Meesho, and own website).',
    steps: [
      {
        step: 1,
        title: 'Order Event Capture',
        description: 'An order event arrives from a connected channel or webhook.',
        detail: 'Event is logged and verified with idempotency keys to prevent double-processing.',
      },
      {
        step: 2,
        title: 'Central Stock Deducted',
        description: 'Available inventory is decremented safely in the central ledger.',
        detail: 'Atomic database updates ensure zero duplicate stock decrements.',
      },
      {
        step: 3,
        title: 'Adjustment Queuing',
        description: 'Delta update jobs are generated for all other connected channels.',
        detail: 'Asynchronous worker queue processes updates while respecting marketplace API rate limits.',
      },
      {
        step: 4,
        title: 'Channel Updates & Bounded Retries',
        description: 'Updated stock quantities are transmitted via authorized channel APIs.',
        detail: 'Transient failures are retried with exponential backoff and comprehensive error logs.',
      },
      {
        step: 5,
        title: 'Periodic Reconciliation',
        description: 'Scheduled background audits compare channel balances against the master ledger.',
        detail: 'Catches discrepancies caused by delayed marketplace feeds or offline updates.',
      },
    ] as SyncStep[],
    technicalSafeguards: [
      'Event-driven processing with idempotent order verification',
      'Protection against duplicate decrements from repeated notifications',
      'Bounded retries with exponential backoff and audit logs',
      'Strict adherence to marketplace API rate limits and throttling windows',
      'Scheduled reconciliation cycles to recover from delayed third-party feeds',
      'Transparent status indicators: Synced, Queued, In Flight, or Action Required',
    ],
    disclaimer:
      'Actual synchronization speed depends on marketplace event availability, network latency, queue processing, and third-party API rate limits. While designed to substantially mitigate discrepancies, no system can guarantee zero overselling under simultaneous peak order spikes across disconnected platforms.',
  },

  orderManagement: {
    heading: 'All Your Orders. One Organized Workspace.',
    subheading:
      'Manage incoming orders, monitor fulfillment stages, and keep operations moving without logging into multiple seller portals.',
    highlights: [
      {
        title: 'Multi-Channel Order Stream',
        description: 'Consolidate incoming orders from Amazon, Flipkart, Meesho, and your web storefront into a single standardized feed.',
      },
      {
        title: 'Order Status Lifecycle',
        description: 'Track orders through Confirmed, In Packing, Shipped, Delivered, Cancelled, and Returned states with audit timestamps.',
      },
      {
        title: 'Document & Shipping Preparation',
        description: 'Generate supported invoices, packing slips, and dispatch manifests tailored to connected marketplace guidelines.',
      },
      {
        title: 'Inventory Allocation',
        description: 'Automatically reserve warehouse stock upon order confirmation and release stock if an order is cancelled before dispatch.',
      },
      {
        title: 'Operational Notifications',
        description: 'Receive immediate alerts for high-priority orders, expedited delivery requests, and return requests.',
      },
      {
        title: 'Administrative Time Savings',
        description: 'Eliminate manual spreadsheet exports, portal switching, and error-prone reconciliation between sales channels.',
      },
    ],
  },

  whatsappController: {
    heading: 'Manage Supported Business Tasks Through WhatsApp.',
    subheading:
      'SmartKarobar plans to provide a secure WhatsApp-based business interface, enabling authorized sellers to query key operational metrics and receive urgent alerts on the go.',
    samplePrompts: [
      { prompt: "Show today's orders.", response: 'Today: 42 orders processed across Amazon (28), Website (10), and Meesho (4). Total Value: ₹68,450. 6 orders awaiting packing.' },
      { prompt: "Which products are running low on stock?", response: 'Warning: 3 SKUs below reorder threshold. SKU-APL-04 (Cotton Kurti) has 4 units left across connected channels.' },
      { prompt: "Give me today's sales summary.", response: 'Sales Summary: Gross Sales ₹68,450 (+14% vs yesterday). Top seller: Wireless Neckband Pro (18 units).' },
      { prompt: "Check the status of a product listing.", response: 'SKU-ELC-89: Amazon (Active/Buybox), Flipkart (Active), Meesho (Pending Review). Website: Published.' },
    ],
    architecture: [
      {
        title: 'Operated by Onespheree',
        description: 'Onespheree manages the official Meta WhatsApp Business integration, maintaining compliance with WhatsApp messaging policies.',
      },
      {
        title: 'Strict Tenant Authentication',
        description: 'Every WhatsApp phone number is authenticated and mapped securely to a single SmartKarobar account tenant.',
      },
      {
        title: 'Zero Cross-Tenant Leakage',
        description: 'Queries execute strictly against the authenticated tenant’s database. One seller cannot view or affect another seller’s records.',
      },
      {
        title: 'Action Confirmations',
        description: 'Consequential operations (such as inventory threshold overrides) require an explicit secondary confirmation step.',
      },
    ],
  },

  aiAdvisor: {
    heading: 'An AI Assistant That Understands Your Business.',
    subheading:
      'Included in the Premium plan, the SmartKarobar AI Business Advisor uses authorized, tenant-specific business data to deliver actionable insights, summarize operational patterns, and help you make data-driven decisions.',
    capabilities: [
      {
        title: 'Contextual Sales Summaries',
        description: 'Quickly digest sales volume, return rates, and revenue shifts across channels without exporting raw spreadsheets.',
      },
      {
        title: 'Inventory Priority Alerts',
        description: 'Identify fast-moving inventory before stock runs out, and flag slow-moving items incurring warehouse holding costs.',
      },
      {
        title: 'Channel Performance Comparison',
        description: 'Evaluate which products thrive on Amazon vs Meesho vs your own storefront to allocate marketing and inventory smartly.',
      },
      {
        title: 'Operational Explanations',
        description: 'Ask questions like "Why did my average order value change this week?" and receive answers grounded in your real sales history.',
      },
    ],
    dataIsolation: [
      {
        title: 'Tenant-Specific Retrieval (RAG)',
        description: 'The AI uses retrieval-augmented generation scoped strictly to your authorized business records. No generic hallucinations.',
      },
      {
        title: 'No Foundation Model Training',
        description: 'Your proprietary sales, customer, pricing, and inventory data is never used to train public or foundation AI models.',
      },
      {
        title: 'Credential & PII Redaction',
        description: 'API keys, credentials, and customer personal identifiable information (PII) are stripped before analytical reasoning prompts.',
      },
      {
        title: 'Honest Missing-Data Handling',
        description: 'When historical data is incomplete or unavailable, the assistant clearly states the limitation rather than guessing.',
      },
    ],
  },

  metaAdsController: {
    heading: 'Manage Supported Advertising Workflows from Your Dashboard.',
    subheading:
      'Streamline your digital advertising. Connect your authorized Meta Ads account to create product campaigns, adjust daily budgets, and monitor ROAS directly alongside your catalog.',
    workflow: [
      { step: 1, title: 'Select Product', description: 'Choose top-performing SKUs directly from your SmartKarobar product catalogue.' },
      { step: 2, title: 'Choose Ad Account', description: 'Select your connected, customer-authorized Meta Business ad account.' },
      { step: 3, title: 'Configure Campaign', description: 'Set target audience attributes, placements, creative assets, and campaign objective.' },
      { step: 4, title: 'Review Budget & Schedule', description: 'Specify daily or lifetime spend and scheduling parameters.' },
      { step: 5, title: 'Confirm & Launch', description: 'Review campaign summary and approve creation with explicit seller confirmation.' },
    ],
    rules: [
      'Customers connect and authorize their own eligible Meta Business & Ad Accounts via official OAuth.',
      'Campaigns are created strictly within the seller’s authorized account under their ownership.',
      'Advertising spend is billed directly by Meta through the payment method configured in the seller’s Meta ad account.',
      'No campaigns are launched without explicit user review and confirmation.',
      'Performance reporting (spend, clicks, ROAS) is retrieved via official Meta Marketing APIs where authorized.',
    ],
  },

  howItWorks: [
    {
      step: 1,
      title: 'Create Your Workspace',
      description: 'Sign up for SmartKarobar, configure your company details, and choose the subscription tier suited to your catalog size.',
    },
    {
      step: 2,
      title: 'Connect Supported Channels',
      description: 'Authorize your sales channels (Amazon, Flipkart, Meesho, or storefront) using secure official OAuth and developer credentials.',
    },
    {
      step: 3,
      title: 'Configure Automations',
      description: 'Set your reorder thresholds, inventory sync rules, channel pricing adjustments, and notification preferences.',
    },
    {
      step: 4,
      title: 'Monitor & Grow',
      description: 'Track orders, inventory balances, ad performance, and WhatsApp operations from your unified dashboard.',
    },
  ],

  pricing: {
    heading: 'Simple, Transparent Subscription Plans',
    subheading:
      'Predictable monthly plans designed for growing online sellers. All plans include unified catalogue management and core automations.',
    taxNote: 'Prices in Indian Rupees (INR). GST (18%) applicable as per prevailing Indian tax regulations. Proposed pricing and limits subject to operational cost validation and feature readiness.',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        price: '₹1,499',
        period: '/month',
        tagline: 'Essential multi-channel listing and inventory sync for emerging sellers.',
        skuLimit: 'Up to 200 SKUs (proposed limit)',
        channelLimit: 'Up to 2 connected sales channels',
        features: [
          'Core SmartKarobar dashboard',
          'Product catalogue & inventory management',
          'Order management for supported connected channels',
          'Core predefined workflow automations',
          'Basic order notifications',
          'Up to 200 SKUs (proposed initial limit)',
          'Up to 2 connected sales channels (selected from Amazon, Flipkart, Meesho, or your own website)',
          'Standard email & ticketing support',
        ],
        exclusions: [
          'Meta Ads controller',
          'WhatsApp business controller',
          'Personal AI business advisor',
        ],
        ctaText: 'Choose Basic Plan',
        ctaHref: '/contact?plan=basic&subject=SmartKarobar+Basic+Plan',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '₹2,999',
        period: '/month',
        tagline: 'Enhanced capacity and advertising management for expanding brands.',
        highlighted: true,
        skuLimit: 'Up to 2,500 SKUs (proposed limit)',
        channelLimit: 'Up to 3 connected sales channels',
        features: [
          'Everything in Basic, plus:',
          'Meta Ads controller for supported authorized accounts',
          'Supported advertising workflows & ROAS reporting',
          'Expanded catalogue: up to 2,500 SKUs (proposed limit)',
          'Up to 3 connected sales channels (selected from Amazon, Flipkart, Meesho, or your own website)',
          'Automated stock delta queuing & reconciliation',
          'Priority email & chat support',
        ],
        exclusions: [
          'WhatsApp business controller',
          'Personal AI business advisor',
        ],
        ctaText: 'Choose Growth Plan',
        ctaHref: '/contact?plan=growth&subject=SmartKarobar+Growth+Plan',
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '₹3,999',
        period: '/month',
        tagline: 'Full power: WhatsApp business controller and AI-driven business intelligence.',
        skuLimit: 'Up to 10,000 SKUs (proposed limit)',
        channelLimit: 'Up to 4 connected sales channels',
        features: [
          'Everything in Growth, plus:',
          'Up to 4 connected sales channels (all 4 supported channels: Amazon, Flipkart, Meesho, and your own website)',
          'WhatsApp business controller operated by Onespheree',
          '150 included WhatsApp messages per billing month',
          'Personal AI business advisor with tenant-isolated RAG',
          '100 included AI messages per billing month',
          'Advanced analytics and trend insights',
          'Higher catalogue allowance: up to 10,000 SKUs (proposed limit)',
          'Additional usage capacity managed by authorized super admin',
          'Dedicated onboarding assistance from Onespheree',
        ],
        ctaText: 'Choose Premium Plan',
        ctaHref: '/contact?plan=premium&subject=SmartKarobar+Premium+Plan',
      },
    ] as PricingPlan[],
    comparison: [
      { feature: 'Monthly Price', basic: '₹1,499/mo', growth: '₹2,999/mo', premium: '₹3,999/mo' },
      { feature: 'Sales Channel Limit', basic: 'Up to 2 channels', growth: 'Up to 3 channels', premium: 'Up to 4 channels (Full Scope)' },
      { feature: 'Permitted Channel Types', basic: 'Amazon, Flipkart, Meesho, Own Site', growth: 'Amazon, Flipkart, Meesho, Own Site', premium: 'Amazon, Flipkart, Meesho, Own Site' },
      { feature: 'SKU Catalogue Limit', basic: '200 SKUs', growth: '2,500 SKUs', premium: '10,000 SKUs' },
      { feature: 'Meta Ads Controller', basic: '—', growth: 'Included (separate service)', premium: 'Included (separate service)' },
      { feature: 'WhatsApp Controller', basic: '—', growth: '—', premium: 'Included (150 msgs/mo)' },
      { feature: 'AI Business Advisor', basic: '—', growth: '—', premium: 'Included (100 msgs/mo)' },
      { feature: 'Automated Stock Sync', basic: 'Included', growth: 'Included', premium: 'Included' },
      { feature: 'Order Management', basic: 'Included', growth: 'Included', premium: 'Included' },
    ],
  },

  usageAllowances: {
    statement:
      'Premium includes 150 WhatsApp messages and 100 AI advisor messages per billing month. Additional usage may be purchased subject to availability and applicable charges.',
    details: [
      {
        title: 'Per-Tenant Usage Meters',
        description: 'Usage counters track WhatsApp messages and AI advisor prompts consumed during each monthly billing cycle.',
      },
      {
        title: 'Cycle Resets',
        description: 'Included allowances reset automatically at the beginning of each billing period.',
      },
      {
        title: 'Quota Proximity Alerts',
        description: 'Sellers receive dashboard notifications when consumption approaches 80% and 100% of their monthly limit.',
      },
      {
        title: 'Non-Disruptive Limit Handling',
        description: 'Exhausting monthly AI or WhatsApp allowances does not interrupt core inventory synchronization, order management, or listing workflows.',
      },
      {
        title: 'Super-Admin Verified Top-Ups',
        description: 'Additional capacity is provisioned through an authorized Onespheree super-admin process after verified payment.',
      },
    ],
  },

  transparency: {
    heading: 'Connected Commerce. Clear Permissions. Secure Operations.',
    subheading:
      'SmartKarobar is proudly built, owned, and operated by Onespheree. We prioritize seller data privacy, clear authorization boundaries, and adherence to official marketplace policies.',
    points: [
      {
        title: 'Operator Transparency',
        description: 'SmartKarobar is an e-commerce automation SaaS product engineered and operated by Onespheree (onespheree.com).',
      },
      {
        title: 'Authorized Access Only',
        description: 'Marketplace integrations use official authorized developer protocols (e.g. Amazon SP-API OAuth, Meta Business Login). Customers connect only their own eligible seller accounts.',
      },
      {
        title: 'Strict Least-Privilege Scopes',
        description: 'SmartKarobar requests only the specific API permissions required to fulfill listing, inventory, and order operations.',
      },
      {
        title: 'Tenant Data Isolation',
        description: 'Every seller’s business data, credentials, and order history are securely segregated. Cross-tenant data access is strictly prevented.',
      },
      {
        title: 'Independent Operations & Policy Compliance',
        description: 'SmartKarobar is an independent automation platform. Integration availability depends on third-party permissions, API status, and platform policies. SmartKarobar does not claim unverified endorsement, direct partnership, or Appstore listing from Amazon, Flipkart, Meesho, or Meta.',
      },
      {
        title: 'Data Protection & Governance',
        description: 'Seller data is utilized exclusively for delivering requested platform operations. Data is not sold, rented, or shared with unauthorized third parties.',
      },
    ],
  },

  faq: [
    {
      q: 'What is SmartKarobar?',
      a: 'SmartKarobar is an e-commerce operations SaaS developed and operated by Onespheree. It provides online sellers with a unified workspace to manage product catalogues, synchronize inventory balances, track incoming orders, orchestrate Meta advertising campaigns, and access AI-assisted business insights across connected sales channels.',
    },
    {
      q: 'Which sales channels are supported, and what are the plan channel limits?',
      a: "SmartKarobar strictly supports exactly four sales-channel types: Amazon (Amazon India via SP-API), Flipkart, Meesho, and the seller's own e-commerce website (custom storefronts, Shopify, or WooCommerce). Plan channel limits are: Basic permits up to 2 connected sales channels; Growth permits up to 3 connected sales channels; Premium permits up to 4 connected sales channels (the complete 4-channel scope). Meta Ads and WhatsApp Business are separate operational service integrations and never count against sales-channel limits.",
    },
    {
      q: 'Can I connect a fifth sales channel or additional marketplaces?',
      a: "No. SmartKarobar's supported sales-channel scope is strictly limited to four channels: Amazon, Flipkart, Meesho, and your own website. Connecting a fifth sales channel is not supported and is rejected by the platform. Meta Ads and WhatsApp are operational service integrations, not sales channels, and do not consume your sales channel allowance.",
    },
    {
      q: 'Can I publish products to multiple channels?',
      a: 'Yes, SmartKarobar is designed to let sellers enter product data once, specify channel-specific pricing or taxonomy details, and submit listings to supported channels. Because each marketplace imposes specific attribute schemas, image standards, and compliance rules, SmartKarobar validates listings before transmission. Stored drafts are clearly distinguished from successfully published external listings.',
    },
    {
      q: 'How does inventory synchronization work?',
      a: 'When an order is received from a connected channel, SmartKarobar validates the event, decrements the central inventory balance safely using idempotent processing, and queues delta stock adjustments for your other connected channels. Bounded retries and scheduled reconciliation help maintain consistency across platforms.',
    },
    {
      q: 'Can I connect my own e-commerce website?',
      a: 'Yes. In addition to marketplaces, SmartKarobar supports direct integration with your independent online store (such as WooCommerce, Shopify, or custom APIs) via webhooks and REST endpoints, ensuring inventory and order flows remain unified with your marketplace sales.',
    },
    {
      q: 'How does WhatsApp integration work?',
      a: 'Onespheree operates the WhatsApp Business interface. Authorized sellers can interact with SmartKarobar via WhatsApp to check order summaries, low-stock alerts, and listing statuses. Conversations are strictly authenticated and mapped to the seller’s tenant account, ensuring complete data isolation and compliance with Meta WhatsApp policies.',
    },
    {
      q: 'What is included in the Premium AI advisor?',
      a: 'The AI Business Advisor included in the Premium plan uses retrieval-augmented generation (RAG) over your authorized, tenant-specific business data to summarize sales trends, highlight reorder needs, compare channel performance, and answer operational questions. It does not train foundation models on your private data, and never accesses other tenants’ information.',
    },
    {
      q: 'How many WhatsApp and AI messages are included?',
      a: 'The Premium plan includes 150 WhatsApp messages and 100 AI advisor messages per monthly billing cycle. The Basic and Growth plans do not include WhatsApp or AI features.',
    },
    {
      q: 'Can I purchase additional usage?',
      a: 'Yes. Additional WhatsApp and AI advisory usage capacity can be requested and provisioned through an authorized Onespheree super-admin process after payment verification. Exhausting your monthly quota will not disable your core catalogue, inventory synchronization, or order management features.',
    },
    {
      q: 'How do I authorize my marketplace account?',
      a: 'You authorize connections directly through official marketplace authorization flows (such as Amazon SP-API OAuth or Meta Business Login). You grant permissions directly to your own eligible seller accounts; SmartKarobar does not ask for or store raw marketplace passwords.',
    },
    {
      q: 'What happens when an integration is unavailable?',
      a: 'If a third-party marketplace API experiences downtime, rate throttling, or delayed events, SmartKarobar queues pending updates with bounded retries and logs the failure status transparently in your dashboard. Periodic reconciliation runs automatically to verify and correct discrepancies once connectivity is restored.',
    },
    {
      q: 'How can I contact Onespheree?',
      a: 'You can contact the Onespheree team by visiting our Contact page at https://onespheree.com/contact, emailing Info@Onespheree.com, or submitting an enquiry for SmartKarobar. Our team responds to all business inquiries within one business day.',
    },
  ] as FaqItem[],
};
