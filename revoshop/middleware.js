import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Routes yang perlu autentikasi
  const protectedRoutes = ["/checkout", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Routes yang hanya untuk guest (tidak authenticated)
  const guestRoutes = ["/login"];
  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

  // Jika akses protected route tanpa token, redirect ke login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah authenticated dan akses guest route, redirect ke home
  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/login/:path*"],
};
