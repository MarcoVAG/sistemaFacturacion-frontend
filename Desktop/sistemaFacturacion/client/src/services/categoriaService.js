// src/services/categoriaService.js
import api from '../api/api'; // Importamos la instancia 'api' configurada

/**
 * @desc Obtiene todas las categorías.
 * @returns {Promise<Array>} Un arreglo de objetos de categorías.
 * @throws {Error} Si ocurre un error al obtener las categorías.
 */
export const getAllCategorias = async () => {
  try {
    // Asumiendo que tienes un endpoint para listar todas las categorías
    const response = await api.get('/categorias/selectAllCat');
    return response.data;
  } catch (error) {
    console.error("Error fetching all categorias:", error);
    throw new Error("Error al obtener las categorías: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Busca categorías por criterios.
 * @param {Object} params - Objeto con los parámetros de búsqueda (ej. { categoria: '...' }).
 * @returns {Promise<Array>} Un arreglo de objetos de categorías que coinciden con la búsqueda.
 * @throws {Error} Si ocurre un error al buscar categorías.
 */
export const searchCategorias = async (params) => {
  try {
    // Asumiendo que tienes un endpoint para buscar categorías, similar a empleados
    const response = await api.get('/categorias/searchCat', { params });
    return response.data;
  } catch (error) {
    throw new Error("Error en la búsqueda de categorías: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Crea una nueva categoría.
 * @param {Object} categoriaData - Objeto con los datos de la categoría a crear (ej. { categoria: 'Nombre de Categoría' }).
 * @returns {Promise<Object>} El objeto de la nueva categoría creada.
 * @throws {Error} Si ocurre un error al crear la categoría.
 */
export const createCategoria = async (categoriaData) => {
  try {
    const response = await api.post('/categorias/createCat', categoriaData);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la categoría: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Actualiza los datos de una categoría existente por su ID.
 * @param {number} id_categoria - El ID de la categoría a actualizar.
 * @param {Object} categoriaData - Objeto con los datos de la categoría a actualizar (ej. { categoria: 'Nuevo Nombre' }).
 * @returns {Promise<Object>} La respuesta del servidor indicando la actualización.
 * @throws {Error} Si ocurre un error al actualizar la categoría.
 */
export const updateCategoria = async (id_categoria, categoriaData) => {
  try {
    const response = await api.put(`/categorias/updateCat${id_categoria}`, categoriaData);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la categoría: " + (error.response?.data || error.message));
  }
};

/**
 * @desc Elimina una categoría por su ID.
 * @param {number} id_categoria - El ID de la categoría a eliminar.
 * @returns {Promise<Object>} La respuesta del servidor indicando la eliminación.
 * @throws {Error} Si ocurre un error al eliminar la categoría.
 */
export const deleteCategoria = async (id_categoria) => {
  try {
    const response = await api.delete(`/categorias/deleteCat${id_categoria}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la categoría: " + (error.response?.data || error.message));
  }
};