import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-black/20">
        <div className="relative aspect-square bg-neutral-100">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            fill
            unoptimized
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-3 line-clamp-2 text-base font-semibold text-white transition-colors duration-200 group-hover:text-accent">
            {product.title}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-lg font-bold text-accent">${product.price}</p>

            <span className="text-xs font-medium text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
