"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/component/Container";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Simulasi checkout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(`Order berhasil! Total: $${total.toFixed(2)}`);
      clearCart();
      router.push("/");
    } catch (error) {
      alert("Checkout gagal");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Keranjang Kosong</h1>
          <p className="text-neutral-400 mb-8">Tambahkan produk sebelum checkout.</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90"
          >
            Kembali Belanja
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        {/* User Info */}
        <div className="mb-8 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">User Info</h2>
          <p className="text-neutral-300">
            <span className="font-medium">Nama:</span> {user?.name || "N/A"}
          </p>
          <p className="text-neutral-300">
            <span className="font-medium">Email:</span> {user?.email || "N/A"}
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 p-6 bg-neutral-800/50 rounded-xl border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-neutral-700">
                <div>
                  <p className="text-white font-medium line-clamp-1">{item.title}</p>
                  <p className="text-sm text-neutral-400">Qty: 1</p>
                </div>
                <p className="text-accent font-semibold">${item.price?.toFixed(2) || "0.00"}</p>
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-neutral-400 mb-2">Subtotal: ${items.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}</p>
            <p className="text-neutral-400 mb-4">Shipping: FREE</p>
            <p className="text-2xl font-bold text-accent">Total: ${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-4">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 px-6 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-6 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 border border-neutral-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Container>
  );
}
