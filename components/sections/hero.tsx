'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? theme === 'dark' : false;

  const handleEnter = () => {
    if (clicked) return;
    setClicked(true);
    router.push('/collections');
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 22);
      my.set((e.clientY / window.innerHeight - 0.5) * 22);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, []);

  const [sparks, setSparks] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>>([]);
  const [streaks, setStreaks] = useState<Array<{ id: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setSparks(
      Array.from({ length: mobile ? 16 : 48 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
      }))
    );
    setStreaks(
      Array.from({ length: mobile ? 2 : 5 }, (_, i) => ({
        id: i,
        top: 12 + Math.random() * 70,
        delay: i * 2.4 + Math.random() * 2,
        duration: Math.random() * 2 + 2.5,
      }))
    );
  }, []);

  const bg = isDark ? 'hsl(var(--ink-dark))' : 'hsl(var(--frost-100))';
  const heading = isDark ? 'hsl(var(--frost-50))' : 'hsl(var(--ink-dark))';

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bg }}
    >
      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />

      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 60% at 70% 25%, hsl(var(--volt) / 0.16), transparent 62%), radial-gradient(ellipse 60% 55% at 20% 80%, hsl(var(--steel) / 0.22), transparent 62%)'
            : 'radial-gradient(ellipse 70% 60% at 70% 25%, hsl(var(--volt) / 0.14), transparent 62%), radial-gradient(ellipse 60% 55% at 20% 80%, hsl(var(--steel) / 0.14), transparent 62%)',
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 42%, hsl(var(--ink-dark) / 0.75) 100%)'
            : 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 42%, hsl(var(--steel) / 0.18) 100%)',
        }}
      />

      {/* Drifting sparks */}
      <div className="pointer-events-none absolute inset-0">
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              backgroundColor: 'hsl(var(--volt))',
            }}
            animate={{ opacity: [0.1, 0.85, 0.1], y: [0, -22, -44] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Speed streaks */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {streaks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute h-px w-40"
            style={{
              top: `${s.top}%`,
              background: 'linear-gradient(90deg, transparent, hsl(var(--volt) / 0.85), transparent)',
            }}
            initial={{ left: '-15%', opacity: 0 }}
            animate={{ left: '115%', opacity: [0, 1, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, repeatDelay: 4, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Rotating emblem */}
      <motion.div style={{ x: sx, y: sy }} className="absolute right-[8%] top-[12%] z-[1] hidden md:block">
        <motion.svg
          viewBox="0 0 200 200"
          className="h-48 w-48 lg:h-60 lg:w-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <polygon
            points="100,12 176,56 176,144 100,188 24,144 24,56"
            fill="none"
            stroke="hsl(var(--volt) / 0.35)"
            strokeWidth="1.5"
          />
          <polygon
            points="100,42 150,71 150,129 100,158 50,129 50,71"
            fill="none"
            stroke="hsl(var(--steel) / 0.4)"
            strokeWidth="1"
          />
          <circle cx="100" cy="12" r="3.5" fill="hsl(var(--volt))" />
        </motion.svg>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, hsl(var(--volt) / 0.3), transparent 70%)',
            filter: 'blur(28px)',
          }}
        />
      </motion.div>

      {/* Corner frame */}
      <div className="pointer-events-none absolute inset-5 md:inset-10">
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2',
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ delay: 1.3 + i * 0.09, duration: 0.8 }}
            className={`absolute h-10 w-10 border-volt/40 md:h-14 md:w-14 ${pos}`}
          />
        ))}
      </div>

      {/* Theme toggle */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          data-cursor-label="theme"
          className="fixed right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-volt/35 text-volt transition-colors hover:bg-volt/10"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      )}

      {/* Veil wipe */}
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: bg }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 100% 0%)' } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{ backgroundColor: bg }}
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(100% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={revealed ? { opacity: 1, width: 72 } : {}}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 h-[3px] rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mb-3 font-mono-wide text-[10px] uppercase tracking-[0.55em] text-volt"
        >
          Men's Wear / Pakistan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-semibold uppercase leading-none tracking-[0.12em] md:text-[7rem] lg:text-[9rem]"
          style={{ color: heading }}
        >
          DRESXO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="mt-4 max-w-sm text-sm leading-relaxed text-ink-light dark:text-frost-200"
        >
          Tracksuits, shirts and trousers cut for movement â€” clean lines, honest
          fabrics, no noise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="relative mt-11"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <button
            onClick={handleEnter}
            data-cursor-label="enter"
            disabled={clicked}
            className="group relative inline-flex items-center justify-center"
          >
            {!clicked && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-volt/40"
                  animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-volt/25"
                  animate={{ scale: [1, 1.85], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                />
              </>
            )}

            <motion.span
              animate={{
                scale: clicked ? [1, 1.08, 0.92] : hovering ? 1.05 : 1,
                opacity: clicked ? [1, 1, 0] : 1,
              }}
              transition={{ duration: clicked ? 0.5 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light px-14 py-4 font-mono-wide text-xs font-medium uppercase tracking-[0.3em] text-frost-50 shadow-xl"
            >
              Enter
            </motion.span>
          </button>

          <AnimatePresence>
            {clicked && (
              <>
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2 border-volt"
                  style={{ x: '-50%', y: '-50%' }}
                  initial={{ width: 20, height: 20, opacity: 0.9 }}
                  animate={{ width: 460, height: 460, opacity: 0 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                />
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={`ray-${i}`}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 origin-left rounded-full bg-volt"
                    style={{ rotate: (i / 12) * 360 }}
                    initial={{ width: 0, opacity: 1 }}
                    animate={{ width: 80, opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.01 }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="mt-9 font-mono-wide text-[9px] uppercase tracking-[0.45em] text-steel"
        >
          Built to move
        </motion.p>
      </div>
    </section>
  );
}
