// src/components/Navbar.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Importa NavLink para estilos activos
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Importa Dropdown y DropdownButton
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté disponible

const Navbar = () => {
    // Función para cerrar sesión, movida aquí desde FacturaForm
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirige al login
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/factura">Sistema de Facturación</Link> {/* Enlace a la página principal */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/factura">Facturación</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/gestion">Gestión de Datos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/facturasRegistradas">Facturas Registradas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/errores">Historial de errores</NavLink>
                        </li>
                        {/* NUEVA SECCIÓN "CUENTA" CON CERRAR SESIÓN */}
                        <li className="nav-item dropdown">
                            <DropdownButton
                                id="dropdown-cuenta"
                                title="Cuenta"
                                variant="dark" // Para que se integre con el navbar-dark
                                menuVariant="dark" // Para que el menú desplegable también sea oscuro
                            >
                                {/* Puedes añadir más opciones aquí en el futuro, por ejemplo, "Mi Perfil" */}
                                <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
