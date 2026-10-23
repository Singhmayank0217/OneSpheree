import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ds/Button';

export function SmartKarobarCta() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 opacity-30"
      >
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Run Smarter. Grow Faster.
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Ready to Unify Your Multi-Channel E-commerce Operations?
          </h2>
          <p className="mt-4 text-sm text-slate-300 sm:text-base leading-relaxed">
            Consolidate your product listings, inventory synchronization, and order workflows across Amazon, Flipkart, Meesho, and your web storefront into a single automated dashboard.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              href="/contact?subject=SmartKarobar+Workspace+Inquiry"
              size="lg"
              iconRight="arrowRight"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
            >
              Get Started with SmartKarobar
            </Button>
            <Button
              href="/contact"
              variant="outlineDark"
              size="lg"
              className="w-full sm:w-auto border-white/30 hover:bg-white/10 text-white"
            >
              Contact Onespheree
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-slate-400">
            SmartKarobar is proudly built, owned, and operated by Onespheree. All rights reserved.
          </p>
        </div>
      </Container>
    </section>
  );
}
