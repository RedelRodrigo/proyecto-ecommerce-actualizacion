"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
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

  const totalDistinctProducts = cart.length;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="px-3 border-bottom border-secondary border-opacity-10"
      />
    );
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-4 py-3 border-bottom border-secondary border-opacity-10 sticky-top backdrop-blur bg-opacity-75"
      style={{ backgroundColor: "#090d16 !important" }}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          as={Link}
          className="d-flex align-items-center gap-2 fw-bold text-white tracking-wider"
        >
          <div
            style={{ width: "36px", height: "36px", position: "relative" }}
            className="rounded-circle overflow-hidden"
          >
            <Image
              src="/Logo.png"
              alt="Logo"
              fill
              sizes="36px"
              className="object-fit-cover"
            />
          </div>
          <span>MI TIENDA</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 shadow-none text-white"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4 gap-2">
            <Nav.Link
              href="/"
              as={Link}
              className="text-light px-3 py-2 rounded transition-all hover:bg-white hover:bg-opacity-10"
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              href="/products"
              as={Link}
              className="text-light px-3 py-2 rounded transition-all hover:bg-white hover:bg-opacity-10"
            >
              Productos
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link
                href="/admin"
                as={Link}
                className="text-indigo-400 fw-semibold px-3 py-2 rounded"
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Button
              variant="outline-light"
              onClick={toggleCart}
              className="d-flex align-items-center gap-2 rounded-pill px-3 py-2 border-secondary"
            >
              <ShoppingCart size={18} />
              <span>Carrito</span>
              {totalDistinctProducts > 0 && (
                <Badge
                  bg="indigo"
                  className="ms-1 rounded-pill bg-linear-to-r from-indigo-500 to-purple-500"
                >
                  {totalDistinctProducts}
                </Badge>
              )}
            </Button>

            {isAuthenticated() ? (
              <div className="d-flex align-items-center gap-3 ps-2 border-start border-secondary">
                <span className="text-light small fw-medium">
                  Hola, {user?.username}
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                className="btn-conversion rounded-pill px-4 py-2"
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
