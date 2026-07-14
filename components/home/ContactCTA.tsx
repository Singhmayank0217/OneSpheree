import { Button } from '@/components/ds/Button';
import { Container } from '@/components/layout/Container';
import { Magnetic } from '@/components/animations/Magnetic';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';

/**
 * Closing chapter — a memorable full-dark send-off with the brand glow.
 * Big type, one magnetic CTA, minimal UI; flows straight into the footer's
 * dark surface so the story ends on one continuous field.
 */
export function ContactCTA() {
  return (
    <section aria-label="Start the conversation" className="relative bg-dark text-ondark">
      {/* dusk wash into the closing act */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] -translate-y-full"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-dark))' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 100%, color-mix(in srgb, var(--violet-500) 26%, transparent), transparent 72%), radial-gradient(40% 45% at 72% 80%, color-mix(in srgb, var(--blue-500) 18%, transparent), transparent 70%)',
        }}
      />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-section text-center">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">Ready when you are</p>
        </Reveal>
        <RevealText
          text="Let's build something exceptional."
          as="h2"
          className="t-hero ondark-heading mt-3 max-w-[820px]"
        />
        <Reveal delay={0.2}>
          <p className="t-body-lg mt-3 max-w-[480px] text-ondark-muted">
            Tell us which business line you need — we&apos;ll route you to the right specialists within
            one business day.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Magnetic>
            <Button href="/contact" size="lg" iconRight="arrowRight">
              Start the Conversation
            </Button>
          </Magnetic>
          <Button href="/services" size="lg" variant="outlineDark">
            Explore Services
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
