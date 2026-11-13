"use client";

import axios from "axios";
import { ShoppingCart } from "lucide-react";
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
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control form-control-lg"
        style={{ position: "relative", zIndex: 2 }}
      />

      {isLoading && <p className="text-muted small mt-2">Buscando...</p>}

      {result.length > 0 ? (
        <ul
          className="list-group shadow-lg mt-2 text-start border border-secondary border-opacity-25 rounded-3 overflow-hidden"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            maxHeight: "350px",
            overflowY: "auto",
            background: "#0b101b",
            zIndex: 9999, // Forzamos que esté por encima de cualquier otro elemento de la pantalla
          }}
        >
          {result.map((product) => (
            <li
              key={product.id}
              className="list-group-item d-flex justify-content-between align-items-center p-3 border-bottom border-secondary border-opacity-10 text-white"
              style={{ backgroundColor: "#111827" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    position: "relative",
                  }}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/40"}
                    alt={product.name}
                    className="w-100 h-100 object-fit-cover rounded"
                  />
                </div>
                <div>
                  <strong className="d-block text-white">{product.name}</strong>
                  <span className="text-indigo-400 fw-bold small">
                    ${product.price}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="btn-conversion rounded-pill px-3 py-1 d-flex align-items-center gap-1"
                onClick={() => {
                  addToCart(product);
                  setQuery("");
                  setResult([]);
                }}
              >
                <ShoppingCart size={14} /> Agregar
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading &&
        searchQuery && (
          <p className="text-muted small mt-2">No se encontraron resultados</p>
        )
      )}
    </div>
  );
};
