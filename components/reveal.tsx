'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'blur';
}

export function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const initial =
    direction === 'left'
      ? { opacity: 0, x: -30 }
      : direction === 'right'
      ? { opacity: 0, x: 30 }
      : direction === 'blur'
      ? { opacity: 0 }
      : { opacity: 0, y: 24 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}
