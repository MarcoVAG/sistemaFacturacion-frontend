// src/services/userService.js
import api from '../api/api'; // Instancia de Axios configurada

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns {Promise<Array<Object>>} Un array de objetos, cada uno representando un usuario.
 * @throws {Error} Si ocurre un error al obtener los usuarios.
 */
export const getAllUsers = async () => {
  try {
    const response = await api.get('/usuarios/selectAllUsers');
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Error al obtener los usuarios: " + (error.response?.data || error.message));
  }
};

/**
 * Obtiene un usuario por su ID.
 * @param {number} id - El ID del usuario a buscar.
 * @returns {Promise<Object|null>} El objeto del usuario si se encuentra, o null si no.
 * @throws {Error} Si ocurre un error al obtener el usuario.
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/usuarios/selectUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error("Error al obtener el usuario por ID: " + (error.response?.data || error.message));
  }
};

/**
 * Obtiene un usuario por su correo electrónico.
 * Esta función se mantiene a petición del usuario, aunque la autenticación se maneje en authService.
 * @param {string} email - El correo electrónico del usuario a buscar.
 * @returns {Promise<Object|null>} El objeto del usuario si se encuentra, o null si no.
 * @throws {Error} Si ocurre un error al obtener el usuario.
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/usuarios/selectUserByEmail/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw new Error("Error al obtener el usuario por correo electrónico: " + (error.response?.data || error.message));
  }
};

/**
 * Busca usuarios por varios criterios.
 * @param {Object} params - Objeto con los parámetros de búsqueda (ej. { correo_electronico: 'ejemplo', id_rol: 1 }).
 * @returns {Promise<Array<Object>>} Un array de objetos de usuarios que coinciden con la búsqueda.
 * @throws {Error} Si ocurre un error al buscar usuarios.
 */
export const searchUsers = async (params) => {
  try {
    const response = await api.get('/usuarios/searchUsers', { params });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Error al buscar usuarios: " + (error.response?.data || error.message));
  }
};

/**
 * Crea un nuevo usuario.
 * @param {Object} userData - Objeto con los datos del usuario a crear: { correo_electronico, password_hash, id_rol, habilitado (opcional) }.
 * @returns {Promise<Object>} La respuesta del servidor.
 * @throws {Error} Si ocurre un error al crear el usuario.
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/usuarios/createUser', userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error al crear el usuario: " + (error.response?.data || error.message));
  }
};

/**
 * Actualiza los datos de un usuario existente (excepto password_hash).
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} userData - Objeto con los datos a actualizar (correo_electronico, habilitado, id_rol, failed_login_attempts).
 * @returns {Promise<Object>} La respuesta del servidor indicando la actualización.
 * @throws {Error} Si ocurre un error al actualizar el usuario.
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/usuarios/updateUser/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error("Error al actualizar el usuario: " + (error.response?.data || error.message));
  }
};

/**
 * Actualiza el hash de la contraseña de un usuario.
 * @param {number} id - El ID del usuario.
 * @param {string} newPasswordHash - El nuevo hash de la contraseña.
 * @returns {Promise<Object>} La respuesta del servidor.
 * @throws {Error} Si ocurre un error al actualizar la contraseña.
 */
export const updateUserPassword = async (id, newPasswordHash) => {
  try {
    const response = await api.put(`/usuarios/updateUserPassword/${id}`, { new_password_hash: newPasswordHash });
    return response.data;
  } catch (error) {
    console.error(`Error updating user password for ID ${id}:`, error);
    throw new Error("Error al actualizar la contraseña del usuario: " + (error.response?.data || error.message));
  }
};

/**
 * Actualiza el contador de intentos fallidos de login de un usuario.
 * @param {number} id - El ID del usuario.
 * @param {number} attempts - El nuevo número de intentos fallidos.
 * @returns {Promise<Object>} La respuesta del servidor.
 * @throws {Error} Si ocurre un error al actualizar los intentos fallidos.
 */
export const updateFailedLoginAttempts = async (id, attempts) => {
  try {
    const response = await api.put(`/usuarios/updateFailedLoginAttempts/${id}`, { attempts });
    return response.data;
  } catch (error) {
    console.error(`Error updating failed login attempts for ID ${id}:`, error);
    throw new Error("Error al actualizar los intentos fallidos de login: " + (error.response?.data || error.message));
  }
};

/**
 * Cambia el estado de habilitado/deshabilitado de un usuario.
 * @param {number} id - El ID del usuario.
 * @param {boolean} enabledStatus - El nuevo estado de habilitado (true para habilitar, false para deshabilitar).
 * @returns {Promise<Object>} La respuesta del servidor.
 * @throws {Error} Si ocurre un error al cambiar el estado.
 */
export const toggleUserEnabledStatus = async (id, enabledStatus) => {
  try {
    const response = await api.put(`/usuarios/toggleUserEnabledStatus/${id}`, { enabledStatus });
    return response.data;
  } catch (error) {
    console.error(`Error toggling user enabled status for ID ${id}:`, error);
    throw new Error("Error al cambiar el estado de habilitado del usuario: " + (error.response?.data || error.message));
  }
};

/**
 * Elimina un usuario por su ID.
 * @param {number} id - El ID del usuario a eliminar.
 * @returns {Promise<Object>} La respuesta del servidor indicando la eliminación.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/usuarios/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error("Error al eliminar el usuario: " + (error.response?.data || error.message));
  }
};
