import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-8 py-28">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Revo<span className="text-neutral-500">Shop</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-400">
              A modern music & digital product marketplace inspired by
              BeatStars. Built for creators, producers, and modern commerce.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Shop
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Company
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Social
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} RevoShop — Built for creators.
      </div>
    </footer>
  );
}
