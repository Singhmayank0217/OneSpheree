import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { smartkarobarData } from '@/data/smartkarobar';

import { SmartKarobarHero } from '@/components/smartkarobar/SmartKarobarHero';
import { SmartKarobarIntegrations } from '@/components/smartkarobar/SmartKarobarIntegrations';
import { SmartKarobarListingFeature } from '@/components/smartkarobar/SmartKarobarListingFeature';
import { SmartKarobarInventoryFeature } from '@/components/smartkarobar/SmartKarobarInventoryFeature';
import { SmartKarobarOrderFeature } from '@/components/smartkarobar/SmartKarobarOrderFeature';
import { SmartKarobarWhatsAppFeature } from '@/components/smartkarobar/SmartKarobarWhatsAppFeature';
import { SmartKarobarAiFeature } from '@/components/smartkarobar/SmartKarobarAiFeature';
import { SmartKarobarMetaAdsFeature } from '@/components/smartkarobar/SmartKarobarMetaAdsFeature';
import { SmartKarobarHowItWorks } from '@/components/smartkarobar/SmartKarobarHowItWorks';
import { SmartKarobarPricing } from '@/components/smartkarobar/SmartKarobarPricing';
import { SmartKarobarSecurityCompliance } from '@/components/smartkarobar/SmartKarobarSecurityCompliance';
import { SmartKarobarFaq } from '@/components/smartkarobar/SmartKarobarFaq';
import { SmartKarobarCta } from '@/components/smartkarobar/SmartKarobarCta';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'SmartKarobar — Run Your E-commerce Business Smarter',
    description: smartkarobarData.meta.description,
    path: '/smartkarobar',
  }),
  alternates: {
    canonical: smartkarobarData.meta.canonicalUrl,
  },
  openGraph: {
    title: 'SmartKarobar — Run Your E-commerce Business Smarter | Onespheree',
    description: smartkarobarData.meta.description,
    url: smartkarobarData.meta.canonicalUrl,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logos/onespheree-logo-full.png',
        width: 1200,
        height: 630,
        alt: 'SmartKarobar by Onespheree',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartKarobar — Run Your E-commerce Business Smarter | Onespheree',
    description: smartkarobarData.meta.description,
  },
};

export default function SmartKarobarPage() {
  const { meta, pricing, faq } = smartkarobarData;

  // SoftwareApplication Schema for Amazon SP-API & Search Engines
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartKarobar',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser, Cloud',
    description: meta.description,
    url: meta.canonicalUrl,
    author: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: `${site.url}/logos/onespheree-logo-full.png`,
    },
    offers: pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: `SmartKarobar ${plan.name} Plan`,
      price: plan.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      description: plan.tagline,
      url: meta.canonicalUrl,
    })),
  };

  // FAQPage Schema for Search Engine Rich Snippets
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="smartkarobar-theme min-h-screen bg-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Main Page Chapters */}
      <SmartKarobarHero />
      <div id="overview">
        <SmartKarobarIntegrations />
      </div>
      <div id="features">
        <SmartKarobarListingFeature />
        <SmartKarobarInventoryFeature />
        <SmartKarobarOrderFeature />
      </div>
      <SmartKarobarWhatsAppFeature />
      <SmartKarobarAiFeature />
      <SmartKarobarMetaAdsFeature />
      <SmartKarobarHowItWorks />
      <SmartKarobarPricing />
      <SmartKarobarSecurityCompliance />
      <SmartKarobarFaq />
      <SmartKarobarCta />
    </div>
  );
}
