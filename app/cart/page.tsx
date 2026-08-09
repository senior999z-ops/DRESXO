'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers';
import { Reveal, TextReveal } from '@/components/reveal';
import { formatPKR } from '@/lib/products';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  return (
    <main className="relative z-10 min-h-screen pt-44 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <div className="mb-12 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">Your Bag</p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-6xl">
            <TextReveal text="Cart" />
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-steel/30" />
            <p className="mt-4 font-display text-2xl uppercase tracking-wide text-steel">
              Your bag is empty
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-volt-dark to-volt px-8 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-4 rounded-2xl border border-border p-4"
                >
                  <div
                    className="h-28 w-24 flex-shrink-0 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="flex-1">
                    <p className="font-display text-xl uppercase tracking-wide text-ink dark:text-frost-50">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-steel">{item.size}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-ink-light dark:text-frost-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-7 text-center text-sm text-ink dark:text-frost-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-ink-light dark:text-frost-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-steel transition-colors hover:text-volt"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="font-display text-lg tracking-wide text-volt-dark dark:text-volt-light">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="panel-strong sticky top-28 rounded-2xl p-6">
                <h2 className="font-display text-xl uppercase tracking-[0.12em] text-ink dark:text-frost-50">
                  Summary
                </h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-ink-light dark:text-frost-200">
                    <span>Subtotal</span>
                    <span>{formatPKR(total)}</span>
                  </div>
                  <div className="flex justify-between text-ink-light dark:text-frost-200">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-display text-lg uppercase text-ink dark:text-frost-50">Total</span>
                    <span className="font-display text-xl text-volt-dark dark:text-volt-light">
                      {formatPKR(total)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 text-center font-mono-wide text-xs uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
