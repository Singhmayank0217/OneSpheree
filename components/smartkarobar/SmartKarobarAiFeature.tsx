import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarAiFeature() {
  const { aiAdvisor } = smartkarobarData;

  return (
    <section id="ai-advisor" className="py-16 md:py-24 bg-white text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Intelligent Analytics &amp; Decision Support
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {aiAdvisor.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {aiAdvisor.subheading}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aiAdvisor.capabilities.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Icon
                  name={
                    idx === 0
                      ? 'barChart'
                      : idx === 1
                      ? 'alertTriangle'
                      : idx === 2
                      ? 'trendingUp'
                      : 'sparkles'
                  }
                  size={18}
                />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Data Isolation & Privacy Framework */}
        <div className="mt-12 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Icon name="lock" size={16} />
            </span>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Data Isolation &amp; Responsible AI Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-6 max-w-2xl leading-relaxed">
            SmartKarobar employs retrieval-augmented generation (RAG) strictly bounded to the requesting tenant&apos;s verified database records. We never expose your business data to external training corpuses:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiAdvisor.dataIsolation.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-indigo-100 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                  <Icon name="checkCircle" size={14} className="text-indigo-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-600 leading-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-indigo-100 pt-3.5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Plan Allocation:</strong> 100 included AI advisor messages per billing month in the <strong>Premium</strong> tier.
            </span>
            <span className="text-indigo-700 font-medium">
              Zero model fine-tuning on customer records.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
