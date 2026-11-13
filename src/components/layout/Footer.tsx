import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto border-top border-secondary">
      <Container fluid>
        <Row className="justify-content-around text-center">
          <Col xs={12} md={4} className="d-none d-md-block">
            <p className="mb-0 text-muted">© 2025 Mi eCommerce</p>
          </Col>
          <Col xs={12} md={4} className="d-none d-lg-block">
            <p className="mb-0 text-muted">Todos los derechos reservados</p>
          </Col>
          <Col xs={12} md={4}>
            <p className="mb-0 text-muted">Desarrollado por Redel Rodrigo</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
