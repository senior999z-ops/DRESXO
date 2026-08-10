'use client';

import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart, useWishlist } from '@/components/providers';
import type { Product } from '@/lib/products';
import { formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface/40"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />

          <motion.div
            className="absolute inset-0 bg-ink-dark/45"
            animate={{ opacity: hovered ? 0.15 : 0.3 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.badge && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-volt-dark to-volt px-3 py-1 font-mono-wide text-[9px] uppercase tracking-wider text-frost-50 shadow-lg">
              {product.badge}
            </div>
          )}

          <div className="panel-strong absolute right-4 top-4 z-10 rounded-full px-3 py-1 font-mono-wide text-[9px] uppercase tracking-wider text-volt">
            {product.code}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
          >
            <span className="font-display text-2xl tracking-wide text-frost-50">
              {formatPKR(product.price)}
            </span>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggle(product.id)}
              data-cursor-label="save"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/95 text-ink shadow-lg dark:text-frost-50"
              aria-label="Add to wishlist"
            >
              <Heart className={cn('h-4 w-4', has(product.id) && 'fill-volt text-volt')} />
            </motion.button>

            {onQuickView && (
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuickView(product)}
                data-cursor-label="view"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/95 text-ink shadow-lg dark:text-frost-50"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: product.size,
                })
              }
              data-cursor-label="add"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-volt-dark to-volt text-frost-50 shadow-lg"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <div className="p-5">
          <p className="font-mono-wide text-[9px] uppercase tracking-[0.2em] text-volt">
            {product.tagline}
          </p>
          <Link href={`/shop/${product.id}`}>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.08em] text-ink transition-colors hover:text-volt dark:text-frost-50">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-ink-light dark:text-frost-200">{product.fabric}</p>
          <p className="mt-3 font-display text-xl tracking-wide text-volt-dark dark:text-volt-light">
            {formatPKR(product.price)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
