'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart, useWishlist } from '@/components/providers';
import type { Product } from '@/lib/products';
import { formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [product]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink-dark" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.88, y: 26, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 26, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="panel-strong relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-2xl md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full bg-ink-dark/70 p-2.5 text-frost-50 shadow-lg backdrop-blur-sm transition-colors hover:bg-volt hover:text-ink-dark"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="aspect-[3/4] bg-cover bg-center md:aspect-auto"
              style={{ backgroundImage: `url(${product.image})` }}
            />

            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="font-mono-wide text-[9px] uppercase tracking-[0.2em] text-volt">
                {product.tagline}
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                {product.name}
              </h2>
              <p className="mt-1 font-mono-wide text-[10px] uppercase tracking-wider text-steel">
                Code: {product.code}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ink-light dark:text-frost-200">
                {product.description}
              </p>

              <div className="mt-5">
                <p className="font-mono-wide text-[9px] uppercase tracking-wider text-steel">Details</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-volt/30 bg-volt/5 px-3 py-1 text-xs text-ink dark:text-frost-50"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 font-display text-3xl tracking-wide text-volt-dark dark:text-volt-light">
                {formatPKR(product.price)}
                <span className="ml-2 font-sans text-sm text-steel">/ {product.size}</span>
              </p>

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: product.size,
                    });
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 font-mono-wide text-xs font-medium uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </motion.button>
                <button
                  onClick={() => toggle(product.id)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-volt/30 text-ink transition-colors hover:border-volt dark:text-frost-50"
                  aria-label="Add to wishlist"
                >
                  <Heart className={cn('h-5 w-5', has(product.id) && 'fill-volt text-volt')} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
