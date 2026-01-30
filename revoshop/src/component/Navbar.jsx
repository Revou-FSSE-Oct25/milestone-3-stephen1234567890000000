"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useCartStore from "@/store/UseCartStore";

export default function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items ?? []);
  const cartCount = items.length;

  const navItem = (href, label) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          relative px-1 text-sm font-semibold tracking-wide transition-colors
          ${active ? "text-white" : "text-neutral-400 hover:text-white"}
          after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full
          after:origin-left after:scale-x-0 after:bg-white after:transition-transform
          hover:after:scale-x-100
          ${active ? "after:scale-x-100" : ""}
        `}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            Revo<span className="text-neutral-400">Shop</span>
          </Link>

          <nav className="flex items-center gap-10">
            {navItem("/", "Home")}
            {navItem("/products", "Products")}
            {navItem("/admin", "Admin")}

            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-white"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
