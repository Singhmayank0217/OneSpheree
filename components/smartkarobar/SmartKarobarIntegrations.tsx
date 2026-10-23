import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData, IntegrationChannel } from '@/data/smartkarobar';

export function SmartKarobarIntegrations() {
  const { integrations } = smartkarobarData;

  return (
    <section id="integrations" className="py-16 md:py-24 border-y border-slate-100 bg-slate-50/70 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Defined Integration Scope
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            Supported Sales Channels &amp; Operations Services
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            SmartKarobar is engineered to connect with a strictly defined set of retail channels and business services. All integrations operate through official developer interfaces and customer-authorized credentials.
          </p>
        </div>

        {/* Integration Cards Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item: IntegrationChannel) => {
            const isDev = item.status === 'In Development';
            const badgeClasses = isDev
              ? 'bg-blue-100 text-blue-800 border-blue-200'
              : 'bg-amber-100 text-amber-800 border-amber-200';

            return (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badgeClasses}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
                  <Icon name="shield" size={13} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Integration Transparency Notice */}
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-200 bg-white p-4 sm:p-5 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Icon name="alertTriangle" size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Official Marketplace &amp; Developer Integration Notice:
              </p>
              <p className="mt-1 text-slate-600">
                SmartKarobar is developed independently by Onespheree. The supported sales channels are strictly limited to four types: Amazon, Flipkart, Meesho, and the seller&apos;s own e-commerce website. Meta Ads (advertising) and WhatsApp Business (messaging) are separate operational service integrations and are never counted toward subscription sales-channel limits. Third-party channel names appear strictly to specify architectural compatibility and planned API scopes. Inclusion does not imply official partnership, direct affiliation, or pre-approval from third-party platforms. Each marketplace integration requires official seller authorization, developer credential registration, and compliance with the respective platform’s terms of service before live activation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
