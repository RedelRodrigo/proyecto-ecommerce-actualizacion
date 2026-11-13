"use client";

import { ArrowRight, ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import { Search } from "@/components/search/Search";

export default function Home() {
  return (
    <div className="py-5">
      {/* Hero Section */}
      <Container className="text-center py-5">
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4 border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 small fw-semibold">
            <Sparkles size={16} /> Nueva Colección Disponible
          </div>
          <h1 className="display-3 fw-bold mb-4 tracking-tight text-white">
            Diseño, potencia y{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              exclusividad.
            </span>
          </h1>
          <p className="lead text-muted mb-5 fs-5">
            Explora una nueva forma de comprar. Productos seleccionados bajo
            altos estándares de calidad, pensados para destacar.
          </p>

          <div className="d-flex justify-content-center gap-3 mb-5">
            <Button
              className="btn-conversion btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2"
              as={Link}
              href="/products"
            >
              Explorar Catálogo <ArrowRight size={18} />
            </Button>
          </div>

          {/* Buscador Integrado con Estilo Sofisticado */}
          <div
            className="p-4 rounded-4 shadow-lg border border-light border-opacity-10 text-start mt-4"
            style={{
              backgroundColor: "#111827",
              position: "relative",
              zIndex: 1100,
            }}
          >
            <h5 className="text-white mb-3 fw-semibold text-center">
              ¿Buscas algo específico?
            </h5>
            <Search />
          </div>
        </div>
      </Container>

      {/* Badges de confianza */}
      <Container className="py-5 border-top border-secondary border-opacity-10 mt-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-3 modern-card rounded-4 h-100">
              <Zap className="text-indigo-400 mb-2" size={32} />
              <h6 className="text-white fw-bold">Envíos Ultra Rápidos</h6>
              <p className="small text-muted mb-0">
                Despachos optimizados directo a tu puerta.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 modern-card rounded-4 h-100">
              <ShieldCheck className="text-indigo-400 mb-2" size={32} />
              <h6 className="text-white fw-bold">Compra 100% Segura</h6>
              <p className="small text-muted mb-0">
                Protección total en cada transacción y pago.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 modern-card rounded-4 h-100">
              <Truck className="text-indigo-400 mb-2" size={32} />
              <h6 className="text-white fw-bold">Soporte Dedicado</h6>
              <p className="small text-muted mb-0">
                Atención personalizada ante cualquier consulta.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
