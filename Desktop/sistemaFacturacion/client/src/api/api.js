// src/api/api.js
import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:3001/api', // Esta será la URL base para todas tus solicitudes protegidas.
                                      // No incluyas el '/api' en tus llamadas individuales.
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor de Solicitudes (Request Interceptor) ---
// Este interceptor añade el token JWT a cada solicitud saliente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Intenta obtener el token del localStorage
    if (token) {
      // Si existe un token, lo añade al encabezado de autorización
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Retorna la configuración modificada
  },
  (error) => {
    // Maneja cualquier error antes de que la solicitud se envíe
    return Promise.reject(error);
  }
);

// --- Interceptor de Respuestas (Response Interceptor) ---
// Este interceptor maneja errores de respuesta, como 401 (Unauthorized) o 403 (Forbidden)
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la retorna
  (error) => {
    // Si la respuesta es un error 401 (Unauthorized) o 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Token inválido, expirado o acceso denegado. Redirigiendo al login.');
      // Limpia todos los datos de autenticación relevantes del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('idUsuario');       // Nuevo: ID del usuario de la tabla 'usuarios'
      localStorage.removeItem('idRol');           // Nuevo: Rol del usuario
      localStorage.removeItem('correoElectronico'); // Nuevo: Correo electrónico del usuario
      localStorage.removeItem('idEmpleado');      // Conservar si todavía lo usas en alguna parte, aunque ya no es el principal
      localStorage.removeItem('isAdmin');         // Conservar si todavía lo usas
      localStorage.removeItem('idCliente');       // Nuevo: ID del cliente (si aplica)

      // Redirige al usuario a la página de login
      window.location.href = '/'; 
    }
    // Para otros errores, simplemente rechaza la promesa
    return Promise.reject(error);
  }
);

export default api; // Exporta la instancia de Axios configurada