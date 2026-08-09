'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Music2, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const inputClass =
    'w-full rounded-xl border border-border bg-frost-50/50 px-5 py-3 text-sm text-ink outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt/30 dark:text-frost-50';

  return (
    <section className="relative z-10 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {[
              { icon: MapPin, value: 'Lahore, Pakistan' },
              { icon: Mail, value: 'dresxo.support@gmail.com' },
              { icon: Phone, value: '+92 327 9198527' },
              { icon: Instagram, value: '@dresxo.pk' },
              { icon: Music2, value: '@dresxo.pk' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ x: 6 }} className="flex items-center gap-4">
                <div className="panel flex h-11 w-11 items-center justify-center rounded-full text-volt">
                  <item.icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-ink dark:text-frost-50">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

              setSending(true);
              try {
                await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, message }),
                });
              } catch (err) {
                console.error('Contact submit failed:', err);
              } finally {
                setSending(false);
                setSent(true);
                form.reset();
                setTimeout(() => setSent(false), 3000);
              }
            }}
            className="space-y-4"
          >
            <input name="name" required placeholder="Your name" className={inputClass} />
            <input name="email" type="email" required placeholder="Your email" className={inputClass} />
            <textarea name="message" required rows={4} placeholder="Your message" className={inputClass + ' resize-none'} />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-volt-dark via-volt to-volt-light py-4 font-mono-wide text-xs uppercase tracking-wider text-frost-50 transition-shadow hover:glow-volt disabled:opacity-70"
            >
              {sent ? (
                'Message Sent'
              ) : sending ? (
                'Sending...'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
