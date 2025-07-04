import api from '../api/api'; // Importamos la instancia 'api' configurada

// Ya no necesitamos definir urlServer ni urlClientes aquí,
// porque la baseURL ya está configurada en api.js.
// Las rutas aquí serán relativas a esa baseURL.

export const getAllClients = async () => {
  try {
    // La URL es ahora solo '/clientes/selectAllClients'
    // 'http://localhost:3001/api' (baseURL) + '/clientes/selectAllClients'
    const response = await api.get('/clientes/selectAllClients');
    return response.data;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    // El interceptor de respuesta en api.js ya maneja la redirección en caso de 401/403.
    // Aquí puedes manejar otros errores o simplemente relanzarlos.
    throw new Error("Error al obtener los clientes: " + (error.response?.data || error.message));
  }
};

export const searchClient = async (params) => {
  try {
    // La URL es ahora solo '/clientes/searchClient'
    const response = await api.get('/clientes/searchClient', { params });
    return response.data;
  } catch (error) {
    throw new Error("Error en la búsqueda del cliente: " + (error.response?.data || error.message));
  }
};

export const createClient = async (clientData) => {
  try {
    // La URL es ahora solo '/clientes/createClient'
    const response = await api.post('/clientes/createClient', clientData);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el cliente: " + (error.response?.data || error.message));
  }
};

export const editClient = async (cedula, clientData) => {
  try {
    // La URL es ahora solo `/clientes/updateClient/${cedula}`
    const response = await api.put(`/clientes/updateClient/${cedula}`, clientData);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el cliente: " + (error.response?.data || error.message));
  }
};

export const removeClient = async (cedula) => {
  try {
    // La URL es ahora solo `/clientes/deleteClient/${cedula}`
    const response = await api.delete(`/clientes/deleteClient/${cedula}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el cliente: " + (error.response?.data || error.message));
  }
};