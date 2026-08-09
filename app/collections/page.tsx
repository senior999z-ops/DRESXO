'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileText, Heart, Home, Info, Mail, Sparkles } from 'lucide-react';
import { FloatingButton } from '@/components/floating-button';

const CATEGORY_CARDS = [
  {
    label: 'Tracksuits',
    href: '/shop?tab=tracksuits',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    label: 'Shirts',
    href: '/shop?tab=shirts',
    image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    label: 'Trousers',
    href: '/shop?tab=trousers',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const NAV_BUTTONS = [
  { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
  { label: 'About', href: '/about', icon: <Info className="h-4 w-4" /> },
  { label: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" /> },
  { label: 'Favourites', href: '/wishlist', icon: <Heart className="h-4 w-4" /> },
  { label: 'Policy', href: '/legal', icon: <FileText className="h-4 w-4" /> },
  { label: 'Official Pages', href: '/social', icon: <Sparkles className="h-4 w-4" /> },
];

export default function CollectionsPage() {
  const [sparks, setSparks] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setSparks(
      Array.from({ length: mobile ? 10 : 28 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <main className="relative z-10 lg:h-screen lg:min-h-screen lg:overflow-hidden">
      {/* Mobile: clean, ordered, compact layout - fits in one screen */}
      <div className="px-6 pb-6 pt-48 lg:hidden">
        <div className="text-center">
          <p className="font-mono-wide text-[9px] uppercase tracking-[0.5em] text-volt">Discover</p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50">
            Collections
          </h1>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {CATEGORY_CARDS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border-2 border-volt/25 transition-colors active:border-volt"
              style={{ aspectRatio: '1 / 1' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${c.image})` }}
              />
              <div className="absolute inset-0 bg-ink-dark/45" />
              <span className="panel-strong absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 font-mono-wide text-[9px] uppercase tracking-[0.15em] text-ink dark:text-frost-50">
                {c.label}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {NAV_BUTTONS.map((nav) => (
            <a
              key={nav.label}
              href={nav.href}
              className="panel-strong flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-ink shadow-lg dark:text-frost-50"
            >
              {nav.icon}
              <span className="text-center font-mono-wide text-[8px] uppercase leading-tight tracking-[0.1em]">
                {nav.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: ambient scattered / floating layout */}
      <div className="relative hidden h-full lg:block">
        <div className="pointer-events-none absolute inset-0">
          {sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-volt"
              style={{ top: `${s.top}%`, left: `${s.left}%`, width: 2, height: 2 }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute left-1/2 top-7 z-10 -translate-x-1/2 text-center"
        >
          <p className="font-mono-wide text-[10px] uppercase tracking-[0.5em] text-volt">Discover</p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 sm:text-5xl md:text-6xl">
            Collections
          </h1>
        </motion.div>

        {CATEGORY_CARDS.map((c, i) => (
          <FloatingButton
            key={c.label}
            href={c.href}
            label={c.label}
            image={c.image}
            variant="collection"
            index={i}
            total={CATEGORY_CARDS.length}
          />
        ))}

        {NAV_BUTTONS.map((nav, i) => (
          <FloatingButton
            key={nav.label}
            href={nav.href}
            label={nav.label}
            image=""
            icon={nav.icon}
            variant="nav"
            index={i}
            total={NAV_BUTTONS.length}
          />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono-wide text-[9px] uppercase tracking-[0.3em] text-steel/60"
        >
          Tap any to explore
        </motion.p>
      </div>
    </main>
  );
}

