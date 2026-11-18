"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fetchAllProducts } from "@/lib/products";
import type { Product } from "@/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

function useDebouncedValue(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 500);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts()
      .then(setAllProducts)
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const term = debouncedQuery.trim().toLowerCase();

  const results = useMemo(
    () =>
      term
        ? allProducts.filter((p) => p.name.toLowerCase().includes(term))
        : [],
    [term, allProducts],
  );

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control form-control-lg"
      />

      {results.length > 0 ? (
        <ul className="search-results">
          {results.map((product) => (
            <li
              key={product.id}
              className="search-item d-flex justify-content-between align-items-center gap-3"
            >
              <div className="d-flex align-items-center gap-3 overflow-hidden">
                <Image
                  src={product.image || "/Logo.png"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="search-thumb"
                />
                <div className="overflow-hidden">
                  <div className="fw-semibold text-truncate">
                    {product.name}
                  </div>
                  <span className="price-sm">${product.price}</span>
                </div>
              </div>
              <AddToCartButton product={product} className="shrink-0" />
            </li>
          ))}
        </ul>
      ) : (
        term && (
          <p className="text-muted small mt-2 mb-0">
            No encontramos resultados.
          </p>
        )
      )}
    </div>
  );
};
