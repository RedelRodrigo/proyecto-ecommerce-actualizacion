import type { Metadata } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartModal } from "@/components/cart/CartModal";
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
    <html lang="es">
      <body className="bg-light min-vh-100 d-flex flex-column">
        <AuthProvider>
          <CartProvider>
            <NavbarComponent />
            <main className="flex-grow-1">{children}</main>
            <CartModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
