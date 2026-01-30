"use client";

import { useEffect, useState } from "react";
import Container from "@/component/Container";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Your cart is empty
          </h1>
          <p className="text-neutral-400 mb-8">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-neutral-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-neutral-800 p-6 rounded-2xl border border-neutral-700"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-neutral-50 rounded-xl">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.title}
                    fill
                    unoptimized={true}
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-neutral-400 text-sm">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 w-fit text-sm font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 h-fit">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Order Summary
            </h2>

            <div className="space-y-3 text-neutral-300">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t border-neutral-600 pt-4 text-white">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-neutral-800 text-white py-3 rounded-lg font-semibold hover:bg-neutral-700 transition">
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="mt-3 w-full border border-neutral-600 py-3 rounded-lg text-neutral-300 font-medium hover:bg-neutral-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
