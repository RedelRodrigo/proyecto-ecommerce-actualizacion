"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

function useSearchValue(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const searchQuery = useSearchValue(query, 500);
  const [result, setResult] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setResult([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos?search=${searchQuery}`,
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error en búsqueda:", error);
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control form-control-lg"
      />

      {isLoading && <p className="text-muted small mt-2 mb-0">Buscando...</p>}

      {result.length > 0 ? (
        <ul className="search-results">
          {result.map((product) => (
            <li
              key={product.id}
              className="search-item d-flex justify-content-between align-items-center gap-3"
            >
              <div className="d-flex align-items-center gap-3 overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/40"}
                  alt={product.name}
                  className="search-thumb"
                />
                <div className="overflow-hidden">
                  <div className="fw-semibold text-truncate">
                    {product.name}
                  </div>
                  <span className="price-sm">${product.price}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="primary"
                className="rounded-pill px-3 flex-shrink-0"
                onClick={() => {
                  addToCart(product);
                  setQuery("");
                  setResult([]);
                }}
              >
                Agregar
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading &&
        searchQuery && (
          <p className="text-muted small mt-2 mb-0">
            No encontramos resultados.
          </p>
        )
      )}
    </div>
  );
};
