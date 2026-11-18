"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  size?: "sm" | "lg";
  className?: string;
}

export const AddToCartButton = ({
  product,
  size = "sm",
  className = "",
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const bounce = () => {
    const element = buttonRef.current;
    if (!element) return;

    element.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.15)", offset: 0.3 },
        { transform: "scale(0.95)", offset: 0.6 },
        { transform: "scale(1)" },
      ],
      { duration: 500, easing: "ease-out" },
    );
  };

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    bounce();
  };

  return (
    <Button
      ref={buttonRef}
      size={size}
      variant={added ? "success" : "primary"}
      className={`rounded-pill px-3 d-inline-flex align-items-center gap-1 ${className}`}
      onClick={handleClick}
      aria-live="polite"
    >
      {added ? (
        <>
          <Check size={16} aria-hidden="true" />
          Agregado
        </>
      ) : (
        "Agregar"
      )}
    </Button>
  );
};
