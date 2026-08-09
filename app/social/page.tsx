'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle, Music2 } from 'lucide-react';
import { Reveal, TextReveal } from '@/components/reveal';

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@dresxo.pk',
    href: 'https://instagram.com/dresxo.pk',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    handle: '@dresxo',
    href: 'https://tiktok.com/@dresxo',
    icon: Music2,
  },
  {
    name: 'WhatsApp',
    handle: '+92 327 9198527',
    href: 'https://wa.me/923279198527',
    icon: MessageCircle,
  },
  {
    name: 'Email',
    handle: 'dresxo.support@gmail.com',
    href: 'mailto:dresxo.support@gmail.com',
    icon: Mail,
  },
];

export default function SocialPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center pt-44 pb-24 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-xl px-6 text-center lg:px-10">
        <Reveal direction="blur">
          <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">
            Follow Along
          </p>
        </Reveal>
        <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-6xl">
          <TextReveal text="Official Pages" />
        </h1>

        <div className="mt-12 space-y-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.55 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-frost-50/40 px-6 py-5 transition-colors hover:border-volt"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-volt-dark to-volt text-frost-50">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-display text-xl uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                  {s.name}
                </p>
                <p className="font-mono-wide text-[10px] uppercase tracking-wider text-steel">
                  {s.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
