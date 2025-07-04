// src/services/productService.js
import api from '../api/api'; // Import your configured 'api' instance

export const getAllCategories = async () => {
    try {
        const response = await api.get('/categorias/selectAllCat');
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las categorias: " + (error.response?.data || error.message));
    }
};

export const getAllProducts = async () => {
    try {
        const response = await api.get('/productos/selectAllP');
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los productos: " + (error.response?.data || error.message));
    }
};

export const getAllProductsWithStock = async () => {
    try {
        const response = await api.get('/productos/selectAllPWithStock');
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los productos: " + (error.response?.data || error.message));
    }
};

export const searchProducts = async (params) => {
    try {
        const response = await api.get('/productos/searchP', { params });
        return response.data;
    } catch (error) {
        throw new Error("Error en la búsqueda de productos: " + (error.response?.data || error.message));
    }
};

// --- NUEVA FUNCIÓN PARA SUBIR IMAGEN ---
export const uploadProductImage = async (imageFile) => {
    try {
        // FormData es necesario para enviar archivos
        const formData = new FormData();
        // 'imagenProducto' debe coincidir con el nombre del campo en el middleware Multer (upload.single('imagenProducto'))
        formData.append('imagenProducto', imageFile);

        // Envía la solicitud POST al nuevo endpoint de subida de imágenes
        const response = await api.post('/productos/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Importante para enviar archivos
            }
        });
        return response.data.imageUrl; // Devuelve solo la URL de la imagen recibida del backend
    } catch (error) {
        throw new Error("Error al subir la imagen: " + (error.response?.data?.message || error.message));
    }
};

export const addProduct = async (product) => {
    try {
        // La URL de la imagen ya debe estar en 'product'
        await api.post('/productos/createP', product);
    } catch (error) {
        throw new Error("Error al ingresar el producto: " + (error.response?.data || error.message));
    }
};

export const editProduct = async (codigo, product) => {
    try {
        // La URL de la imagen ya debe estar en 'product'
        await api.put(`/productos/updateP/${codigo}`, product);
    } catch (error) {
        throw new Error("Error al actualizar el producto: " + (error.response?.data || error.message));
    }
};

export const editStockProduct = async (id, cantidad) => {
    try {
        await api.put(`/productos/updateStock/${id}`, cantidad);
    } catch (error) {
        throw new Error("Error al actualizar el stock del producto: " + (error.response?.data || error.message));
    }
};

export const removeProduct = async (codigo) => {
    try {
        await api.delete(`/productos/deleteP/${codigo}`);
    } catch (error) {
        throw new Error("Error al eliminar el producto: " + (error.response?.data || error.message));
    }
};