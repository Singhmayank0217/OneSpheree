const assert = require('assert');

// Simple TypeScript/JS import runner or standalone test
const {
  validateChannelConnection,
  SMARTKAROBAR_PLAN_ENTITLEMENTS,
  SUPPORTED_SALES_CHANNELS,
  isSalesChannel,
  isServiceIntegration,
} = require('../dist-test/smartkarobar-entitlements.js');

console.log('Running SmartKarobar Entitlements & Channel Scope Tests...\n');

// 1. Supported channel scope
assert.strictEqual(SUPPORTED_SALES_CHANNELS.length, 4, 'Must support exactly 4 sales channels');
assert.deepStrictEqual(
  [...SUPPORTED_SALES_CHANNELS],
  ['amazon', 'flipkart', 'meesho', 'own_website'],
  'Channels must be Amazon, Flipkart, Meesho, and own_website'
);

// 2. Service integrations are NOT sales channels
assert.strictEqual(isSalesChannel('meta_ads'), false, 'meta_ads must not be a sales channel');
assert.strictEqual(isSalesChannel('whatsapp'), false, 'whatsapp must not be a sales channel');
assert.strictEqual(isServiceIntegration('meta_ads'), true, 'meta_ads is a service integration');
assert.strictEqual(isServiceIntegration('whatsapp'), true, 'whatsapp is a service integration');

// 3. Plan limits check
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.basic.maxSalesChannels, 2, 'Basic limit must be 2');
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.basic.priceInr, 1499, 'Basic price must be 1499');
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.growth.maxSalesChannels, 3, 'Growth limit must be 3');
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.growth.priceInr, 2999, 'Growth price must be 2999');
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.premium.maxSalesChannels, 4, 'Premium limit must be 4');
assert.strictEqual(SMARTKAROBAR_PLAN_ENTITLEMENTS.premium.priceInr, 3999, 'Premium price must be 3999');

// 4. Basic Plan Connection Validation
// Basic allows 2 channels
let res = validateChannelConnection('basic', [], 'amazon');
assert.strictEqual(res.allowed, true, 'Basic allows 1st channel');

res = validateChannelConnection('basic', ['amazon'], 'flipkart');
assert.strictEqual(res.allowed, true, 'Basic allows 2nd channel');

// Basic rejects 3rd channel
res = validateChannelConnection('basic', ['amazon', 'flipkart'], 'meesho');
assert.strictEqual(res.allowed, false, 'Basic rejects 3rd channel');
assert.match(res.error, /Basic plan allows a maximum of 2 connected sales channels/i);

// 5. Growth Plan Connection Validation
// Growth allows 3 channels
res = validateChannelConnection('growth', ['amazon', 'flipkart'], 'meesho');
assert.strictEqual(res.allowed, true, 'Growth allows 3rd channel');

// Growth rejects 4th channel
res = validateChannelConnection('growth', ['amazon', 'flipkart', 'meesho'], 'own_website');
assert.strictEqual(res.allowed, false, 'Growth rejects 4th channel');
assert.match(res.error, /Growth plan allows a maximum of 3 connected sales channels/i);

// 6. Premium Plan Connection Validation
// Premium allows up to 4 channels
res = validateChannelConnection('premium', ['amazon', 'flipkart', 'meesho'], 'own_website');
assert.strictEqual(res.allowed, true, 'Premium allows 4th channel');

// 7. Fifth sales channel attempt MUST be rejected with clear message
res = validateChannelConnection('premium', ['amazon', 'flipkart', 'meesho', 'own_website'], 'ebay');
assert.strictEqual(res.allowed, false, 'Must reject 5th channel attempt');
assert.match(res.error, /not a recognized sales channel/i);

res = validateChannelConnection('premium', ['amazon', 'flipkart', 'meesho', 'own_website'], 'amazon');
assert.strictEqual(res.allowed, true, 'Re-connecting already connected channel is idempotent');

// 8. Service Integrations do NOT consume sales channel allowance
res = validateChannelConnection('growth', ['amazon', 'flipkart', 'meesho'], 'meta_ads');
assert.strictEqual(res.allowed, true, 'Growth includes meta_ads without taking channel slot');
assert.strictEqual(res.isServiceIntegration, true);

res = validateChannelConnection('premium', ['amazon', 'flipkart', 'meesho', 'own_website'], 'whatsapp');
assert.strictEqual(res.allowed, true, 'Premium includes whatsapp without taking channel slot');
assert.strictEqual(res.isServiceIntegration, true);

res = validateChannelConnection('basic', [], 'meta_ads');
assert.strictEqual(res.allowed, false, 'Basic rejects meta_ads');

res = validateChannelConnection('growth', [], 'whatsapp');
assert.strictEqual(res.allowed, false, 'Growth rejects whatsapp');

console.log('All 8 Entitlement & Channel Scope Test Suites Passed Successfully!');
