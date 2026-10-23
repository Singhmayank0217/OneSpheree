import { Container } from '@/components/layout/Container';
import { smartkarobarData } from '@/data/smartkarobar';

export function SmartKarobarHowItWorks() {
  const { howItWorks } = smartkarobarData;

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white text-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Onboarding &amp; Setup
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            How SmartKarobar Works in Four Steps
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            Get your multi-channel sales operations organized with a simple, secure onboarding process.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-xs">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-slate-100 p-4 text-center text-xs text-slate-600 max-w-2xl mx-auto border border-slate-200/80">
          <p>
            <strong>Feature Availability:</strong> Active access to channel connectors, Meta Ads tools, and the WhatsApp controller depends on your chosen subscription plan and the authorized status of each external channel integration.
          </p>
        </div>
      </Container>
    </section>
  );
}
