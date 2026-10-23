import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarMetaAdsFeature() {
  const { metaAdsController } = smartkarobarData;

  return (
    <section id="meta-ads" className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Integrated Campaign Management
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {metaAdsController.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {metaAdsController.subheading}
          </p>
        </div>

        {/* 5-Step Workflow Rail */}
        <div className="mt-12">
          <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {metaAdsController.workflow.map((item, idx) => (
              <div
                key={item.step}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
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

        {/* Authorized Account Rules & Guardrails */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg mb-3">
            Authorized Meta Advertising Governance &amp; Account Rules
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            {metaAdsController.rules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-700"
              >
                <Icon name="checkCircle" size={15} className="text-blue-600 mt-0.5 shrink-0" />
                <span className="leading-snug">{rule}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Tier Availability:</strong> Included in <strong>Growth</strong> (₹2,999/mo) and <strong>Premium</strong> (₹3,999/mo) plans.
            </span>
            <span className="text-blue-700 font-medium">
              Zero automated spend without explicit seller approval.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
