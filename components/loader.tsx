'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink-dark"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-2 w-24 md:w-32"
        >
          <Image
            src="/brand/logo-mark-transparent.png"
            alt="DRESXO"
            width={530}
            height={290}
            className="h-auto w-full object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl font-semibold tracking-[0.35em] text-frost-50 md:text-6xl"
        >
          DRESXO
        </motion.div>

        <div className="mx-auto mt-6 h-px w-40 overflow-hidden bg-frost-50/15">
          <motion.div
            className="h-full bg-gradient-to-r from-volt-dark via-volt to-volt-light"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 font-mono-wide text-[9px] uppercase tracking-[0.45em] text-frost-50/40"
        >
          Elevate Your Style
        </motion.p>
      </div>
    </motion.div>
  );
}
