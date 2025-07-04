import api from '../api/api'; // Instancia de Axios configurada

// Obtener todos los estados
export const getAllStates = async () => {
  try {
    const response = await api.get('/estados/selectAllStates');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los estados: " + (error.response?.data || error.message));
  }
};

// Obtener un estado por ID
export const getStateById = async (id) => {
  try {
    const response = await api.get(`/estados/getStateByID${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el estado: " + (error.response?.data || error.message));
  }
};

// Crear un nuevo estado
export const createState = async (estado) => {
  try {
    const response = await api.post('/estados/createState', { estado });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el estado: " + (error.response?.data || error.message));
  }
};

// Actualizar un estado
export const updateState = async (id, estado) => {
  try {
    const response = await api.put(`/estados/updateState${id}`, { estado });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el estado: " + (error.response?.data || error.message));
  }
};

// Eliminar un estado
export const deleteState = async (id) => {
  try {
    const response = await api.delete(`/estados/deleteState${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el estado: " + (error.response?.data || error.message));
  }
};

// Buscar estados por cualquier campo (búsqueda inteligente)
export const searchStates = async (termino) => {
  try {
    const response = await api.get(`/estados/searchStates`, {
      params: { termino }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al buscar estados: " + (error.response?.data || error.message));
  }
};
