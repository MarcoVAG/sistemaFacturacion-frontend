// src/pages/login

import React, { useState } from "react";
import { loginUser } from '../services/loginService'; // Importa el servicio de login
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import { createError } from '../services/errorService'; // Importa createError desde errorService

const Login = () => {
    // Renombramos 'username' a 'email' para reflejar el cambio en el backend
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Definimos los IDs de roles para la lógica de redirección
    const ROL_ADMINISTRADOR = 1;
    const ROL_VENDEDOR = 2;
    const ROL_CLIENTE = 3;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Llamamos a loginUser con 'email'
            const authResult = await loginUser(email, password);

            console.log("Login exitoso", authResult);
            // Desestructuramos todos los campos relevantes de la respuesta
            const { token, idUsuario, idRol, correoElectronico, idEmpleado, isAdmin, idCliente } = authResult;

            // Guardar todos los datos relevantes en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("idUsuario", idUsuario);
            localStorage.setItem("idRol", idRol);
            localStorage.setItem("correoElectronico", correoElectronico);

            // Guardar idEmpleado/isAdmin o idCliente solo si existen
            if (idEmpleado) {
                localStorage.setItem("idEmpleado", idEmpleado);
            } else {
                localStorage.removeItem("idEmpleado"); // Asegurarse de limpiar si no aplica
            }

            if (typeof isAdmin !== 'undefined') { // Es importante verificar si no es undefined
                localStorage.setItem("isAdmin", isAdmin);
            } else {
                localStorage.removeItem("isAdmin");
            }

            if (idCliente) {
                localStorage.setItem("idCliente", idCliente);
            } else {
                localStorage.removeItem("idCliente"); // Asegurarse de limpiar si no aplica
            }

            // Lógica de redirección basada en el idRol
            if (idRol === ROL_ADMINISTRADOR) {
                navigate("/factura"); // Ajusta tu ruta para administradores
            } else if (idRol === ROL_VENDEDOR) {
                navigate("/factura"); // Ajusta tu ruta para vendedores /dashboard-vendedor
            } else if (idRol === ROL_CLIENTE) {
                navigate("/portalCliente"); // Ajusta tu ruta para clientes /portal-cliente
            } else {
                // Redirección por defecto si el rol no coincide con ninguno esperado
                navigate("/login");
            }

        } catch (err) {
            console.error("Error en el inicio de sesión:", err.message);
            setError(err.message || "Error en el inicio de sesión. Verifica tus credenciales.");

            // *** CAPTURA Y REPORTE DE ERROR ***
            createError({
                mensajeError: err.message,
                detalleError: err.stack, // El stack trace es útil para depurar
                pantallaOrigen: 'Login',
                eventoOrigen: 'handleSubmit',
                // UsuarioId se obtiene automáticamente en createError desde localStorage
                // IPUsuario se captura en el backend
                // NavegadorUsuario se obtiene automáticamente en createError
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm
            // Pasamos 'email' en lugar de 'username'
            email={email}
            password={password}
            loading={loading}
            error={error}
            setEmail={setEmail} // Pasamos setEmail
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};

export default Login;
