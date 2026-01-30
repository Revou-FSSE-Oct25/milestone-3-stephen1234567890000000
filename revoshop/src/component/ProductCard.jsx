import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ products }) {
  return (
    <Link href={`/product/${products.id}`}>
      <div className="group flex flex-col h-full bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-neutral-700 hover:border-accent/20">
        <div className="relative h-48 bg-neutral-50 flex items-center justify-center overflow-hidden">
          <Image
            src={products.images?.[0] || "/placeholder.png"}
            alt={products.title}
            width={300}
            height={300}
            unoptimized
            className="h-full w-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold text-sm text-white line-clamp-2 mb-3 group-hover:text-accent transition-colors duration-200">
            {products.title}
          </h3>

          <div className="mt-auto">
            <p className="text-lg font-bold text-accent">${products.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
