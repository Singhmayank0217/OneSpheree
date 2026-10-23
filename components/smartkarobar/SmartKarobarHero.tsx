import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { smartkarobarData } from '@/data/smartkarobar';
import { SmartKarobarDashboardMockup } from './SmartKarobarDashboardMockup';

export function SmartKarobarHero() {
  const { meta } = smartkarobarData;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-white text-slate-900">
      {/* Subtle radial ambient gradients (navy & cyan) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-[20%] left-1/2 h-[750px] w-[950px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Brand & Parent Indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-900 shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>SmartKarobar by Onespheree</span>
            <span className="text-blue-300">•</span>
            <span className="text-blue-700 font-medium">{meta.tagline}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl leading-[1.12]">
            Run Your E-commerce Business Smarter,{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              from One Dashboard.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed">
            {meta.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href="#overview"
              size="lg"
              iconRight="arrowRight"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
            >
              Explore SmartKarobar
            </Button>
            <Button
              href="/contact?subject=SmartKarobar+Inquiry"
              variant="secondary"
              size="lg"
              className="border-slate-300 bg-white hover:bg-slate-50 text-slate-900"
            >
              Contact Onespheree
            </Button>
          </div>

          {/* Planned Channel Compatibility Pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-slate-400">Planned Channel Ecosystem:</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-semibold">
              Amazon India (SP-API)
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-semibold">
              Flipkart
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-semibold">
              Meesho
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-semibold">
              Web Storefront
            </span>
            <span className="text-slate-300">•</span>
            <span className="rounded-md bg-cyan-50 text-cyan-800 px-2 py-0.5 font-semibold">
              Meta Ads
            </span>
            <span className="rounded-md bg-emerald-50 text-emerald-800 px-2 py-0.5 font-semibold">
              WhatsApp
            </span>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="mt-12 sm:mt-16">
          <SmartKarobarDashboardMockup />
        </div>
      </Container>
    </section>
  );
}
