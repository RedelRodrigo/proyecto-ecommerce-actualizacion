"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const NavbarComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, toggleCart } = useCart();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) {
    return <Navbar expand="lg" className="site-nav sticky-top" />;
  }

  return (
    <Navbar expand="lg" className="site-nav sticky-top">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          href="/"
          className="d-flex align-items-center gap-2 p-0"
        >
          <div
            style={{ width: "34px", height: "34px", position: "relative" }}
            className="rounded-circle overflow-hidden"
          >
            <Image
              src="/Logo.png"
              alt="Logo"
              fill
              sizes="34px"
              className="object-fit-cover"
            />
          </div>
          <span className="brand-mark">Mi Tienda</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-nav"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto ms-lg-4 gap-1">
            <Nav.Link as={Link} href="/" className="site-link">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} href="/products" className="site-link">
              Productos
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link
                as={Link}
                href="/admin"
                className="site-link admin-link"
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Button
              variant="outline-secondary"
              onClick={toggleCart}
              className="d-flex align-items-center gap-2 rounded-pill px-3 py-2"
            >
              <ShoppingCart size={18} />
              <span>Carrito</span>
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </Button>

            {isAuthenticated() ? (
              <div className="d-flex align-items-center gap-3 ps-3 border-start border-secondary">
                <span className="small">Hola, {user?.username}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                href="/login"
                as={Link}
                className="rounded-pill px-4 py-2"
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
