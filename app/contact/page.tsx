import { ContactSection } from '@/components/sections/contact-section';
import { Reveal, TextReveal } from '@/components/reveal';

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen pt-44 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">Connect</p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-7xl">
            <TextReveal text="Contact" />
          </h1>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-sm text-ink-light dark:text-frost-200">
              Questions about sizing, an order, or a wholesale enquiry? Send us a
              message and we will get back to you.
            </p>
          </Reveal>
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
