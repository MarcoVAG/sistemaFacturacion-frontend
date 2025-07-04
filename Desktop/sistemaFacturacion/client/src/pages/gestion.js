import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté disponible

const Gestion = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gestión de Datos del Sistema</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Clientes</h5>
              <p className="card-text">Altas, bajas y modificaciones de clientes.</p>
              <Link to="/clientes" className="btn btn-primary">Ir a Clientes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Productos</h5>
              <p className="card-text">Administración de inventario y detalles de productos.</p>
              <Link to="/productos" className="btn btn-primary">Ir a Productos</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Empleados</h5>
              <p className="card-text">Control de personal del sistema.</p>
              <Link to="/empleados" className="btn btn-primary">Ir a Empleados</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Roles</h5>
              <p className="card-text">Administración de roles de usuario en el sistema.</p>
              <Link to="/roles" className="btn btn-primary">Ir a Roles</Link>
            </div>
          </div>
        </div>
        {/* TARJETA PARA GESTIONAR USUARIOS */}
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Usuarios</h5>
              <p className="card-text">Administración de credenciales y acceso de usuarios.</p>
              <Link to="/usuarios" className="btn btn-primary">Ir a Usuarios</Link>
            </div>
          </div>
        </div>
        {/* TARJETA PARA GESTIONAR CATEGORÍAS */}
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Categorías</h5>
              <p className="card-text">Administración de las categorías de productos.</p>
              <Link to="/categorias" className="btn btn-primary">Ir a Categorías</Link>
            </div>
          </div>
        </div>
        {/* TARJETA PARA GESTIONAR ESTADOS DE FACTURA */}
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Estados de Factura</h5>
              <p className="card-text">Administración de los estados de las facturas.</p>
              <Link to="/estados" className="btn btn-primary">Ir a Estados</Link>
            </div>
          </div>
        </div>
        {/* NUEVA TARJETA PARA GESTIONAR MÉTODOS DE PAGO */}
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestionar Métodos de Pago</h5>
              <p className="card-text">Administración de las formas de pago.</p>
              <Link to="/metodosPago" className="btn btn-primary">Ir a Métodos de Pago</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gestion;
