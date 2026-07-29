import type { ServicePageContent } from '@/types/service-page';

/**
 * Reselling & E-Commerce — Milestones 1–3. M1: Hero, Overview, Marketplace,
 * Sourcing, Listing. M2: Brand, Order, Digital Commerce. M3: Product
 * Categories, Why Choose, Commerce Process, Business Outcomes, Final CTA
 * (rendered through the shared IndustriesSection / WhySection / ProcessSection
 * / OutcomesSection / ServiceCtaSection, retuned to amber/gold via .ec-theme).
 */
export const ecommercePage: ServicePageContent = {
  slug: 'e-commerce',

  hero: {
    eyebrow: 'Reselling & E-Commerce',
    headline: 'Building Brands That Sell',
    description: [
      'We help manufacturers, startups, and businesses expand into online marketplaces through strategic sourcing, branding, marketplace management, and digital commerce solutions.',
    ],
    primaryCta: { label: 'Start Your E-Commerce Journey', href: '/contact' },
    secondaryCta: { label: 'Talk To Commerce Experts', href: '/contact' },
  },

  overview: {
    eyebrow: 'The division',
    statement:
      'One commerce team runs the whole engine — from the factory floor to the marketplace listing to the customer’s door.',
    highlights: ['from the factory floor to the marketplace listing', 'the customer’s door'],
    support:
      'OneSpheree’s E-Commerce division manages everything a brand needs to sell online — sourcing product from trusted manufacturers, building the brand and its listings, operating every marketplace, and moving stock through logistics — so growth is engineered, not improvised.',
    pillars: [
      { icon: 'package', label: 'Sourcing', blurb: 'Reliable product from vetted manufacturers and suppliers.' },
      { icon: 'sparkles', label: 'Branding', blurb: 'Brand, imagery and listings built to convert browsers.' },
      { icon: 'store', label: 'Marketplace', blurb: 'Every leading marketplace operated as one storefront.' },
      { icon: 'truck', label: 'Logistics', blurb: 'Fulfilment and stock movement kept flowing, end to end.' },
    ],
  },

  sections: [
    {
      id: 'marketplace-management',
      index: '01',
      eyebrow: 'Channel expansion',
      headline: 'Marketplace Management',
      description: "Expand your business across India's leading online marketplaces.",
      itemsLabel: 'Platforms we operate',
      items: [
        { icon: 'store', label: 'Amazon' },
        { icon: 'shoppingBag', label: 'Flipkart' },
        { icon: 'users', label: 'Meesho' },
        { icon: 'tag', label: 'Myntra' },
        { icon: 'layoutGrid', label: 'Ajio' },
        { icon: 'window', label: 'Shopify Store' },
      ],
    },
    {
      id: 'product-sourcing',
      index: '02',
      eyebrow: 'Supply chain',
      headline: 'Product Sourcing',
      description: 'Reliable sourcing from trusted manufacturers and suppliers.',
      itemsLabel: 'How we source',
      items: [
        { icon: 'globe', label: 'China Imports' },
        { icon: 'factory', label: 'India Manufacturers' },
        { icon: 'briefcase', label: 'Vendor Development' },
        { icon: 'searchCheck', label: 'Quality Inspection' },
      ],
    },
    {
      id: 'product-listing',
      index: '03',
      eyebrow: 'Conversion craft',
      headline: 'Product Listing',
      description: 'Optimize products for visibility and conversions.',
      itemsLabel: 'What we optimize',
      items: [
        { icon: 'search', label: 'SEO Product Titles' },
        { icon: 'image', label: 'Professional Images' },
        { icon: 'sparkles', label: 'A+ Content' },
        { icon: 'fileText', label: 'Product Description' },
      ],
    },
    {
      id: 'brand-management',
      index: '04',
      eyebrow: 'Brand identity',
      headline: 'Brand Management',
      description: 'Build memorable brands that stand out across marketplaces.',
      itemsLabel: 'What we build',
      items: [
        { icon: 'tag', label: 'Private Label' },
        { icon: 'package', label: 'Packaging Design' },
        { icon: 'clipboardCheck', label: 'Brand Registration' },
        { icon: 'award', label: 'Trademark Assistance' },
      ],
    },
    {
      id: 'order-management',
      index: '05',
      eyebrow: 'Fulfillment',
      headline: 'Order Management',
      description: 'Efficient fulfillment systems that scale with your business.',
      itemsLabel: 'What we run',
      items: [
        { icon: 'layers', label: 'Inventory' },
        { icon: 'building', label: 'Warehousing' },
        { icon: 'truck', label: 'Shipping' },
        { icon: 'messageCircle', label: 'Customer Support' },
      ],
    },
    {
      id: 'digital-commerce',
      index: '06',
      eyebrow: 'Commerce technology',
      headline: 'Digital Commerce',
      description: 'Power modern online businesses with scalable technology.',
      itemsLabel: 'Technology stack',
      items: [
        { icon: 'window', label: 'Shopify Development' },
        { icon: 'wallet', label: 'Payment Gateway' },
        { icon: 'gitBranch', label: 'Automation' },
        { icon: 'database', label: 'CRM' },
      ],
    },
  ],

  /* 9 · Product Categories — reuses the interactive mosaic (IndustriesSection). */
  industries: {
    headline: 'Product Categories',
    intro:
      'We source, brand, and sell across the categories that move fastest online — spanning home, lifestyle, and everyday essentials for modern marketplaces.',
    items: [
      { icon: 'home', label: 'Furniture', wide: true },
      { icon: 'image', label: 'Home Decor' },
      { icon: 'cpu', label: 'Electronics', wide: true },
      { icon: 'flask', label: 'Kitchenware' },
      { icon: 'sparkles', label: 'Beauty' },
      { icon: 'shoppingBag', label: 'Fashion', wide: true },
      { icon: 'star', label: 'Kids Products' },
      { icon: 'pen', label: 'Office Supplies' },
    ],
  },

  /* 10 · Why Choose OneSpheree — reuses the feature bento (WhySection). */
  why: {
    headline: 'Why Choose OneSpheree',
    features: [
      {
        icon: 'store',
        title: 'End-to-End Marketplace Management',
        blurb: 'One accountable team runs every channel — from listing to fulfilment to growth.',
        featured: true,
      },
      {
        icon: 'globe',
        title: 'Reliable Global Sourcing',
        blurb: 'Product secured from vetted manufacturers across India and overseas.',
        featured: true,
      },
      {
        icon: 'users',
        title: 'Strong Supplier Network',
        blurb: 'Established relationships that unlock better pricing, quality, and lead times.',
      },
      {
        icon: 'sparkles',
        title: 'Professional Brand Development',
        blurb: 'Private-label brands, packaging, and content built to convert browsers.',
      },
      {
        icon: 'trendingUp',
        title: 'Marketplace Optimization',
        blurb: 'Listings tuned continuously for ranking, visibility, and conversion.',
      },
      {
        icon: 'truck',
        title: 'Scalable Logistics',
        blurb: 'Fulfilment and stock movement that flex with demand, never against it.',
      },
      {
        icon: 'cpu',
        title: 'Technology-Driven Operations',
        blurb: 'Automation, analytics, and CRM keeping the commerce engine efficient.',
      },
      {
        icon: 'briefcase',
        title: 'Dedicated Commerce Team',
        blurb: 'Specialists who own your account and treat its growth as their own.',
      },
    ],
  },

  /* 11 · Our Commerce Process — reuses the animated snake timeline (ProcessSection). */
  process: {
    headline: 'Our Commerce Process',
    steps: [
      { title: 'Business Consultation' },
      { title: 'Product Research' },
      { title: 'Supplier Identification' },
      { title: 'Branding & Packaging' },
      { title: 'Marketplace Setup' },
      { title: 'Product Listing' },
      { title: 'Launch' },
      { title: 'Scale & Optimize' },
    ],
  },

  /* 12 · Business Outcomes — reuses the editorial metric ledger (OutcomesSection). */
  outcomes: {
    headline: 'Business Outcomes',
    cards: [
      { label: 'Faster Market Entry', blurb: 'Launch-ready in a fraction of the usual go-to-market timeline.', stat: { value: 3, suffix: 'x' } },
      { label: 'Increased Online Sales', blurb: 'Optimized listings and channels compounding revenue month over month.', stat: { prefix: '+', value: 180, suffix: '%' } },
      { label: 'Stronger Brand Presence', blurb: 'Recognition built across every marketplace you sell on.', stat: { prefix: '+', value: 4, suffix: 'x' } },
      { label: 'Efficient Supply Chain', blurb: 'Sourcing and logistics engineered to cut cost and lead time.', stat: { prefix: '−', value: 32, suffix: '%' } },
      { label: 'Higher Marketplace Visibility', blurb: 'Ranking and reach lifted through continuous optimization.', stat: { prefix: '+', value: 240, suffix: '%' } },
      { label: 'Sustainable Business Growth', blurb: 'Foundations that keep scaling long after launch.', stat: { value: 99, suffix: '%' } },
    ],
  },

  /* 13 · Final CTA — reuses the growth-horizon closer (ServiceCtaSection). */
  cta: {
    headline: 'Launch, Scale & Grow Your Online Business',
    description: [
      'From sourcing and branding to marketplace management and fulfillment, OneSpheree provides complete e-commerce solutions that help businesses succeed in today’s digital marketplace.',
    ],
    primaryCta: { label: 'Start Your E-Commerce Journey', href: '/contact' },
    secondaryCta: { label: 'Talk To Commerce Experts', href: '/contact' },
  },
};
