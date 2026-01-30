"use client";

import useCartStore from "@/store/UseCartStore";

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (!product) {
    return null;
  }

  const alreadyAdded = items.some((item) => item.id === product.id);

  const handleClick = () => {
    if (alreadyAdded) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-4 rounded-xl font-semibold transition ${alreadyAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-slate-800"}`}
    >
      {alreadyAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
