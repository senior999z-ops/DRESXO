'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers';
import { formatPKR } from '@/lib/products';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[190]"
        >
          <div className="absolute inset-0 bg-ink-dark/50" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="panel-strong absolute right-0 top-0 flex h-full w-96 max-w-[90vw] flex-col p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase tracking-[0.14em] text-ink dark:text-frost-50">
                Your Bag
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-ink-light transition-colors hover:text-volt dark:text-frost-200"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <ShoppingBag className="h-14 w-14 text-steel/40" />
                <p className="mt-4 text-sm text-ink-light dark:text-frost-200">Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 rounded-full bg-gradient-to-r from-volt-dark to-volt px-7 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="scrollbar-hide flex-1 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 rounded-xl border border-border p-3"
                    >
                      <div
                        className="h-20 w-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1">
                        <p className="font-display text-base uppercase tracking-wide text-ink dark:text-frost-50">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-steel">{item.size}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-ink-light dark:text-frost-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm text-ink dark:text-frost-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-ink-light dark:text-frost-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
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
                        <p className="font-display text-base tracking-wide text-volt-dark dark:text-volt-light">
                          {formatPKR(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-wide text-[10px] uppercase tracking-wider text-steel">
                      Subtotal
                    </span>
                    <span className="font-display text-2xl tracking-wide text-volt-dark dark:text-volt-light">
                      {formatPKR(total)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-steel">Shipping free · Cash on Delivery</p>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 block rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 text-center font-mono-wide text-xs uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
