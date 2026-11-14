"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCart } from "@/context/CartContext";

export const CartModal = () => {
  const {
    cart,
    showCart,
    toggleCart,
    removeFromCart,
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
                    <img
                      src={item.image || "https://via.placeholder.com/52"}
                      alt={item.name}
                      className="cart-thumb"
                    />
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <small className="text-muted">
                        Cantidad: {item.quantity}
                      </small>
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
                    >
                      <Trash2 size={18} />
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
