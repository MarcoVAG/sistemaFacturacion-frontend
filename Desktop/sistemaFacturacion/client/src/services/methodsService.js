import api from '../api/api'; // Instancia de Axios configurada

// Obtener todos los métodos de pago
export const getAllMethods = async () => {
  try {
    const response = await api.get('/metodosPago/selectAllMethods');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los métodos: " + (error.response?.data || error.message));
  }
};

// Obtener un método de pago por ID
export const getMethodById = async (id) => {
  try {
    const response = await api.get(`/metodosPago/getMethodByID${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el método: " + (error.response?.data || error.message));
  }
};

// Crear un nuevo método de pago
export const createMethod = async (metodo) => {
  try {
    const response = await api.post('/metodosPago/createMethod', { metodo });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el método: " + (error.response?.data || error.message));
  }
};

// Actualizar un método de pago
export const updateMethod = async (id, metodo) => {
  try {
    const response = await api.put(`/metodosPago/updateMethod${id}`, { metodo });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el método: " + (error.response?.data || error.message));
  }
};

// Eliminar un método de pago
export const deleteMethod = async (id) => {
  try {
    const response = await api.delete(`/metodosPago/deleteMethod${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el método: " + (error.response?.data || error.message));
  }
};

// Buscar métodos de pago por cualquier campo (búsqueda inteligente)
export const searchMethods = async (termino) => {
  try {
    const response = await api.get('/metodosPago/searchMethods', {
      params: { termino }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al buscar métodos de pago: " + (error.response?.data || error.message));
  }
};
