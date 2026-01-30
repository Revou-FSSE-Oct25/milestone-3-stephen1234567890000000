import Container from "@/component/Container";
import Image from "next/image";
import AddToCartButton from "@/component/AddToCartButton";
import { notFound } from "next/navigation";

async function getProductId(id) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${Number(id)}`,
    { cache: "no-store" },
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductId(id);

  console.log(product, 'ini produkkkkk');
  
  if (!product || !product.id) notFound();

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="bg-neutral-800 rounded-2xl p-8 flex items-center justify-center shadow-sm border border-neutral-700 h-fit">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            width={420}
            height={420}
            className="object-contain max-h-96 w-full"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
            {product.category?.name || "Product"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {product.title}
          </h1>
          <p className="text-4xl font-bold text-accent mb-8">
            ${product.price}
          </p>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            {product.description}
          </p>
          <div className="flex gap-4">
            <AddToCartButton product={product}/>
            <button className="px-6 py-3 rounded-lg border-2 border-neutral-600 text-neutral-300 font-medium hover:bg-neutral-700 active:bg-neutral-600 transition-colors duration-200 flex items-center justify-center min-w-fit">
              ♡
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
