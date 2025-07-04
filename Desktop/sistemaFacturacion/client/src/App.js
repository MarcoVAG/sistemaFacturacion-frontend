// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar.js";
import Login from "./pages/login.js";
import Factura from "./pages/gui_factura.js";
import Clientes from "./pages/gui_clientes.js";
import ClientesVendedor from "./pages/gui_clientesVendedor.js";
import Productos from "./pages/gui_productos.js";
import Empleados from "./pages/gui_empleados.js";
import Roles from "./pages/gui_roles.js";
import Usuarios from "./pages/gui_usuarios.js";
import Categorias from "./pages/gui_categorias.js";
import Estados from "./pages/gui_estados.js";
import MetodosPago from "./pages/gui_metodosPago.js";
import FacturasRegistradas from "./pages/gui_facturas_registradas.js";
import VentanaClientes from "./pages/emergentes/busquedaClientes.js";
import VentanaProductos from "./pages/emergentes/busquedaProductos.js";
import FacturaImpresion from "./components/facturas/facturaPDF.js";
import Gestion from './pages/gestion.js';
import GuiErrores from './pages/gui_errores.js'; // *** NUEVO: Importa el componente de errores ***
import PortalUsuario from './pages/portal_cliente.js'; // *** NUEVO: Importa el componente de errores ***
import ProductosRead from './pages/soloLectura/gui_readonly_productos.js';
import FacturasRead from './pages/soloLectura/gui_readonly_facturas.js';
import ClientesRead from './pages/soloLectura/gui_readonly_clientes.js';
import EmpleadosRead from './pages/soloLectura/gui_readonly_empleados.js';
import RolesRead from './pages/soloLectura/gui_readonly_roles.js';
import UsuariosRead from './pages/soloLectura/gui_readonly_usuarios.js';
import CategoriasRead from './pages/soloLectura/gui_readonly_categorias.js';
import EstadosRead from './pages/soloLectura/gui_readonly_estados.js';
import MetodosRead from './pages/soloLectura/gui_readonly_metodoPago.js';

import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

// Componente Layout que incluye el Navbar y un Outlet para las rutas anidadas
const AppLayout = () => {
    return (
        <>
            <Navbar />
            <div className="App">
                <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
            </div>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para Login - No tiene el Navbar */}
                <Route path="/" element={<Login />} />

                {/* Ruta de Layout - Todas las rutas anidadas dentro de esta tendrán el Navbar */}
                <Route element={<AppLayout />}>
                    <Route path="/factura" element={<Factura />} />

                    {/* Rutas para los módulos CRUD, accesibles desde la página de Gestión */}
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/empleados" element={<Empleados />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/estados" element={<Estados />} />
                    <Route path="/metodosPago" element={<MetodosPago />} />
                    <Route path="/facturasRegistradas" element={<FacturasRegistradas />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/gestion"
                        element={
                            <ProtectedRoute allowedRoles={[1 /* ADMIN */]}>
                                <Gestion />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/errores"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <GuiErrores />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/unauthorized" element={<Unauthorized />} />


                    {/* Rutas para componentes de ventanas emergentes/secundarias */}
                    <Route path="/facturaPDF" element={<FacturaImpresion />} />

                    {/* Agrega más rutas aquí según sea necesario */}
                </Route>
                <Route path="/clientesVendedor" element={<ClientesVendedor />} />
                <Route path="/busquedaClientes" element={<VentanaClientes />} />
                <Route path="/busquedaProductos" element={<VentanaProductos />} />
                <Route path="/portalCliente" element={<PortalUsuario />} />
                <Route path="/productosRead" element={<ProductosRead />} />
                <Route path="/facturasRead" element={<FacturasRead />} />
                <Route path="/clientesRead" element={<ClientesRead />} />
                <Route path="/empleadosRead" element={<EmpleadosRead />} />
                <Route path="/rolesRead" element={<RolesRead />} />
                <Route path="/usuariosRead" element={<UsuariosRead />} />
                <Route path="/categoriasRead" element={<CategoriasRead />} />
                <Route path="/estadosRead" element={<EstadosRead />} />
                <Route path="/metodosPagoRead" element={<MetodosRead />} />

            </Routes>
        </Router>
    );
};

export default App;
