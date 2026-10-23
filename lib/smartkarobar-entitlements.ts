/**
 * SmartKarobar Subscription Plan & Channel Entitlement Definitions
 *
 * Fixed Channel Scope:
 * SmartKarobar strictly supports exactly four sales-channel types:
 * 1. Amazon (Amazon India via SP-API)
 * 2. Flipkart
 * 3. Meesho
 * 4. Own e-commerce website (storefront)
 *
 * Meta Ads and WhatsApp Business are separate operational service integrations
 * and MUST NEVER be counted as sales channels.
 */

export const SUPPORTED_SALES_CHANNELS = ['amazon', 'flipkart', 'meesho', 'own_website'] as const;
export type SalesChannelType = (typeof SUPPORTED_SALES_CHANNELS)[number];

export const SERVICE_INTEGRATIONS = ['meta_ads', 'whatsapp'] as const;
export type ServiceIntegrationType = (typeof SERVICE_INTEGRATIONS)[number];

export type PlanId = 'basic' | 'growth' | 'premium';

export interface PlanEntitlement {
  id: PlanId;
  name: string;
  priceInr: number;
  period: string;
  maxSalesChannels: number;
  maxSkus: number;
  includesMetaAds: boolean;
  includesWhatsApp: boolean;
  includedWhatsAppMessages: number;
  includesAiAdvisor: boolean;
  includedAiMessages: number;
}

export const SMARTKAROBAR_PLAN_ENTITLEMENTS: Record<PlanId, PlanEntitlement> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    priceInr: 1499,
    period: 'monthly',
    maxSalesChannels: 2,
    maxSkus: 200,
    includesMetaAds: false,
    includesWhatsApp: false,
    includedWhatsAppMessages: 0,
    includesAiAdvisor: false,
    includedAiMessages: 0,
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    priceInr: 2999,
    period: 'monthly',
    maxSalesChannels: 3,
    maxSkus: 2500,
    includesMetaAds: true,
    includesWhatsApp: false,
    includedWhatsAppMessages: 0,
    includesAiAdvisor: false,
    includedAiMessages: 0,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    priceInr: 3999,
    period: 'monthly',
    maxSalesChannels: 4,
    maxSkus: 10000,
    includesMetaAds: true,
    includesWhatsApp: true,
    includedWhatsAppMessages: 150,
    includesAiAdvisor: true,
    includedAiMessages: 100,
  },
};

/**
 * Checks whether a given identifier represents a sales channel.
 * Returns false for Meta Ads, WhatsApp, or arbitrary integrations.
 */
export function isSalesChannel(channelId: string): channelId is SalesChannelType {
  return (SUPPORTED_SALES_CHANNELS as readonly string[]).includes(channelId.toLowerCase());
}

/**
 * Checks whether a given identifier represents a service integration.
 */
export function isServiceIntegration(serviceId: string): serviceId is ServiceIntegrationType {
  return (SERVICE_INTEGRATIONS as readonly string[]).includes(serviceId.toLowerCase());
}

export interface ChannelValidationResult {
  allowed: boolean;
  error?: string;
  isServiceIntegration?: boolean;
}

/**
 * Enforces subscription plan channel limits on incoming connection requests.
 * Rejects connection if channel limit for plan is reached or if attempting
 * to connect an unsupported fifth sales channel.
 */
export function validateChannelConnection(
  planId: PlanId,
  connectedChannels: string[],
  channelToConnect: string
): ChannelValidationResult {
  const normChannel = channelToConnect.toLowerCase();
  const plan = SMARTKAROBAR_PLAN_ENTITLEMENTS[planId];

  if (!plan) {
    return { allowed: false, error: `Invalid subscription plan: ${planId}` };
  }

  // Handle service integrations (Meta Ads, WhatsApp)
  if (isServiceIntegration(normChannel)) {
    if (normChannel === 'meta_ads' && !plan.includesMetaAds) {
      return {
        allowed: false,
        error: `Meta Ads controller is not included in the ${plan.name} plan. Please upgrade to Growth or Premium.`,
        isServiceIntegration: true,
      };
    }
    if (normChannel === 'whatsapp' && !plan.includesWhatsApp) {
      return {
        allowed: false,
        error: `WhatsApp business controller is not included in the ${plan.name} plan. Please upgrade to Premium.`,
        isServiceIntegration: true,
      };
    }
    // Allowed and DOES NOT count toward sales-channel limit
    return { allowed: true, isServiceIntegration: true };
  }

  // Validate sales-channel type
  if (!isSalesChannel(normChannel)) {
    return {
      allowed: false,
      error: `"${channelToConnect}" is not a recognized sales channel. SmartKarobar strictly supports: Amazon, Flipkart, Meesho, and own website.`,
    };
  }

  // Filter only sales channels currently connected
  const existingSalesChannels = connectedChannels
    .map((c) => c.toLowerCase())
    .filter(isSalesChannel);

  // If already connected, no addition needed
  if (existingSalesChannels.includes(normChannel)) {
    return { allowed: true };
  }

  // Rejection of any fifth sales channel (the maximum across the entire platform is 4)
  if (existingSalesChannels.length >= 4) {
    return {
      allowed: false,
      error:
        'SmartKarobar supports a maximum of 4 sales-channel types: Amazon, Flipkart, Meesho, and your own website. Connecting a fifth sales channel is not supported.',
    };
  }

  // Enforce tier-specific limit
  if (existingSalesChannels.length >= plan.maxSalesChannels) {
    if (planId === 'basic') {
      return {
        allowed: false,
        error:
          'The Basic plan allows a maximum of 2 connected sales channels. Please upgrade to Growth (up to 3 channels) or Premium (up to 4 channels) to connect additional sales channels.',
      };
    }
    if (planId === 'growth') {
      return {
        allowed: false,
        error:
          'The Growth plan allows a maximum of 3 connected sales channels. Please upgrade to Premium (up to 4 channels) to connect all 4 supported sales channels.',
      };
    }
  }

  return { allowed: true };
}
