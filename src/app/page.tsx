"use client";

import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import { Search } from "@/components/search/Search";

export default function Home() {
  return (
    <>
      <section className="hero-nebula">
        <Container className="hero-inner">
          <div>
            <h1 className="hero-title">Lo que buscabas, sin vueltas.</h1>
            <p className="hero-lead">
              Productos seleccionados con criterio, listos para llevar.
            </p>
            <Button
              as={Link}
              href="/products"
              variant="primary"
              size="lg"
              className="rounded-pill px-4"
            >
              Ver catálogo
            </Button>
          </div>
          <div className="hero-orb" aria-hidden="true" />
        </Container>
      </section>

      <Container className="py-5">
        <div className="search-panel mx-auto" style={{ maxWidth: "720px" }}>
          <h2 className="h5 text-center mb-3">¿Buscas algo específico?</h2>
          <Search />
        </div>
      </Container>

      {/* Reemplazar por datos reales de tu tienda */}
      <div className="trust-strip">
        <Container>
          <span>Envío a todo el país</span>
          <span>Cambios sin complicaciones</span>
          <span>Pago seguro</span>
        </Container>
      </div>
    </>
  );
}
