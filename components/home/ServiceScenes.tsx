'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ds/Button';
import { Chip } from '@/components/ds/Chip';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/animations/Reveal';
import { RevealText } from '@/components/animations/RevealText';
import { services } from '@/data/services';
import { REVEAL_FROM, REVEAL_TO, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-scene composition maps. Every service gets a different placement,
 * a different pose of the shared morphing artifact, and its own gradient —
 * the artifact carries continuity so each scene emerges from the last.
 */
const PLACEMENT = [
  'lg:absolute lg:left-0 lg:bottom-[16%] lg:max-w-[520px]',
  'lg:absolute lg:right-0 lg:top-[12%] lg:max-w-[500px]',
  'lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-[640px] lg:text-center',
  'lg:absolute lg:left-0 lg:top-[14%] lg:max-w-[520px]',
  'lg:absolute lg:right-0 lg:bottom-[18%] lg:max-w-[560px]',
  'lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[540px]',
];

const ARTIFACT = [
  { x: '24vw', y: '-6vh', rotation: -6, scaleX: 1, scaleY: 1, borderRadius: '28px' },
  { x: '-25vw', y: '6vh', rotation: 4, scaleX: 0.72, scaleY: 1.18, borderRadius: '200px' },
  { x: '0vw', y: '10vh', rotation: 0, scaleX: 1.55, scaleY: 0.52, borderRadius: '36px' },
  { x: '27vw', y: '0vh', rotation: 0, scaleX: 0.55, scaleY: 1.4, borderRadius: '32px' },
  { x: '-22vw', y: '-3vh', rotation: 8, scaleX: 0.92, scaleY: 0.92, borderRadius: '999px' },
  { x: '22vw', y: '7vh', rotation: -10, scaleX: 1.2, scaleY: 0.8, borderRadius: '44px' },
];

const GRADIENTS = [
  'linear-gradient(135deg, var(--violet-500), var(--blue-500))',
  'linear-gradient(160deg, var(--violet-600), var(--violet-900))',
  'linear-gradient(120deg, var(--blue-500), var(--violet-500))',
  'linear-gradient(150deg, var(--blue-600), var(--violet-700))',
  'linear-gradient(135deg, var(--violet-500), var(--blue-500))',
  'linear-gradient(140deg, var(--violet-700), var(--blue-600))',
];

const STAGE_TINTS = [
  'radial-gradient(60% 55% at 78% 30%, color-mix(in srgb, var(--violet-500) 16%, transparent), transparent 70%)',
  'radial-gradient(60% 55% at 22% 60%, color-mix(in srgb, var(--violet-500) 20%, transparent), transparent 70%)',
  'radial-gradient(70% 60% at 50% 80%, color-mix(in srgb, var(--blue-500) 14%, transparent), transparent 72%)',
  'radial-gradient(60% 55% at 80% 55%, color-mix(in srgb, var(--blue-500) 18%, transparent), transparent 70%)',
  'radial-gradient(60% 55% at 25% 35%, color-mix(in srgb, var(--violet-500) 18%, transparent), transparent 70%)',
  'radial-gradient(62% 55% at 68% 62%, color-mix(in srgb, var(--violet-500) 17%, transparent), transparent 70%)',
];

/** Inner-shape poses (ring + panel) per scene — small recompositions inside the artifact. */
const SHAPE_A = [
  { x: '6%', y: '-12%', scale: 1, rotation: 0 },
  { x: '-18%', y: '30%', scale: 0.7, rotation: 40 },
  { x: '30%', y: '0%', scale: 1.25, rotation: 90 },
  { x: '0%', y: '-30%', scale: 0.8, rotation: 140 },
  { x: '12%', y: '18%', scale: 1.1, rotation: 200 },
  { x: '-8%', y: '22%', scale: 1.15, rotation: 260 },
];
const SHAPE_B = [
  { x: '-20%', y: '35%', scale: 1, rotation: -8 },
  { x: '25%', y: '-20%', scale: 1.3, rotation: 12 },
  { x: '-35%', y: '-8%', scale: 0.8, rotation: -20 },
  { x: '20%', y: '30%', scale: 1.15, rotation: 6 },
  { x: '-10%', y: '-28%', scale: 0.9, rotation: -14 },
  { x: '18%', y: '-22%', scale: 1.05, rotation: 22 },
];

/**
 * Services as a scroll-driven transformation sequence. One pinned dark stage;
 * each service is a scene: masked typography exits upward, the next headline
 * wipes in, the shared gradient artifact morphs pose/shape/color, the stage
 * tint drifts, an oversized stroked numeral slides behind the type, and a
 * cinematic ticker tracks progress. The final beat fades the whole stage to
 * canvas so the About chapter emerges from the same surface — no hard break.
 * Mobile / reduced motion: scenes stack editorially, no pin.
 */
export function ServiceScenes() {
  const stageRef = useRef<HTMLDivElement>(null);
  const artifactRef = useRef<HTMLDivElement>(null);
  const shapeARef = useRef<HTMLDivElement>(null);
  const shapeBRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const tickerNumRef = useRef<HTMLDivElement>(null);
  const tickerNameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]', stage);
    const tintLayers = gsap.utils.toArray<HTMLElement>('[data-stage-tint]', stage);
    const gradLayers = gsap.utils.toArray<HTMLElement>('[data-artifact-gradient]', stage);
    const items = (scene: HTMLElement) => scene.querySelectorAll('[data-scene-item]');
    const headline = (scene: HTMLElement) => scene.querySelector('[data-scene-headline]');
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const step = 100 / services.length; // masked-track shift per scene, in percent

      gsap.set(scenes.slice(1), { autoAlpha: 0 });
      gsap.set(artifactRef.current, { ...ARTIFACT[0], autoAlpha: 0 });
      gsap.set(gradLayers[0], { backgroundImage: GRADIENTS[0], opacity: 1 });
      gsap.set(tintLayers[0], { backgroundImage: STAGE_TINTS[0], opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=620%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // scene one assembles as the stage arrives
      tl.fromTo(headline(scenes[0]), { yPercent: 110 }, { yPercent: 0, duration: 0.5 }, 0.05)
        .fromTo(
          items(scenes[0]),
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: STAGGER.text },
          0.1
        )
        .to(artifactRef.current, { autoAlpha: 0.95, duration: 0.5 }, 0.05);

      for (let i = 1; i < scenes.length; i++) {
        const t = i;
        const grad = gradLayers[i % 2];
        const gradOut = gradLayers[(i + 1) % 2];
        const tint = tintLayers[i % 2];
        const tintOut = tintLayers[(i + 1) % 2];

        // outgoing scene: headline masks upward, the rest lifts away
        tl.to(headline(scenes[i - 1]), { yPercent: -110, duration: 0.32, ease: 'power2.in' }, t)
          .to(items(scenes[i - 1]), { autoAlpha: 0, y: -26, duration: 0.28, stagger: 0.03 }, t)
          .set(scenes[i - 1], { autoAlpha: 0 }, t + 0.34)
          // the artifact carries the transition — new pose, shapes, color
          .to(artifactRef.current, { ...ARTIFACT[i], duration: 0.7, ease: 'power2.inOut' }, t)
          .to(shapeARef.current, { ...SHAPE_A[i], duration: 0.7, ease: 'power2.inOut' }, t)
          .to(shapeBRef.current, { ...SHAPE_B[i], duration: 0.7, ease: 'power2.inOut' }, t)
          .set(grad, { backgroundImage: GRADIENTS[i] }, t)
          .to(grad, { opacity: 1, duration: 0.55 }, t)
          .to(gradOut, { opacity: 0, duration: 0.55 }, t)
          .set(tint, { backgroundImage: STAGE_TINTS[i] }, t)
          .to(tint, { opacity: 1, duration: 0.6 }, t)
          .to(tintOut, { opacity: 0, duration: 0.6 }, t)
          .to(watermarkRef.current, { xPercent: -step * i, duration: 0.6, ease: 'power2.inOut' }, t)
          .to(tickerNumRef.current, { yPercent: -step * i, duration: 0.45, ease: 'power2.inOut' }, t)
          .to(tickerNameRef.current, { yPercent: -step * i, duration: 0.45, ease: 'power2.inOut' }, t)
          // incoming scene: headline wipes in from below, content staggers after it
          .set(scenes[i], { autoAlpha: 1 }, t + 0.3)
          .fromTo(headline(scenes[i]), { yPercent: 110 }, { yPercent: 0, duration: 0.5 }, t + 0.32)
          .fromTo(
            items(scenes[i]),
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.42, stagger: STAGGER.text },
            t + 0.38
          );
      }

      // closing resolve: retire the ancillary layers so the FINAL scene rests
      // clean on the dark stage. The released stage then carries real content
      // (not an empty white sheet) as it scrolls up; the dark→light handoff to
      // About happens through the dawn wash at the section boundary. This is
      // what prevents an empty trailing viewport after the pin releases.
      const tEnd = scenes.length;
      tl.to(artifactRef.current, { autoAlpha: 0, scale: 0.94, duration: 0.5, ease: 'power2.inOut' }, tEnd)
        .to([watermarkRef.current?.parentElement ?? null, '[data-ticker]'], { autoAlpha: 0, duration: 0.4 }, tEnd)
        // brief hold on the resolved final scene before the pin releases
        .to({}, { duration: 0.35 });

      // ticker progress line, linear across the whole story
      tl.fromTo(
        progressRef.current,
        { scaleX: 1 / services.length },
        { scaleX: 1, ease: 'none', duration: scenes.length - 1 },
        0
      );
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      scenes.forEach((scene) => {
        gsap.fromTo(scene, REVEAL_FROM, {
          ...REVEAL_TO,
          scrollTrigger: { trigger: scene, start: 'top 85%', once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section aria-label="What we do" className="relative bg-dark text-ondark">
      {/* chapter intro — still part of the dark act that began with the hero */}
      <Container className="pb-10 pt-section">
        <Reveal>
          <p className="t-eyebrow t-eyebrow-ondark">What we do</p>
        </Reveal>
        <RevealText
          text="Six business lines, one accountable partner."
          as="h2"
          className="t-display ondark-heading mt-2 max-w-[720px]"
        />
      </Container>

      <div ref={stageRef} className="relative lg:h-svh lg:overflow-hidden">
        {/* stage tints (two alternating layers, colors swapped per scene) */}
        <div data-stage-tint="" aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0" />
        <div data-stage-tint="" aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0" />

        {/* oversized stroked numeral drifting behind the type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[3%] top-[6%] hidden overflow-hidden lg:block"
          style={{ width: '1.5em', fontSize: 'clamp(11rem, 24vh, 18rem)' }}
        >
          <div ref={watermarkRef} className="flex font-display font-extrabold leading-none">
            {services.map((s) => (
              <span
                key={s.slug}
                className="shrink-0 text-center leading-none text-transparent opacity-60"
                style={{ width: '1.5em', WebkitTextStroke: '1px var(--ink-700)' }}
              >
                {s.index}
              </span>
            ))}
          </div>
        </div>

        {/* the morphing artifact — one object, five poses */}
        <div
          ref={artifactRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[46vh] w-[38vw] lg:block"
          style={{ marginLeft: '-19vw', marginTop: '-23vh' }}
        >
          <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: 'inherit' }}>
            <div data-artifact-gradient="" className="absolute inset-0" />
            <div data-artifact-gradient="" className="absolute inset-0 opacity-0" />
            <div
              ref={shapeARef}
              className="absolute left-1/4 top-1/4 h-1/2 w-1/2 rounded-full border border-[rgba(255,255,255,.28)]"
            />
            <div
              ref={shapeBRef}
              className="absolute left-1/3 top-1/2 h-1/4 w-1/3 rounded-lg bg-[rgba(255,255,255,.14)]"
            />
          </div>
        </div>

        <Container className="relative lg:h-full">
          <div className="flex flex-col gap-16 pb-section-sm lg:block lg:h-full lg:gap-0 lg:pb-0">
            {services.map((service, i) => (
              <article key={service.slug} data-scene="" data-reveal="" className={PLACEMENT[i]}>
                <p data-scene-item="" className="t-micro flex items-center gap-1.5 text-ondark-muted">
                  <span className="font-mono text-[var(--blue-300)]">{service.index}</span>
                  {service.name}
                </p>
                {/* mobile-only gradient accent keeps each scene distinct without the artifact */}
                <span
                  aria-hidden="true"
                  className="mt-2 block h-[6px] w-16 rounded-full lg:hidden"
                  style={{ backgroundImage: GRADIENTS[i] }}
                />
                <div className="mt-2 overflow-hidden">
                  <h3 data-scene-headline="" className="t-h1 ondark-heading will-change-transform">
                    {service.headline}
                  </h3>
                </div>
                <p data-scene-item="" className="t-body-lg mt-2 text-ondark-muted">
                  {service.summary}
                </p>
                <ul
                  data-scene-item=""
                  className={`mt-3 flex flex-wrap gap-1 ${i === 2 ? 'lg:justify-center' : ''}`}
                  aria-label={`${service.name} capabilities`}
                >
                  {service.capabilities.map((cap) => (
                    <li key={cap}>
                      <Chip>{cap}</Chip>
                    </li>
                  ))}
                </ul>
                <div data-scene-item="" className="mt-4">
                  <Button href={`/services/${service.slug}`} variant="outlineDark" iconRight="arrowRight">
                    Explore {service.name}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* cinematic ticker */}
          <div
            data-ticker=""
            aria-hidden="true"
            className="absolute bottom-8 left-gutter hidden items-center gap-2 lg:flex"
          >
            <div className="flex items-baseline gap-[6px] font-mono text-[length:var(--text-body-sm-size)]">
              <span className="block overflow-hidden" style={{ height: '1.2em' }}>
                <span ref={tickerNumRef} className="block leading-[1.2] text-ondark">
                  {services.map((s) => (
                    <span key={s.slug} className="block leading-[1.2]">
                      {s.index}
                    </span>
                  ))}
                </span>
              </span>
              <span className="text-ondark-muted">/ {String(services.length).padStart(2, '0')}</span>
            </div>
            <span className="relative block h-px w-40 bg-[rgba(255,255,255,.18)]">
              <span ref={progressRef} className="absolute inset-0 origin-left bg-[var(--blue-300)]" />
            </span>
            <span className="block overflow-hidden" style={{ height: '1.2em' }}>
              <span
                ref={tickerNameRef}
                className="block text-[length:var(--text-body-sm-size)] leading-[1.2] text-ondark-muted"
              >
                {services.map((s) => (
                  <span key={s.slug} className="block leading-[1.2]">
                    {s.name}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
