// src/hooks/productos/useOrderActionsProd.js

import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateForm } from "../../validations/productValidations";
import {
    addProduct,
    editProduct,
    removeProduct,
    uploadProductImage,
} from "../../services/productService";
import { createError } from "../../services/errorService";

const noti = withReactContent(Swal);

export const useOrderActionsProd = ({
    codigo,
    producto,
    precioUnitario,
    stock,
    id_categoria_producto,
    imagenUrl,
    fileToUpload,
    setImagenUrl, // <--- AHORA SÍ RECIBIMOS EL SETTER
    loadProducts,
    limpiarCampos,
}) => {
    const showError = useCallback((error, eventOrigin = "Desconocido") => {
        noti.fire({
            icon: "error",
            title: "Ups...",
            text: error.message || "Ocurrió un error inesperado.",
        });
        createError({
            mensajeError: error.message || "Error desconocido en la gestión de productos",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Productos",
            eventoOrigen: eventOrigin
        });
    }, []);

    const handleImageUpload = useCallback(async () => {
        if (fileToUpload) {
            try {
                const uploadedUrl = await uploadProductImage(fileToUpload);
                setImagenUrl(uploadedUrl); // <--- AQUI ES DONDE SE ACTUALIZA EL ESTADO IMAGENURL EN GUI_PRODUCTOS
                return uploadedUrl; // Devolvemos la URL para que 'add' o 'edit' la usen inmediatamente
            } catch (error) {
                showError(error, "uploadProductImage");
                throw error; // Propaga el error para detener la operación principal
            }
        }
        return imagenUrl; // Si no hay nuevo archivo, devuelve la URL existente
    }, [fileToUpload, imagenUrl, setImagenUrl, showError]); // ¡Añadir setImagenUrl a las dependencias!

    const add = useCallback(async () => {
        if (!validateForm(codigo, producto, precioUnitario, stock, id_categoria_producto)) return;

        let finalImageUrl = imagenUrl;
        try {
            finalImageUrl = await handleImageUpload(); // Esto también actualiza `imagenUrl` en gui_productos
        } catch (error) {
            return;
        }

        const newProduct = {
            codigo,
            producto,
            precioUnitario,
            stock: parseInt(stock),
            id_categoria_producto: parseInt(id_categoria_producto),
            imagenUrl: finalImageUrl,
        };

        try {
            await addProduct(newProduct);
            loadProducts();
            limpiarCampos();
            noti.fire({
                title: <strong>Registro exitoso!</strong>,
                html: <i>El producto <strong>{codigo}</strong> fue registrado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "addProduct");
        }
    }, [codigo, producto, precioUnitario, stock, id_categoria_producto, imagenUrl, fileToUpload, loadProducts, limpiarCampos, showError, handleImageUpload]); // Manten imagenUrl y fileToUpload en las dependencias para que `handleImageUpload` las use.

    const edit = useCallback(async () => {
        if (!validateForm(codigo, producto, precioUnitario, stock, id_categoria_producto)) return;

        let finalImageUrl = imagenUrl;
        try {
            finalImageUrl = await handleImageUpload(); // Esto también actualiza `imagenUrl` en gui_productos
        } catch (error) {
            return;
        }

        const updatedProduct = {
            producto,
            precioUnitario,
            stock: parseInt(stock),
            id_categoria_producto: parseInt(id_categoria_producto),
            imagenUrl: finalImageUrl,
        };

        try {
            await editProduct(codigo, updatedProduct);
            loadProducts();
            limpiarCampos();
            noti.fire({
                title: <strong>Actualización exitosa!</strong>,
                html: <i>El producto <strong>{codigo}</strong> fue actualizado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "editProduct");
        }
    }, [codigo, producto, precioUnitario, stock, id_categoria_producto, imagenUrl, fileToUpload, loadProducts, limpiarCampos, showError, handleImageUpload]); // Manten imagenUrl y fileToUpload en las dependencias.

    const remove = useCallback(async (codigo) => {
        const result = await noti.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await removeProduct(codigo);
                loadProducts();
                limpiarCampos();
                noti.fire("Eliminado!", "El producto ha sido eliminado.", "success");
            } catch (error) {
                showError(error, "removeProduct");
            }
        }
    }, [loadProducts, limpiarCampos, showError]);

    return { add, edit, remove };
};