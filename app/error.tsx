'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <p className="font-mono-wide text-[10px] uppercase tracking-[0.4em] text-volt">Something broke</p>
      <h1 className="font-display text-3xl uppercase tracking-[0.1em]">We hit a snag</h1>
      <p className="max-w-sm text-sm text-steel">
        Sorry about that. Tap below to try again, or head back to the homepage.
      </p>
      <div className="mt-2 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-full bg-gradient-to-r from-volt-dark to-volt px-6 py-3 font-mono-wide text-xs uppercase tracking-wider text-frost-50"
        >
          Try Again
        </button>
        <a
          href="/"
          className="rounded-full border border-border px-6 py-3 font-mono-wide text-xs uppercase tracking-wider"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
