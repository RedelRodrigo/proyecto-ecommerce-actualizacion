"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const NavbarComponent = () => {
  const { cart, toggleCart } = useCart();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const router = useRouter();

  const totalDistinctProducts = cart.length;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand
          href="/"
          as={Link}
          className="d-flex align-items-center gap-2"
        >
          <img src="/Logo.png" alt="Logo" width="40" height="40" />
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" as={Link}>
              Inicio
            </Nav.Link>
            <Nav.Link href="/products" as={Link}>
              Productos
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link href="/admin" as={Link}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-light"
              onClick={toggleCart}
              className="d-flex align-items-center gap-1"
            >
              <ShoppingCart size={18} /> Carrito
              {totalDistinctProducts > 0 && (
                <Badge bg="danger" className="ms-1">
                  {totalDistinctProducts}
                </Badge>
              )}
            </Button>

            {isAuthenticated() ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-light small">Hola, {user?.username}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant="outline-success"
                size="sm"
                href="/login"
                as={Link}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
