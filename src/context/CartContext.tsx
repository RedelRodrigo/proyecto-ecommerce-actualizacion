"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  showCart: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  };

  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cart,
        showCart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
