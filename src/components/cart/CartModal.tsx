"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCart } from "@/context/CartContext";

export const CartModal = () => {
  const {
    cart,
    showCart,
    toggleCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setShowConfirm(false);
  };

  return (
    <>
      <Modal show={showCart} onHide={toggleCart} size="lg" centered>
        <Modal.Header closeButton closeVariant="white" className="pb-3">
          <Modal.Title className="fw-semibold">Tu carrito</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <p className="fs-5 mb-1">Tu carrito está vacío</p>
              <small className="text-muted">
                Agregá productos desde el catálogo.
              </small>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-row d-flex justify-content-between align-items-center gap-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={item.image || "/Logo.png"}
                      alt={item.name}
                      width={52}
                      height={52}
                      className="cart-thumb"
                    />
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: "28px", height: "28px" }}
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Quitar una unidad de ${item.name}`}
                        >
                          <Minus size={14} aria-hidden="true" />
                        </Button>
                        <span
                          className="fw-semibold text-center"
                          style={{ minWidth: "1.5rem" }}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: "28px", height: "28px" }}
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Agregar una unidad de ${item.name}`}
                        >
                          <Plus size={14} aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="price-sm">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar producto"
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="cart-total d-flex justify-content-between align-items-baseline mt-4 pt-3">
                <span className="text-muted">Total estimado</span>
                <span className="price">${getTotalPrice().toFixed(2)}</span>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          {cart.length > 0 && (
            <Button
              variant="outline-danger"
              className="rounded-pill px-4"
              onClick={() => setShowConfirm(true)}
            >
              Vaciar carrito
            </Button>
          )}
          <Button
            variant="outline-secondary"
            className="rounded-pill px-4"
            onClick={toggleCart}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="fw-semibold">Confirmar acción</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <p className="mb-0 text-muted">
            ¿Seguro que querés vaciar el carrito?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="rounded-pill px-4"
            onClick={() => setShowConfirm(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            className="rounded-pill px-4"
            onClick={handleClearCart}
          >
            Sí, vaciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
