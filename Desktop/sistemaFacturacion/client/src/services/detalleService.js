// src/services/detallesService.js
import api from '../api/api'; // Importamos la instancia 'api' configurada

// Obtener los detalles de una factura por su ID de orden
export const getDetailsByOrderId = async (idOrden) => {
  try {
    // La URL es ahora `/detalles/selectDetailsByOrderId/${idOrden}`
    const response = await api.get(`/detalles/selectDetailsByOrderId/${idOrden}`);
    return response.data; // La respuesta debería ser un array de detalles de venta con información del producto
  } catch (error) {
    throw new Error("Error al obtener los detalles de la orden: " + (error.response?.data || error.message));
  }
};

// Obtener detalles de un producto (se mantiene si es utilizada en otra parte)
export const getProductDetails = async (id_producto) => {
  try {
    const response = await api.get(`/productos/productsForDetails/${id_producto}`);
    return response.data; // Devuelve todos los detalles del producto
  } catch (error) {
    throw new Error("Error al obtener los detalles del producto: " + (error.response?.data || error.message));
  }
};

// Obtener todos los detalles (genérico, se mantiene si es utilizado en otra parte)
export const getAllDetails = async () => {
  try {
    const response = await api.get('/detalles/selectAllDet');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los detalles: " + (error.response?.data || error.message));
  }
};

// Buscar detalles de venta por ID de orden y múltiples criterios de búsqueda
// Ahora acepta idOrden y un objeto 'searchParams', y los envía como query params
export const searchDetail = async (idOrden, searchParams) => {
  try {
    const response = await api.get('/detalles/searchDetailsByOrderId', { 
      params: { 
        id_orden: idOrden, 
        ...searchParams // Desestructura los parámetros de búsqueda adicionales
      } 
    });
    return response.data;
  } catch (error) {
    throw new Error("Error en la búsqueda de detalles: " + (error.response?.data || error.message));
  }
};

// Métodos CRUD para detalles (se mantienen si son utilizados en la sección de facturación)
export const addDetail = async (detail) => {
  try {
    const response = await api.post('/detalles/createDet', detail);
    return response.data; // Retorna los datos de la respuesta (incluyendo el mensaje de éxito y nuevaOrdenId)
  } catch (error) {
    throw new Error("Error al ingresar el detalle: " + (error.response?.data?.message || error.message));
  }
};

export const editDetail = async (id, detail) => {
  try {
    await api.put(`/detalles/updateDet/${id}`, detail);
  } catch (error) {
    throw new Error("Error al actualizar el detalle: " + (error.response?.data || error.message));
  }
};

export const removeDetail = async (id) => {
  try {
    await api.delete(`/detalles/deleteDet/${id}`);
  } catch (error) {
    throw new Error("Error al eliminar el detalle: " + (error.response?.data || error.message));
  }
};
