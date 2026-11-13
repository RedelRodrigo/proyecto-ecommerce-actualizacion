"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/types";

export default function AdminPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modales de control
  const [activeTab, setActiveTab] = useState<
    "list" | "add" | "edit" | "delete"
  >("list");

  // Estado formulario (Agregar / Editar)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos",
      );
      setProducts(response.data);
    } catch (_err) {
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear producto
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image || "https://via.placeholder.com/150",
        createdAt: new Date().toISOString(),
      };
      await axios.post(
        "https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos",
        newProduct,
      );
      setSuccess("Producto agregado exitosamente");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      fetchProducts();
      setActiveTab("list");
    } catch (_err) {
      setError("Error al crear el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  // Actualizar producto
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setSubmitting(true);
    try {
      const updated = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await axios.put(
        `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos/${selectedProduct.id}`,
        updated,
      );
      setSuccess("Producto actualizado exitosamente");
      fetchProducts();
      setActiveTab("list");
      setSelectedProduct(null);
    } catch (_err) {
      setError("Error al actualizar.");
    } finally {
      setSubmitting(false);
    }
  };

  // Eliminar producto
  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    setSubmitting(true);
    try {
      await axios.delete(
        `https://68d6f35cc2a1754b426c4f7e.mockapi.io/Productos/${selectedProduct.id}`,
      );
      setSuccess("Producto eliminado exitosamente");
      fetchProducts();
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (_err) {
      setError("Error al eliminar.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando panel de administración...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Panel de Administración</h1>
          <p className="text-muted mb-0">
            Bienvenido, <strong>{user?.username}</strong>
          </p>
        </div>
        {activeTab !== "list" && (
          <Button
            variant="outline-secondary"
            onClick={() => setActiveTab("list")}
          >
            ← Volver al Panel
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      {/* VISTA PRINCIPAL DEL PANEL */}
      {activeTab === "list" && (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Gestión de Productos</h3>
              <Button
                variant="primary"
                onClick={() => {
                  setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    image: "",
                  });
                  setActiveTab("add");
                }}
              >
                + Agregar Producto
              </Button>
            </div>

            <p className="text-muted">
              Total de productos registrados:{" "}
              <Badge bg="primary">{products.length}</Badge>
            </p>

            <ListGroup variant="flush">
              {products.map((product) => (
                <ListGroup.Item
                  key={product.id}
                  className="d-flex justify-content-between align-items-center py-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt={product.name}
                      width="50"
                      height="50"
                      className="object-fit-cover rounded"
                    />
                    <div>
                      <h6 className="mb-1">{product.name}</h6>
                      <small className="text-muted">
                        ${product.price} | {product.category || "General"}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setFormData({
                          name: product.name,
                          description: product.description,
                          price: product.price.toString(),
                          category: product.category,
                          image: product.image,
                        });
                        setActiveTab("edit");
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDeleteModal(true);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* VISTA AGREGAR */}
      {activeTab === "add" && (
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="mb-4">Agregar Nuevo Producto</h3>
            <Form onSubmit={handleCreateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Guardando..." : "Crear Producto"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* VISTA EDITAR */}
      {activeTab === "edit" && (
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="mb-4">Editar Producto</h3>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Button variant="success" type="submit" disabled={submitting}>
                {submitting ? "Actualizando..." : "Guardar Cambios"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* MODAL ELIMINAR */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <strong>{selectedProduct?.name}</strong>?
          </p>
          <p className="text-muted small">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={submitting}
          >
            {submitting ? "Eliminando..." : "Sí, eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
