// src/services/roleService.js
import api from '../api/api'; // Instancia de Axios configurada

/**
 * Obtiene todos los roles de la base de datos.
 * @returns {Promise<Array<Object>>} Un array de objetos, cada uno representando un rol.
 * @throws {Error} Si ocurre un error al obtener los roles.
 */
export const getAllRoles = async () => {
  try {
    const response = await api.get('/roles/selectAllRoles');
    return response.data;
  } catch (error) {
    console.error("Error fetching all roles:", error);
    throw new Error("Error al obtener los roles: " + (error.response?.data || error.message));
  }
};

/**
 * Obtiene un rol por su ID.
 * @param {number} id - El ID del rol a buscar.
 * @returns {Promise<Object|null>} El objeto del rol si se encuentra, o null si no.
 * @throws {Error} Si ocurre un error al obtener el rol.
 */
export const getRoleById = async (id) => {
  try {
    const response = await api.get(`/roles/selectRole/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error);
    throw new Error("Error al obtener el rol por ID: " + (error.response?.data || error.message));
  }
};

/**
 * Busca roles por varios criterios.
 * @param {Object} params - Objeto con los parámetros de búsqueda (ej. { nombre_rol: 'admin', descripcion: 'gestión' }).
 * @returns {Promise<Array<Object>>} Un array de objetos de roles que coinciden con la búsqueda.
 * @throws {Error} Si ocurre un error al buscar roles.
 */
export const searchRoles = async (params) => {
  try {
    const response = await api.get('/roles/searchRoles', { params });
    return response.data;
  } catch (error) {
    console.error("Error searching roles:", error);
    throw new Error("Error al buscar roles: " + (error.response?.data || error.message));
  }
};


/**
 * Crea un nuevo rol.
 * @param {Object} roleData - Objeto con los datos del rol a crear (nombre_rol, descripcion).
 * @returns {Promise<Object>} El objeto del nuevo rol creado (incluye id_rol).
 * @throws {Error} Si ocurre un error al crear el rol.
 */
export const createRole = async (roleData) => {
  try {
    const response = await api.post('/roles/createRole', roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw new Error("Error al crear el rol: " + (error.response?.data || error.message));
  }
};

/**
 * Actualiza un rol existente.
 * @param {number} id - El ID del rol a actualizar.
 * @param {Object} roleData - Objeto con los datos del rol a actualizar (nombre_rol, descripcion).
 * @returns {Promise<Object>} La respuesta del servidor indicando la actualización.
 * @throws {Error} Si ocurre un error al actualizar el rol.
 */
export const updateRole = async (id, roleData) => {
  try {
    const response = await api.put(`/roles/updateRole/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error);
    throw new Error("Error al actualizar el rol: " + (error.response?.data || error.message));
  }
};

/**
 * Elimina un rol por su ID.
 * @param {number} id - El ID del rol a eliminar.
 * @returns {Promise<Object>} La respuesta del servidor indicando la eliminación.
 * @throws {Error} Si ocurre un error al eliminar el rol.
 */
export const deleteRole = async (id) => {
  try {
    const response = await api.delete(`/roles/deleteRole/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error);
    throw new Error("Error al eliminar el rol: " + (error.response?.data || error.message));
  }
};
