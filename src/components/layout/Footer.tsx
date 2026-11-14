import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="site-footer mt-auto">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 py-4">
        <span>© 2025 Mi eCommerce</span>
        <span>Desarrollado por Redel Rodrigo</span>
      </Container>
    </footer>
  );
};
