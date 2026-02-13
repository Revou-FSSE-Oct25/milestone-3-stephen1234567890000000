import useCartStore from "@/store/useCartStore";

describe("useCartStore", () => {
  beforeEach(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  });

  it("should initialize with empty items", () => {
    const items = useCartStore.getState().items;
    expect(items).toEqual([]);
  });

  it("should add product to cart", () => {
    const product = { id: 1, title: "Test Product", price: 100 };
    const { addToCart } = useCartStore.getState();

    addToCart(product);
    const items = useCartStore.getState().items;

    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(product);
  });

  it("should not add duplicate products", () => {
    const product = { id: 1, title: "Test Product", price: 100 };
    const { addToCart } = useCartStore.getState();

    addToCart(product);
    addToCart(product);
    const items = useCartStore.getState().items;

    expect(items).toHaveLength(1);
  });

  it("should remove product from cart", () => {
    const product = { id: 1, title: "Test Product", price: 100 };
    const { addToCart, removeFromCart } = useCartStore.getState();

    addToCart(product);
    removeFromCart(product.id);
    const items = useCartStore.getState().items;

    expect(items).toHaveLength(0);
  });

  it("should clear entire cart", () => {
    const products = [
      { id: 1, title: "Product 1", price: 100 },
      { id: 2, title: "Product 2", price: 200 },
    ];
    const { addToCart, clearCart } = useCartStore.getState();

    products.forEach((p) => addToCart(p));
    clearCart();
    const items = useCartStore.getState().items;

    expect(items).toHaveLength(0);
  });
});
