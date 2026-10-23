import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ds/Button';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData, PricingPlan } from '@/data/smartkarobar';

export function SmartKarobarPricing() {
  const { pricing, usageAllowances } = smartkarobarData;

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Transparent Subscription Plans
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {pricing.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {pricing.subheading}
          </p>
        </div>

        {/* Channel Scope & Entitlements Rule Callout */}
        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <Icon name="shield" size={16} className="text-blue-700 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-blue-950">
                Fixed Sales-Channel Scope &amp; Plan Allocation:
              </p>
              <p className="mt-1 leading-relaxed text-blue-900/90">
                SmartKarobar strictly supports four sales-channel types: <strong>Amazon</strong>, <strong>Flipkart</strong>, <strong>Meesho</strong>, and the seller&apos;s <strong>own e-commerce website</strong>. Plan sales-channel limits are strictly capped: <strong>Basic (up to 2 channels)</strong>, <strong>Growth (up to 3 channels)</strong>, and <strong>Premium (up to 4 channels — the complete scope)</strong>.
              </p>
              <p className="mt-1 text-[11px] text-blue-800 font-medium">
                * Note: Meta Ads (advertising controller) and WhatsApp Business (messaging controller) are operational service integrations. They do not count toward your plan&apos;s sales-channel limits. Attempts to connect a fifth sales channel are not supported and are rejected.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {pricing.plans.map((plan: PricingPlan, pIdx: number) => {
            const isGrowth = plan.highlighted;
            const isLastOnTablet = pIdx === 2;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-8 transition-all border border-slate-200 bg-white ${
                  isGrowth
                    ? 'ring-2 ring-blue-600 shadow-xl lg:-translate-y-2'
                    : 'shadow-xs'
                } ${isLastOnTablet ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none w-full' : ''}`}
              >
                {isGrowth && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <span className="text-xs font-medium text-slate-500">Monthly Plan</span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 leading-normal min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 font-medium">
                    + 18% GST as applicable under Indian tax laws
                  </p>

                  <div className="mt-5 rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-start justify-between gap-2 text-slate-700 font-medium">
                      <span className="shrink-0 text-slate-600">Catalogue Allowance:</span>
                      <strong className="text-slate-900 text-right">{plan.skuLimit}</strong>
                    </div>
                    <div className="flex items-start justify-between gap-2 text-slate-700 font-medium">
                      <span className="shrink-0 text-slate-600">Channel Limit:</span>
                      <strong className="text-slate-900 text-right">{plan.channelLimit}</strong>
                    </div>
                  </div>

                  {/* Included Features List */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Included Features:
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Icon name="check" size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions if any */}
                  {plan.exclusions && plan.exclusions.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Excludes:
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                        {plan.exclusions.map((ex, exIdx) => (
                          <li key={exIdx} className="flex items-start gap-2">
                            <Icon name="x" size={13} className="text-slate-400 mt-0.5 shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    href={plan.ctaHref}
                    variant={isGrowth ? 'primary' : 'secondary'}
                    fullWidth
                    size="md"
                    className={isGrowth ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-slate-300 text-slate-800'}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Disclosure & GST treatment note */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto px-2">
          <p>{pricing.taxNote}</p>
        </div>

        {/* Plan Comparison Matrix Table */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 shrink-0">
              <Icon name="layers" size={16} />
            </span>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Plan Entitlement &amp; Feature Comparison
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4 sm:mb-6">
            Compare subscription channel limits, SKU caps, and included operational capabilities side by side.
          </p>

          {/* Mobile swipe hint */}
          <div className="sm:hidden mb-2.5 text-right text-[11px] text-blue-600 font-medium flex items-center justify-end gap-1">
            <Icon name="arrowRight" size={12} />
            <span>Scroll horizontally to compare all plans</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-xs border-collapse bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-700 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3.5 sm:px-4 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.04)]">
                    Feature / Capability
                  </th>
                  <th className="py-3 px-3.5 sm:px-4">Basic Plan</th>
                  <th className="py-3 px-3.5 sm:px-4 bg-blue-50/50 text-blue-900">Growth Plan</th>
                  <th className="py-3 px-3.5 sm:px-4">Premium Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricing.comparison.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3.5 sm:px-4 font-semibold text-slate-800 sticky left-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.04)]">
                      {row.feature}
                    </td>
                    <td className="py-3 px-3.5 sm:px-4 text-slate-600">{row.basic}</td>
                    <td className="py-3 px-3.5 sm:px-4 font-medium text-blue-950 bg-blue-50/20">{row.growth}</td>
                    <td className="py-3 px-3.5 sm:px-4 text-slate-900 font-medium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-slate-500 leading-normal">
            * Sales channel limit refers exclusively to the 4 supported channels (Amazon, Flipkart, Meesho, and own website). Meta Ads and WhatsApp are separate service integrations that do not consume sales-channel slots.
          </p>
        </div>

        {/* Section 12: Usage Allowances & Paid Add-ons Explanation Banner */}
        <div className="mt-12 rounded-2xl border border-blue-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Usage Governance &amp; Add-on Allowances
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Included Messaging &amp; AI Allocations
              </h3>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-800">
              Super-Admin Verified Top-Ups
            </span>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-800 leading-relaxed bg-blue-50/60 p-3.5 rounded-lg border border-blue-100">
            &ldquo;{usageAllowances.statement}&rdquo;
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-xs text-slate-600">
            {usageAllowances.details.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
            * Add-on allowances do not auto-debit unverified charges. Additional quotas require verified invoice payments and explicit administrative authorization by Onespheree. Reaching monthly AI or WhatsApp limits will never disable core listing or inventory sync workflows.
          </p>
        </div>
      </Container>
    </section>
  );
}
