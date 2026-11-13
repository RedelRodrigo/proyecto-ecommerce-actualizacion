"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos?limit=8&page=${page}`,
        );
        if (!response.ok) throw new Error("Error al obtener los productos");
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="indigo" />
        <p className="mt-2 text-muted">Cargando experiencias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">ERROR: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span
          className="badge bg-indigo-subtle text-indigo px-3 py-2 rounded-pill mb-2 fw-semibold"
          style={{ background: "rgba(99, 102, 241, 0.1)", color: "#818cf8" }}
        >
          Colección Exclusiva
        </span>
        <h1 className="fw-bold display-5">Catálogo Principal</h1>
        <p className="text-muted">
          Diseñado para destacar. Encuentra lo que buscas.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 modern-card rounded-4 overflow-hidden text-light border-0 shadow-sm">
              <div
                style={{
                  height: "200px",
                  background: "#111827",
                  position: "relative",
                }}
                className="overflow-hidden d-flex align-items-center justify-content-center"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-fit-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <span className="text-muted">Sin imagen</span>
                )}
                <span className="position-absolute top-0 inset-e-0 m-3 badge bg-dark bg-opacity-75 backdrop-blur border border-light border-opacity-10 z-1">
                  {product.category || "Tendencia"}
                </span>
              </div>
              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold text-truncate mb-2">
                  {product.name}
                </h5>
                <p
                  className="card-text small text-muted grow mb-4"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </p>
                <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-secondary border-opacity-25">
                  <div>
                    <small
                      className="text-muted d-block"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Precio
                    </small>
                    <span className="fs-4 fw-bold text-white">
                      ${product.price}
                    </span>
                  </div>
                  <Button
                    className="btn-conversion rounded-pill px-4 py-2 shadow"
                    onClick={() => addToCart(product)}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación sofisticada */}
      <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Anterior
        </Button>
        <span className="fw-semibold text-muted">Página {page}</span>
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={products.length < 8}
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
}
