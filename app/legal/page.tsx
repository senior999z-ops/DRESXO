import { Reveal, TextReveal } from '@/components/reveal';

const SECTIONS = [
  {
    title: 'Privacy Policy',
    body: 'We collect only what is needed to process your order — name, phone, email and delivery address. Your data is never sold or shared with third parties.',
  },
  {
    title: 'Terms & Conditions',
    body: 'By placing an order you agree to our Cash on Delivery terms and stated delivery timelines. Product colours may vary slightly from photos depending on your screen.',
  },
  {
    title: 'Refund & Exchange Policy',
    body: 'If an item arrives damaged or incorrect, contact us within 3 days of delivery for a replacement or refund. Items must be unworn, unwashed and with tags intact.',
  },
  {
    title: 'Shipping Policy',
    body: 'We deliver across Pakistan. Orders are dispatched within 3-5 business days and typically arrive within 5-7 business days depending on your city.',
  },
];

export default function LegalPage() {
  return (
    <main className="relative z-10 min-h-screen pt-44 pb-24 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">
              The Fine Print
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-6xl">
            <TextReveal text="Policy & Terms" />
          </h1>
        </div>

        <div className="space-y-9">
          {SECTIONS.map((s) => (
            <div key={s.title} className="border-b border-border pb-8">
              <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-light dark:text-frost-200">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
