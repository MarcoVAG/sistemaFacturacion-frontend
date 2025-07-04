import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const PortalCliente = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">Portal del Usuario</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <NavDropdown title="Cuenta" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Portal del Usuario</h2>
        <div className="row justify-content-center">

          {/* Productos */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Productos" text="Consulta del catálogo de productos disponibles." link="/productosRead" />
          </div>

          {/* Facturas */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Facturas" text="Consulta el historial de facturas." link="/facturasRead" />
          </div>

          {/* Clientes */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Clientes" text="Consulta de clientes registrados en el sistema." link="/clientesRead" />
          </div>

          {/* Empleados */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Empleados" text="Consulta del personal registrado." link="/empleadosRead" />
          </div>

          {/* Roles */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Roles" text="Consulta de los roles del sistema." link="/rolesRead" />
          </div>

          {/* Usuarios */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Usuarios" text="Consulta de usuarios y accesos registrados." link="/usuariosRead" />
          </div>

          {/* Categorías de Productos */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Categorías" text="Consulta de las categorías de productos." link="/categoriasRead" />
          </div>

          {/* Estados de Factura */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Estados de Factura" text="Consulta de los estados posibles para una factura." link="/estadosRead" />
          </div>

          {/* Métodos de Pago */}
          <div className="col-md-4 mb-3">
            <Card title="Ver Métodos de Pago" text="Consulta de formas de pago aceptadas." link="/metodosPagoRead" />
          </div>

        </div>
      </div>
    </>
  );
};

// Subcomponente para evitar repetición de tarjetas
const Card = ({ title, text, link }) => (
  <div className="card text-center shadow-sm h-100">
    <div className="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
      <Link to={link} className="btn btn-outline-primary mt-3">Ir</Link>
    </div>
  </div>
);

export default PortalCliente;
