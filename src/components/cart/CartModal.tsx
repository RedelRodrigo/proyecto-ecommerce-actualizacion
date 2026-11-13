"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
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
      <Modal
        show={showCart}
        onHide={toggleCart}
        size="lg"
        centered
        contentClassName="bg-dark text-white border-0 shadow-lg rounded-4 overflow-hidden"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary border-opacity-25 pb-3"
        >
          <Modal.Title className="d-flex align-items-center gap-2 fw-bold">
            <ShoppingBag size={22} className="text-indigo-400" /> Tu Carrito de
            Compras
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <ShoppingBag size={48} className="mb-3 opacity-25" />
              <p className="fs-5 mb-0">Tu carrito se encuentra vacío</p>
              <small>Agrega productos para comenzar la experiencia.</small>
            </div>
          ) : (
            <>
              <ListGroup variant="flush" className="gap-2">
                {cart.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center bg-black bg-opacity-40 text-white border border-secondary border-opacity-10 rounded-3 p-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.name}
                        width="50"
                        height="50"
                        className="object-fit-cover rounded-2"
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                        <small className="text-muted">
                          Cantidad: {item.quantity}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <span className="fw-bold fs-5 text-indigo-300">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                <span className="text-muted">Total estimado:</span>
                <h3 className="fw-bold mb-0 text-white">
                  ${getTotalPrice().toFixed(2)}
                </h3>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-secondary border-opacity-25 pt-3">
          {cart.length > 0 && (
            <Button
              variant="outline-danger"
              className="rounded-pill px-4"
              onClick={() => setShowConfirm(true)}
            >
              Vaciar Carrito
            </Button>
          )}
          <Button
            variant="secondary"
            className="rounded-pill px-4"
            onClick={toggleCart}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        contentClassName="bg-dark text-white border-0 rounded-4"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary border-opacity-25"
        >
          <Modal.Title className="fw-bold">Confirmar acción</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <p className="mb-0 text-muted">
            ¿Estás seguro de que deseas vaciar por completo el carrito de
            compras?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-secondary border-opacity-25">
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
