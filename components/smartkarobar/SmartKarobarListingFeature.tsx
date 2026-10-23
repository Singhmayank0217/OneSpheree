import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarListingFeature() {
  const { listingWorkflow } = smartkarobarData;

  return (
    <section id="listing-workflow" className="py-16 md:py-24 bg-white text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Catalog Management &amp; Preparation
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {listingWorkflow.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {listingWorkflow.subheading}
          </p>
        </div>

        {/* 5-Step Visual Workflow Rail */}
        <div className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {listingWorkflow.steps.map((item, idx) => (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-2xs transition-all hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {item.step}
                    </span>
                    {idx < 4 && (
                      <span className="hidden lg:inline text-slate-300 font-bold text-xs">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Attribute Compliance Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Card 1: Channel-Specific Schema Adaptations */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon name="sliders" size={16} />
              </span>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Channel-Specific Schema &amp; Taxonomies
              </h3>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Marketplaces do not share a single universal catalog schema. SmartKarobar bridges these variations through specialized attribute mapping:
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <Icon name="check" size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Amazon India:</strong> Specific browse node IDs, ASIN/UPC exemption checks, bullet point formatting rules, and strict image dimension guidelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Flipkart:</strong> FSN identifiers, vertical attribute trees, mandatory brand verification, and Indian legal metrology compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Meesho:</strong> Simplified catalog grids, reseller margin settings, and package weight tiers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Web Storefront:</strong> Custom collections, SEO meta titles/descriptions, and direct storefront tags.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Catalog Data vs External Publication Status */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                <Icon name="fileCheck" size={16} />
              </span>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Master Data vs. Published Status Distinction
              </h3>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              SmartKarobar keeps a clear distinction between your master product catalog and live third-party listing states:
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5">
                <span className="font-semibold text-slate-800">1. Master Draft</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">Stored Locally</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5">
                <span className="font-semibold text-slate-800">2. Schema Pre-Validation</span>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700 font-semibold">Rules Checked</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5">
                <span className="font-semibold text-slate-800">3. Feed Submission</span>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700 font-semibold">Pending Marketplace Review</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5">
                <span className="font-semibold text-slate-800">4. Live Channel Listing</span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700 font-semibold">Active with ASIN/FSN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Safeguards and Compliance Statement */}
        <div className="mt-8 rounded-lg bg-slate-100/70 p-4 text-xs text-slate-600 border border-slate-200/80">
          <p className="leading-relaxed">
            <strong>Policy &amp; API Integrity:</strong> SmartKarobar will never use unauthorized scrapers or attempt to circumvent marketplace verification rules. Publishing is performed solely through official APIs subject to seller authorizations and third-party category approvals.
          </p>
        </div>
      </Container>
    </section>
  );
}
