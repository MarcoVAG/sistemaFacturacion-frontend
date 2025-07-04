// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const userRole = parseInt(localStorage.getItem("idRol")); // Ej: 1 = Admin

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si se especifican roles y el usuario no está autorizado, redirige
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está bien, renderiza el contenido
  return children;
};

export default ProtectedRoute;
