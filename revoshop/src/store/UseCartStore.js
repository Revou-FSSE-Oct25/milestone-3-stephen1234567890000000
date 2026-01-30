import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product) => {
    const existing = get().items.find((item) => item.id === product.id);
    if (existing) {
      return;
    }

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
}));

export default useCartStore;
