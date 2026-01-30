import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        if (exists) return;

        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "revoshop-cart",
    },
  ),
);

export default useCartStore;
