// src/services/loginService.js
import api from '../api/api'; // Importa la instancia 'api' configurada

/**
 * Realiza una solicitud de login al backend.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña.
 * @returns {Promise<{token: string, idUsuario: number, idRol: number, correoElectronico: string, idEmpleado?: number, isAdmin?: boolean, idCliente?: number}>} - Un objeto con los detalles de autenticación.
 * @throws {Error} - Si la autenticación falla o hay un error de red.
 */
export const loginUser = async (email, password) => {
  try {
    // La URL es solo '/auth/login' porque el baseURL en api.js ya es 'http://localhost:3001/api'
    // Ahora enviamos 'email' en lugar de 'username'
    const response = await api.post('/auth/login', {
      email, // ¡CAMBIO CLAVE AQUÍ!
      password,
    });
    return response.data; // Retorna todos los datos de autenticación del backend
  } catch (error) {
    console.error("Error en loginService:", error);
    // Permite que el componente que llama maneje el mensaje de error específico.
    // El interceptor ya manejará los 401/403 de forma global, pero podemos lanzar un error
    // con el mensaje del backend para que el componente Login lo muestre.
    throw new Error(error.response?.data || "Error desconocido al iniciar sesión.");
  }
};
