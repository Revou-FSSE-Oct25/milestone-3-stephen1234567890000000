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
      <div className="mb-14 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400">
        Loading promo...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-14 rounded-2xl border border-red-500/30 bg-red-900/20 p-6 text-red-400">
        Error: {isError}
      </div>
    );
  }

  return (
    <div className="relative mb-16 overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 p-10">
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent">
          Today’s Promo
        </p>

        <h2 className="mb-4 text-3xl font-bold text-white">{promo.title}</h2>

        <p className="text-neutral-400 leading-relaxed">{promo.description}</p>
      </div>
    </div>
  );
}