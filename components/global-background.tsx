'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Spark { id: number; top: number; left: number; size: number; delay: number; duration: number; }

export function GlobalBackground() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setIsMobile(mobile);
    setSparks(
      Array.from({ length: mobile ? 10 : 34 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-frost-50 via-frost-100 to-frost-200" />

      {/* Technical grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Volt glow — animated on desktop, static on mobile */}
      {isMobile ? (
        <div
          className="absolute -top-32 right-0 h-[520px] w-[520px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(var(--volt) / 0.18), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      ) : (
        <motion.div
          className="absolute -top-32 right-0 h-[620px] w-[620px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--volt) / 0.16), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {isMobile ? (
        <div
          className="absolute bottom-0 -left-32 h-[440px] w-[440px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--steel) / 0.2), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      ) : (
        <motion.div
          className="absolute bottom-0 -left-32 h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--steel) / 0.18), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Drifting sparks */}
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
          animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -18, -36] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
