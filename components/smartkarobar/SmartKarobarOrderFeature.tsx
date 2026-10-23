import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarOrderFeature() {
  const { orderManagement } = smartkarobarData;

  return (
    <section id="orders-workflow" className="py-16 md:py-24 bg-white text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Fulfillment &amp; Order Operations
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {orderManagement.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {orderManagement.subheading}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderManagement.highlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon
                  name={
                    idx === 0
                      ? 'shoppingCart'
                      : idx === 1
                      ? 'clock'
                      : idx === 2
                      ? 'fileCheck'
                      : idx === 3
                      ? 'package'
                      : idx === 4
                      ? 'inbox'
                      : 'zap'
                  }
                  size={18}
                />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Permissions & Data Scope Clarification */}
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Icon name="shield" size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Marketplace Data Access &amp; PII Governance:
              </p>
              <p className="mt-1 text-slate-600">
                Order details and customer shipping data are accessed strictly within the permissions granted by each marketplace’s official API (such as Amazon SP-API buyer information policies). SmartKarobar handles order documents and addresses in compliance with platform data protection standards, retaining information only as required for order fulfillment and return processing.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
