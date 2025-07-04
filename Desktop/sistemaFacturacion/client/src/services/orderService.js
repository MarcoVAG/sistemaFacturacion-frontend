// src/services/orderService.js
import api from '../api/api'; // Importamos la instancia 'api' configurada

// Obtener una orden de venta con sus detalles por ID (para reconstrucción de factura)
export const getOrderWithDetails = async (id) => {
  try {
    const response = await api.get(`/ordenes/facturaCompleta/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la orden con detalles: " + (error.response?.data || error.message));
  }
};

// Obtener todas las órdenes de venta (para la tabla principal)
export const getAllOrders = async () => {
  try {
    const response = await api.get('/ordenes/selectAllOrders');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las ordenes: " + (error.response?.data || error.message));
  }
};

// Obtener la última orden (se mantiene si es utilizada en otra parte)
export const getTheLastOrder = async () => {
  try {
    const response = await api.get('/ordenes/selectLastOrder');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener la ultima orden: " + (error.response?.data || error.message));
  }
};

export const searchOrder = async (params) => {
  try {
    const response = await api.get('/ordenes/searchOrders', { params });
    return response.data;
  } catch (error) {
    throw new Error("Error en la búsqueda de ordenes: " + (error.response?.data || error.message));
  }
};

// Métodos CRUD para órdenes (se mantienen si son utilizados en la sección de facturación)
export const addOrder = async (order) => {
  try {
    const response = await api.post('/ordenes/createOrder', order);
    console.log("ID en la capa de servicios del cliente: ", response.data);
    return response.data; // Devuelve la respuesta del servidor, que incluye el ID de la nueva orden
  } catch (error) {
    throw new Error("Error al ingresar la orden: " + (error.response?.data || error.message));
  }
};

export const editOrder = async (id, order) => {
  try {
    await api.put(`/ordenes/updateOrder/${id}`, order);
  } catch (error) {
    throw new Error("Error al actualizar la orden: " + (error.response?.data || error.message));
  }
};

export const removeOrder = async (id) => {
  try {
    await api.delete(`/ordenes/deleteOrder/${id}`);
  } catch (error) {
    throw new Error("Error al eliminar la orden: " + (error.response?.data || error.message));
  }
};

// Métodos para obtener datos relacionados (clientes, empleados, estados, métodos de pago)
// Se mantienen si son utilizados en la sección de facturación o en otros lugares
export const getAllClients = async () => {
  try {
    const response = await api.get('/clientes/selectAllClients');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los clientes: " + (error.response?.data || error.message));
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await api.get('/empleados/selectAllEmployees');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los empleados: " + (error.response?.data || error.message));
  }
};

export const getAllStates = async () => {
  try {
    const response = await api.get('/estados/selectAllStates');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los estados: " + (error.response?.data || error.message));
  }
};

export const getAllMethods = async () => {
  try {
    const response = await api.get('/metodosPago/selectAllMethods');
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los metodos: " + (error.response?.data || error.message));
  }
};
