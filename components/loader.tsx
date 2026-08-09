'use client';

import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink-dark"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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
          Built to move
        </motion.p>
      </div>
    </motion.div>
  );
}
