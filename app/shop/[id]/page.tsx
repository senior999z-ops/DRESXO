'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart, useWishlist } from '@/components/providers';
import { ProductCard } from '@/components/product-card';
import { Reveal, TextReveal } from '@/components/reveal';
import { getProduct, products, formatPKR } from '@/lib/products';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProduct(id);

  // Every hook runs before any early return â€” React requires a stable hook
  // order on each render.
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="relative z-10 min-h-screen pt-44 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          href="/shop"
          className="mb-6 inline-flex items-center gap-2 font-mono-wide text-[10px] uppercase tracking-wider text-ink-light transition-colors hover:text-volt dark:text-frost-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${product.image})`,
                  transform: zoom ? 'scale(1.4)' : 'scale(1)',
                }}
              />
              <div className="panel absolute bottom-4 right-4 rounded-full px-3 py-1 font-mono-wide text-[9px] uppercase tracking-wider text-ink dark:text-frost-50">
                Hover to zoom
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div>
              <p className="font-mono-wide text-[10px] uppercase tracking-[0.25em] text-volt">
                {product.tagline}
              </p>
              <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                {product.name}
              </h1>
              <p className="mt-2 font-mono-wide text-[11px] uppercase tracking-wider text-steel">
                Code: {product.code}
              </p>

              <p className="mt-6 text-base leading-relaxed text-ink-light dark:text-frost-200">
                {product.description}
              </p>

              <div className="mt-6">
                <p className="font-mono-wide text-[9px] uppercase tracking-wider text-steel">Details</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-volt/30 bg-volt/5 px-4 py-1.5 text-sm text-ink dark:text-frost-50"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono-wide text-[9px] uppercase tracking-wider text-steel">Fabric</p>
                <p className="mt-2 text-sm text-ink-light dark:text-frost-200">{product.fabric}</p>
              </div>

              <p className="mt-8 font-display text-4xl tracking-wide text-volt-dark dark:text-volt-light">
                {formatPKR(product.price)}
                <span className="ml-2 font-sans text-base text-steel">/ {product.size}</span>
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border border-border px-4 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-ink dark:text-frost-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-display text-lg text-ink dark:text-frost-50">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-ink dark:text-frost-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 font-mono-wide text-xs uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt"
                >
                  {added ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Added
                    </motion.span>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                <button
                  onClick={() => toggle(product.id)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-volt/30 text-ink transition-colors hover:border-volt dark:text-frost-50"
                  aria-label="Add to wishlist"
                >
                  <Heart className={cn('h-5 w-5', has(product.id) && 'fill-volt text-volt')} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {['Free Delivery', 'Cash on Delivery', 'Made in Pakistan'].map((feat) => (
                  <div key={feat} className="text-center">
                    <Check className="mx-auto h-5 w-5 text-volt" />
                    <p className="mt-2 text-xs text-ink-light dark:text-frost-200">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <div className="mb-12 text-center">
              <Reveal direction="blur">
                <p className="font-mono-wide text-[10px] uppercase tracking-[0.4em] text-volt">
                  You May Also Like
                </p>
              </Reveal>
              <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[0.08em] text-ink dark:text-frost-50">
                <TextReveal text="Complete the Fit" />
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
