"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items ?? []);
  const [isMounted, setIsMounted] = useState(false);
  const cartCount = items.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
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
