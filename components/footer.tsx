'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle, Music2 } from 'lucide-react';
import Link from 'next/link';

const FOOTER_LINKS = {
  Shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?tab=tracksuits', label: 'Tracksuits' },
    { href: '/shop?tab=shirts', label: 'Shirts' },
    { href: '/shop?tab=trousers', label: 'Trousers' },
  ],
  Brand: [
    { href: '/about', label: 'Our Story' },
    { href: '/collections', label: 'Collections' },
    { href: '/social', label: 'Official Pages' },
    { href: '/contact', label: 'Contact' },
  ],
  Support: [
    { href: '/legal', label: 'Policy & Terms' },
    { href: '/wishlist', label: 'Wishlist' },
    { href: '/cart', label: 'Cart' },
    { href: '/checkout', label: 'Checkout' },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 overflow-hidden bg-ink-dark text-frost-50">
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div>
            <p className="font-mono-wide text-[9px] uppercase tracking-[0.4em] text-volt">Menswear</p>
            <p className="mt-1 font-display text-3xl font-semibold uppercase tracking-[0.2em]">DRESXO</p>
            <p className="mt-4 max-w-xs text-sm text-frost-50/50">
              Tracksuits, shirts and trousers built for everyday movement. Made
              and delivered across Pakistan.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-mono-wide text-[10px] uppercase tracking-[0.2em] text-volt">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-frost-50/55 transition-colors hover:text-frost-50"
                    >
                      <span className="mr-0 h-px w-0 bg-volt transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-frost-50/10 pt-8 md:flex-row">
          <p className="font-mono-wide text-[10px] uppercase tracking-wider text-frost-50/40">
            Â© {new Date().getFullYear()} DRESXO. Made in Pakistan.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: 'https://instagram.com/dresxo.pk' },
              { icon: Music2, href: 'https://tiktok.com/@dresxo' },
              { icon: MessageCircle, href: 'https://wa.me/923279198527' },
              { icon: Mail, href: 'mailto:dresxo.support@gmail.com' },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-frost-50/20 text-frost-50/60 transition-colors hover:border-volt hover:text-volt"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
