"use client";

import { useEffect, useState } from "react";

export default function PromoBanner() {
  const [promo, setPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function fetchPromo() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Failed to fetch promo");
        const data = await res.json();
        setPromo(data[0]);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPromo();
  }, []);

  if (isLoading) {
    return (
      <div className="h-56 rounded-3xl border border-neutral-800 bg-neutral-900 animate-pulse" />
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-900/20 p-8 text-red-400">
        Failed to load promo
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-10 md:p-14">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 max-w-xl">
        <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold tracking-widest text-accent">
          TODAY’S PROMO
        </span>

        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white leading-snug">
          {promo.title}
        </h2>

        <p className="mb-6 text-neutral-400 leading-relaxed line-clamp-3">
          {promo.description}
        </p>

        <button className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90">
          Shop Now →
        </button>
      </div>
    </div>
  );
}
