"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAdmin } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(username, password);

    if (result.success) {
      if (isAdmin()) {
        router.push("/admin");
      } else {
        router.push("/products");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "450px" }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2>Inicia Sesión</h2>
            <p className="text-muted">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2">
              Iniciar Sesión
            </Button>
          </Form>

          <div className="mt-4 p-3 bg-dark rounded text-muted small">
            <strong>Credenciales de prueba:</strong>
            <br />
            👤 <em>Usuario normal:</em> cualquier usuario/contraseña
            <br />
            👨‍💼 <em>Admin:</em> admin / admin123
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
