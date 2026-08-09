'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingButtonProps {
  href: string;
  label: string;
  image: string;
  icon?: ReactNode;
  variant?: 'collection' | 'nav';
  index: number;
  total: number;
}

export function FloatingButton({
  href,
  label,
  image,
  icon,
  variant = 'collection',
  index,
  total,
}: FloatingButtonProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Positions chosen to avoid the collection cards, which sit at
  // left8%/y34, right8%/y48, left8%/y62 on mobile (each card spans roughly
  // +-10% around its y value). Nav buttons are placed in the gaps.
  const NAV_SPOTS: { side: 'left' | 'right' | 'center'; offset: number; y: number }[] = [
    { side: 'left', offset: 16, y: 14 },
    { side: 'right', offset: 12, y: 14 },
    { side: 'left', offset: 16, y: 82 },
    { side: 'right', offset: 12, y: 80 },
    { side: 'center', offset: 0, y: 16 },
    { side: 'right', offset: 12, y: 30 },
  ];

  let startY: number;
  let horizontalStyle: { left?: string; right?: string };
  let isCenter = false;

  if (variant === 'nav') {
    const spot = NAV_SPOTS[index % NAV_SPOTS.length];
    startY = spot.y;
    if (spot.side === 'left') horizontalStyle = { left: `${spot.offset}%` };
    else if (spot.side === 'right') horizontalStyle = { right: `${spot.offset}%` };
    else {
      horizontalStyle = { left: '50%' };
      isCenter = true;
    }
  } else {
    const CARD_SPOTS: { side: 'left' | 'right'; offset: number; y: number }[] = [
      { side: 'left', offset: 8, y: 34 },
      { side: 'right', offset: 8, y: 48 },
      { side: 'left', offset: 8, y: 62 },
    ];
    const spot = CARD_SPOTS[index % CARD_SPOTS.length];
    startY = spot.y;
    horizontalStyle =
      spot.side === 'left' ? { left: `${spot.offset}%` } : { right: `${spot.offset}%` };
  }

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 12 });
  const sy = useSpring(y, { stiffness: 40, damping: 12 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 100, damping: 20 });
  const py = useSpring(my, { stiffness: 100, damping: 20 });

  const rotate = useTransform([sx, sy], ([vx, vy]: number[]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(speed * 0.25, 6);
  });

  useEffect(() => {
    setMounted(true);

    let frame = 0;
    const phase = index * 1.3;
    const ampX = variant === 'collection' ? 18 : 20;
    const ampY = variant === 'collection' ? 14 : 16;

    const animate = () => {
      frame++;
      if (frame % 2 === 0) {
        x.set(Math.sin(frame * 0.0003 + phase) * ampX);
        y.set(Math.cos(frame * 0.0004 + phase * 1.7) * ampY);
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    const handleMouse = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 16);
      my.set((e.clientY / window.innerHeight - 0.5) * 16);
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [index, variant, x, y, mx, my]);

  const handleClick = () => {
    setClicked(true);
    router.push(href);
  };

  if (variant === 'nav') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.25 + index * 0.08, type: 'spring', stiffness: 200 }}
        style={{ ...horizontalStyle, top: `${startY}%`, x: sx, y: sy }}
        className={cn('absolute z-20', isCenter && '-translate-x-1/2')}
      >
        <motion.div style={{ x: px, y: py, rotate }}>
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={clicked ? { scale: [1, 1.25, 0] } : { scale: hovered ? 1.12 : 1 }}
            transition={{ duration: clicked ? 0.5 : 0.25 }}
            data-cursor-label={label}
            className="panel-strong flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-mono-wide text-[10px] uppercase tracking-[0.2em] text-ink shadow-lg dark:text-frost-50"
          >
            {icon}
            {label}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div style={{ ...horizontalStyle, top: `${startY}%` }} className="absolute z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.12, type: 'spring', stiffness: 150 }}
        style={{ x: sx, y: sy }}
      >
        <motion.div style={{ x: px, y: py, rotate }}>
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={clicked ? { scale: [1, 1.15, 0] } : { scale: hovered ? 1.07 : 1 }}
            transition={{ duration: clicked ? 0.5 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-cursor-label={label}
            className="group relative flex flex-col items-center gap-3"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-2 hidden rounded-2xl lg:block"
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.08 : 0.85 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: 'radial-gradient(circle, hsl(var(--volt) / 0.3), transparent 70%)',
                  filter: 'blur(18px)',
                }}
              />

              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl border-2 transition-colors',
                  hovered ? 'border-volt' : 'border-volt/25'
                )}
                style={{
                  width: 'clamp(100px, 26vw, 170px)',
                  height: 'clamp(126px, 33vw, 215px)',
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <motion.div
                  className="absolute inset-0 bg-ink-dark/55"
                  animate={{ opacity: hovered ? 0.1 : 0.45 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.span
              animate={{ scale: hovered ? 1.06 : 1 }}
              className={cn(
                'whitespace-nowrap rounded-full px-5 py-2 font-mono-wide text-[10px] uppercase tracking-[0.2em] transition-colors',
                hovered
                  ? 'bg-gradient-to-r from-volt-dark to-volt text-frost-50'
                  : 'panel-strong text-ink dark:text-frost-50'
              )}
            >
              {label}
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
