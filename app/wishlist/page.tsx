'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/components/providers';
import { ProductCard } from '@/components/product-card';
import { Reveal, TextReveal } from '@/components/reveal';
import { products } from '@/lib/products';

export default function WishlistPage() {
  const { items } = useWishlist();
  const favorited = products.filter((p) => items.includes(p.id));

  return (
    <main className="relative z-10 min-h-screen pt-44 pb-24 sm:pt-36 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <Reveal direction="blur">
            <p className="font-mono-wide text-[10px] uppercase tracking-[0.45em] text-volt">
              Your Favourites
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-[0.1em] text-ink dark:text-frost-50 md:text-7xl">
            <TextReveal text="Wishlist" />
          </h1>
        </div>

        {favorited.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorited.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Heart className="mx-auto h-16 w-16 text-steel/30" />
            <p className="mt-4 font-display text-2xl uppercase tracking-wide text-steel">
              Nothing here yet
            </p>
            <p className="mt-2 text-sm text-steel/70">
              Tap the heart on any piece to save it here.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-volt-dark to-volt px-8 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
            >
              Browse the Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
