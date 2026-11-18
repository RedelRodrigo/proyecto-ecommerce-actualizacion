"use client";

import Link from "next/link";
import { Container } from "react-bootstrap";
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
            <Link
              href="/products"
              className="btn btn-primary btn-lg rounded-pill px-4 text-decoration-none d-inline-block"
            >
              Ver catálogo
            </Link>
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
