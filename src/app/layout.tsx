import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartModal } from "@/components/cart/CartModal";
import { Footer } from "@/components/layout/Footer";
import { NavbarComponent } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Mi Tienda - Next.js Edition",
  description: "E-commerce refactorizado con Next.js, TypeScript y Bun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-bs-theme="dark">
      <body className="min-vh-100 d-flex flex-column">
        <AuthProvider>
          <CartProvider>
            <NavbarComponent />
            <main className="grow">{children}</main>
            <Footer />
            <CartModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
