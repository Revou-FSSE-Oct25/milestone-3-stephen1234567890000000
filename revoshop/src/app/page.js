import Container from "@/component/Container";
import ProductCard from "@/component/ProductCard";
import PromoBanner from "@/component/PromoBanner";

export const revalidate = 60;

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <Container>
      <section className="mb-24">
        <PromoBanner />
      </section>
      <section className="mb-16 max-w-3xl">
        <h1 className="mb-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Discover Our Exclusive{" "}
          <span className="text-accent">Collection</span>
        </h1>

        <p className="text-lg text-neutral-400 leading-relaxed">
          Curated products with modern aesthetics and premium quality.
          Handpicked selections designed to elevate your lifestyle.
        </p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 12).map((product) => (
          <ProductCard key={product.id} products={product} />
        ))}
      </section>
    </Container>
  );
}
