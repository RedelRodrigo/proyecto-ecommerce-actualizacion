import type { Metadata } from "next";
import { Figtree, Unbounded } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartModal } from "@/components/cart/CartModal";
import { Footer } from "@/components/layout/Footer";
import { NavbarComponent } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Tienda",
  description: "Productos seleccionados con criterio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-bs-theme="dark"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="min-vh-100 d-flex flex-column">
        <AuthProvider>
          <CartProvider>
            <NavbarComponent />
            <main className="flex-grow-1">{children}</main>
            <Footer />
            <CartModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
