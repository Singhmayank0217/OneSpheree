import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarSecurityCompliance() {
  const { transparency } = smartkarobarData;

  return (
    <section id="transparency" className="py-16 md:py-24 bg-white text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Data Governance &amp; Platform Transparency
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {transparency.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {transparency.subheading}
          </p>
        </div>

        {/* 6 Key Governance Points */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transparency.points.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  <Icon name="shield" size={15} />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Support Navigation Links */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 sm:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold sm:text-lg">
                Seller Support Resources
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xl leading-relaxed">
                Questions about onboarding, integrations or platform usage? Contact our seller support team directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact?subject=SmartKarobar+Developer+Inquiry"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <span>Seller &amp; Developer Support</span>
                <Icon name="arrowRight" size={13} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
