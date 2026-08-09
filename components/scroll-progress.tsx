'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-gradient-to-r from-volt-dark via-volt to-volt-light"
      style={{ scaleX }}
    />
  );
}
