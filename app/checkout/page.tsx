'use client';

import { motion } from 'framer-motion';
import { Check, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/providers';
import { Reveal } from '@/components/reveal';
import { formatPKR } from '@/lib/products';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'done'>('info');
  const [form, setForm] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Pakistan',
  });

  const grandTotal = total;

  const sendOrderEmail = async () => {
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items, total: grandTotal }),
      });
    } catch (err) {
      console.error('Order email failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendOrderEmail();
    setStep('done');
    setTimeout(() => clearCart(), 500);
  };

  const inputClass =
    'w-full rounded-xl border border-border bg-frost-50/50 px-5 py-3 text-sm text-ink outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt/30 dark:text-frost-50';

  if (step === 'done') {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="panel-strong mx-6 max-w-lg rounded-2xl p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-volt-dark to-volt text-frost-50"
          >
            <Check className="h-10 w-10" />
          </motion.div>
          <h1 className="font-display text-4xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50">
            Order Confirmed
          </h1>
          <p className="mt-4 text-sm text-ink-light dark:text-frost-200">
            Thanks for your order. We have received your details and will be in
            touch shortly. Pay in cash when your order arrives.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-volt-dark to-volt px-8 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-32">
        <div className="text-center">
          <p className="font-display text-2xl uppercase tracking-wide text-steel">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-volt-dark to-volt px-8 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen pt-44 pb-24 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <h1 className="font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50">
            Checkout
          </h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-ink dark:text-frost-50">
                Contact &amp; Shipping
              </h2>
              <div className="mt-3 flex items-center gap-2 font-mono-wide text-[10px] uppercase tracking-wider text-steel">
                <Truck className="h-3 w-3" />
                Cash on Delivery — pay when your order arrives
              </div>

              <div className="mt-6 space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact number (e.g. 03XXXXXXXXX)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <input
                  required
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-6 w-full rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 font-mono-wide text-xs uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt"
              >
                Place Order (COD) — {formatPKR(grandTotal)}
              </motion.button>
            </Reveal>
          </form>

          <div className="lg:col-span-1">
            <div className="panel-strong sticky top-28 rounded-2xl p-6">
              <h2 className="font-display text-xl uppercase tracking-[0.12em] text-ink dark:text-frost-50">
                Order Summary
              </h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="h-14 w-12 flex-shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-ink dark:text-frost-50">{item.name}</p>
                      <p className="text-xs text-steel">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-volt-dark dark:text-volt-light">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-ink-light dark:text-frost-200">
                  <span>Subtotal</span>
                  <span>{formatPKR(total)}</span>
                </div>
                <div className="flex justify-between text-ink-light dark:text-frost-200">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-display text-lg uppercase text-ink dark:text-frost-50">Total</span>
                  <span className="font-display text-xl text-volt-dark dark:text-volt-light">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
