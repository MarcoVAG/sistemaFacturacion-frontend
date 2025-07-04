// src/services/employeeService.js
import api from '../api/api'; // Importamos la instancia 'api' configurada

/**
 * @desc Obtiene todos los empleados.
 * @returns {Promise<Array>} Un arreglo de objetos de empleados.
 * @throws {Error} Si ocurre un error al obtener los empleados.
 */
export const getAllEmployees = async () => {
  try {
    const response = await api.get('/empleados/selectAllEmployees');
    return response.data;
  } catch (error) {
    console.error("Error fetching all employees:", error);
    throw new Error("Error al obtener los empleados: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Busca empleados por varios criterios.
 * @param {Object} params - Objeto con los parámetros de búsqueda (ej. { cedula: '...', nombre1: '...' }).
 * @returns {Promise<Array>} Un arreglo de objetos de empleados que coinciden con la búsqueda.
 * @throws {Error} Si ocurre un error al buscar empleados.
 */
export const searchEmployees = async (params) => {
  try {
    const response = await api.get('/empleados/searchEmployees', { params });
    return response.data;
  } catch (error) {
    throw new Error("Error en la búsqueda de empleados: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Crea un nuevo empleado.
 * @param {Object} employeeData - Objeto con los datos del empleado a crear.
 * @returns {Promise<Object>} El objeto del nuevo empleado creado.
 * @throws {Error} Si ocurre un error al crear el empleado.
 */
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/empleados/createEmployee', employeeData);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el empleado: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Actualiza los datos de un empleado existente por su cédula.
 * @param {string} cedula - La cédula del empleado a actualizar.
 * @param {Object} employeeData - Objeto con los datos del empleado a actualizar (sin la clave).
 * @returns {Promise<Object>} La respuesta del servidor indicando la actualización.
 * @throws {Error} Si ocurre un error al actualizar el empleado.
 */
export const updateEmployee = async (cedula, employeeData) => {
  try {
    const response = await api.put(`/empleados/updateEmployee/${cedula}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el empleado: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Elimina un empleado por su cédula.
 * @param {string} cedula - La cédula del empleado a eliminar.
 * @returns {Promise<Object>} La respuesta del servidor indicando la eliminación.
 * @throws {Error} Si ocurre un error al eliminar el empleado.
 */
export const deleteEmployee = async (cedula) => {
  try {
    const response = await api.delete(`/empleados/deleteEmployee/${cedula}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el empleado: " + (error.response?.data || error.message));
  }
};