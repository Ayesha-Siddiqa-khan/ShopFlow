import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopFlow | Premium E-Commerce Experience",
  description: "A production-grade, beautifully designed full-stack e-commerce application powered by Next.js, Supabase PostgreSQL, and modern DevOps architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 antialiased`}>
        <CartProvider>
          <div className="gradient-mesh" />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
