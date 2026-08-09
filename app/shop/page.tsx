'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { QuickViewModal } from '@/components/quick-view-modal';
import { Reveal, TextReveal } from '@/components/reveal';
import { CATEGORIES, products, type Category, type Product } from '@/lib/products';
import { cn } from '@/lib/utils';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: Category =
    tabParam === 'shirts' ? 'shirts' : tabParam === 'trousers' ? 'trousers' : 'tracksuits';

  const [tab, setTab] = useState<Category>(initialTab);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [quickView, setQuickView] = useState<Product | null>(null);

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (isSearching) {
      const q = search.trim().toLowerCase();
      return products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
      );
    }
    return products.filter((p) => p.category === tab);
  }, [tab, search, isSearching]);

  return (
    <main className="relative z-10 min-h-screen pt-44 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">
              The Collection
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-7xl">
            <TextReveal text="Shop All" />
          </h1>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-light dark:text-frost-200">
              Tracksuits, shirts and trousers cut for movement. Free delivery
              across Pakistan, Cash on Delivery.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mb-8 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-border px-5 py-3">
            <Search className="h-4 w-4 text-volt" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or product code..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-steel/70 dark:text-frost-50"
            />
          </div>
        </div>

        {!isSearching && (
          <div className="mb-12 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-border p-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setTab(c.value)}
                  className={cn(
                    'rounded-full px-6 py-2.5 font-mono-wide text-[11px] uppercase tracking-[0.15em] transition-all',
                    tab === c.value
                      ? 'bg-gradient-to-r from-volt-dark via-volt to-volt-light text-frost-50 shadow-lg'
                      : 'text-ink-light hover:text-volt dark:text-frost-200'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab + search}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-steel/30" />
            <p className="mt-4 font-display text-2xl uppercase tracking-wide text-steel">
              Nothing found here yet
            </p>
            <p className="mt-2 text-sm text-steel/70">Try a different search or category.</p>
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent />
    </Suspense>
  );
}
