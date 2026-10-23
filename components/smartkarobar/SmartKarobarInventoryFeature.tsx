import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData, SyncStep } from '@/data/smartkarobar';

export function SmartKarobarInventoryFeature() {
  const { inventorySync } = smartkarobarData;

  return (
    <section id="inventory-sync" className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Multi-Channel Stock Integrity
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {inventorySync.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {inventorySync.subheading}
          </p>
        </div>

        {/* Concrete Illustrative Example Callout */}
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-blue-200 bg-blue-50/60 p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
              <Icon name="package" size={16} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-blue-950">
                Illustrative Stock Adjustment Example:
              </h3>
              <p className="mt-1 text-xs text-blue-900/90 leading-relaxed">
                {inventorySync.example}
              </p>
              <p className="mt-2 text-[11px] font-medium text-blue-700 italic">
                * Note: This is an illustrative operational example, not a guarantee of instantaneous synchronization. Actual speed depends on marketplace API rate limits, event queues, and partner processing windows.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Intended Synchronization Architecture */}
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
            Intended Event-Driven Synchronization Architecture
          </h3>
          <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {inventorySync.steps.map((item: SyncStep) => (
              <div
                key={item.step}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                      {item.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-700 font-medium">
                    {item.description}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500 leading-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Safeguards & Guardrails */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Icon name="shield" size={18} />
            </span>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Technical Safeguards &amp; Operational Guardrails
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {inventorySync.technicalSafeguards.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-700"
              >
                <Icon name="checkCircle" size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Operational Realism Disclaimer */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed">
            <p>
              <strong>Operational Realism:</strong> {inventorySync.disclaimer}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
