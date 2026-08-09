import { Reveal, TextReveal } from '@/components/reveal';

const PILLARS = [
  {
    title: 'Fabric First',
    body: 'Brushed poly-cotton, combed oxford, stretch twill — we pick fabric that holds shape after the tenth wash, not just the first.',
  },
  {
    title: 'Cut for Movement',
    body: 'Tapered but never tight. Every pattern is tested on real bodies doing real things, from the gym to the office to the flight.',
  },
  {
    title: 'No Noise',
    body: 'No loud logos, no gimmicks. Clean silhouettes in a tight colour story, so everything you own works with everything else.',
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen pt-44 pb-24 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">
              Our Story
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-7xl">
            <TextReveal text="About" />
          </h1>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-light dark:text-frost-200">
              DRESXO is menswear built around one idea: clothes should keep up
              with you. We make tracksuits, shirts and trousers in a tight,
              considered range — each piece designed to move, layer and last.
              Made and delivered across Pakistan.
            </p>
          </Reveal>
        </div>

        <div className="space-y-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 * i}>
              <div className="rounded-2xl border border-border p-7">
                <p className="font-mono-wide text-[9px] uppercase tracking-[0.3em] text-volt">
                  0{i + 1}
                </p>
                <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-light dark:text-frost-200">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
