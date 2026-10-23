import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData, FaqItem } from '@/data/smartkarobar';

export function SmartKarobarFaq() {
  const { faq } = smartkarobarData;

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50/70 border-t border-slate-100 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            Everything You Need to Know About SmartKarobar
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            Detailed, verified answers regarding architecture, integration scopes, pricing, and operational governance.
          </p>
        </div>

        {/* 12 Accessible FAQ Disclosure Items */}
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faq.map((item: FaqItem, idx: number) => (
            <details
              key={idx}
              className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs open:border-blue-300 open:shadow-xs transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base select-none">
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">
                    {idx + 1}
                  </span>
                  <span>{item.q}</span>
                </span>
                <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-blue-100 group-open:text-blue-700">
                  <Icon name="chevronDown" size={14} />
                </span>
              </summary>
              <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-xs text-slate-600 sm:text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* Support Callout */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Have an architectural or SP-API developer registration question?{' '}
          <a
            href="/contact?subject=SmartKarobar+Developer+Question"
            className="font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            Speak directly with the Onespheree engineering team.
          </a>
        </div>
      </Container>
    </section>
  );
}
