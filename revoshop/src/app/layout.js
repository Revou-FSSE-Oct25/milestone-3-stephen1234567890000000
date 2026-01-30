import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "RevoShop - Modern Ecommerce",
  description: "Modern ecommerce template using Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body className="bg-neutral-950 text-neutral-100 antialiased" suppressHydrationWarning={true}>
        <Navbar />
        <main className="py-12 md:py-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
