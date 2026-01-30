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
      <PromoBanner />
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Discover Our Exclusive <span className="text-accent">Collection</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Curated items with modern design and the best pricing. Shop from our
          premium collection of handpicked products.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 12).map((product) => (
          <ProductCard key={product.id} products={product} />
        ))}
      </section>
    </Container>
  );
}
