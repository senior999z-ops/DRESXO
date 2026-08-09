'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Heart, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart, useWishlist } from '@/components/providers';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop?tab=tracksuits', label: 'Tracksuits' },
  { href: '/shop?tab=shirts', label: 'Shirts' },
  { href: '/shop?tab=trousers', label: 'Trousers' },
  { href: '/collections', label: 'Collections' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsOpen, count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed left-0 top-8 z-[100] w-full transition-all duration-500',
          scrolled ? 'panel-strong py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-mono-wide text-[9px] uppercase tracking-[0.4em] text-volt">
              Menswear
            </span>
            <span className="font-display text-2xl font-semibold uppercase tracking-[0.24em] text-ink dark:text-frost-50">
              DRESXO
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.5 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'block rounded-full px-5 py-2.5 font-mono-wide text-[11px] uppercase tracking-[0.15em] shadow-sm transition-all duration-300',
                    pathname === link.href
                      ? 'bg-gradient-to-r from-volt-dark via-volt to-volt-light text-frost-50'
                      : 'panel text-ink-light hover:text-ink dark:text-frost-200 dark:hover:text-frost-50'
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full p-2 text-ink-light transition-colors hover:text-volt dark:text-frost-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Link
              href="/wishlist"
              className="rounded-full p-2 text-ink-light transition-colors hover:text-volt dark:text-frost-200"
              aria-label="Wishlist"
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-volt text-[9px] font-bold text-frost-50">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative rounded-full p-2 text-ink-light transition-colors hover:text-volt dark:text-frost-200"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-volt text-[9px] font-bold text-frost-50"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-ink-light transition-colors hover:text-volt dark:text-frost-200 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-dark/50" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="panel-strong absolute right-0 top-0 h-full w-80 max-w-[85vw] p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl font-semibold uppercase tracking-[0.24em] text-ink dark:text-frost-50">
                  DRESXO
                </span>
                <button onClick={() => setMenuOpen(false)} className="rounded-full p-2 text-ink-light dark:text-frost-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block border-b border-border py-4 font-display text-xl uppercase tracking-[0.14em] transition-colors',
                        pathname === link.href ? 'text-volt' : 'text-ink dark:text-frost-50'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
