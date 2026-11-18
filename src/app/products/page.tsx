"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { fetchAllProducts } from "@/lib/products";
import type { Product } from "@/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllProducts()
      .then(setAllProducts)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Error desconocido"),
      )
      .finally(() => setIsLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const products = allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">No pudimos cargar los productos: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <header className="mb-5">
        <h1 className="display-6 mb-1">Catálogo</h1>
        <p className="text-muted mb-0">Productos elegidos para vos.</p>
      </header>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <article className="product-card h-100 d-flex flex-column">
              <div className="product-media">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                    className="product-img"
                  />
                ) : (
                  <span className="text-muted small position-absolute top-50 inset-s-50 translate-middle">
                    Sin imagen
                  </span>
                )}
              </div>

              <div className="p-3 d-flex flex-column grow">
                {product.category && (
                  <span className="product-category">{product.category}</span>
                )}
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.description}</p>

                <div className="d-flex align-items-end justify-content-between gap-2 mt-auto pt-3">
                  <span className="price">${product.price}</span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <nav
        className="d-flex justify-content-center align-items-center gap-4 mt-5"
        aria-label="Paginación"
      >
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </Button>
        <span className="text-muted">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Siguiente
        </Button>
      </nav>
    </div>
  );
}
