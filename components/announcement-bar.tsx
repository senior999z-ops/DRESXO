'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  'Free Delivery Across Pakistan',
  'Cash on Delivery',
  'Built for Everyday Movement',
  'New Drops Every Season',
  'Premium Fabrics Only',
];

export function AnnouncementBar() {
  return (
    <div className="relative z-[110] overflow-hidden bg-ink-dark py-2 text-frost-50">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex shrink-0 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="mx-8 flex items-center gap-8 font-mono-wide text-[10px] uppercase tracking-[0.2em]">
              {item}
              <span className="text-volt">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
