import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ds/Icon';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarWhatsAppFeature() {
  const { whatsappController } = smartkarobarData;

  return (
    <section id="whatsapp-controller" className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100 text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Conversational Mobile Operations
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {whatsappController.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            {whatsappController.subheading}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Simulated Interactive WhatsApp Interface (5 cols) */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm rounded-3xl border-4 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
              {/* WhatsApp Header */}
              <div className="bg-emerald-700 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                    SK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">SmartKarobar Controller</h4>
                    <p className="text-[10px] text-emerald-100/80">Operated by Onespheree • Verified</p>
                  </div>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-300" />
              </div>

              {/* Chat Thread */}
              <div className="bg-[#EFEAE2] p-4 space-y-3 min-h-[380px] max-h-[440px] overflow-y-auto text-xs">
                {whatsappController.samplePrompts.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    {/* User Query Message */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#E7FFDB] p-2.5 text-slate-800 shadow-2xs">
                        <p className="text-[11px] font-medium leading-snug">{item.prompt}</p>
                        <span className="block text-right text-[9px] text-slate-400 mt-0.5">14:1{index}</span>
                      </div>
                    </div>

                    {/* Bot Response Message */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white p-2.5 text-slate-800 shadow-2xs">
                        <p className="text-[11px] leading-relaxed text-slate-700">{item.response}</p>
                        <span className="block text-right text-[9px] text-slate-400 mt-0.5">14:1{index}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="bg-slate-100 p-2.5 flex items-center gap-2 border-t border-slate-200">
                <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-[11px] text-slate-400 border border-slate-200">
                  Type a command...
                </div>
                <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Icon name="arrowRight" size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Pillars & Security (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg mb-1">
                WhatsApp Business Controller Architecture
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Designed to deliver secure on-the-go utility for authorized business owners without compromising data segregation or platform compliance:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {whatsappController.architecture.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-600 leading-normal">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Policy & Tier Inclusion Notice */}
              <div className="mt-5 border-t border-slate-100 pt-3.5 text-xs text-slate-500 leading-relaxed space-y-1">
                <p>
                  <strong>Plan Inclusion:</strong> The WhatsApp Business Controller is available exclusively in the <strong>Premium</strong> subscription tier, with 150 included messages per monthly billing cycle.
                </p>
                <p>
                  <strong>Platform Compliance:</strong> WhatsApp access strictly follows Meta’s WhatsApp Business Platform messaging policies. Arbitrary personal accounts or unauthorized messaging tools are not supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
