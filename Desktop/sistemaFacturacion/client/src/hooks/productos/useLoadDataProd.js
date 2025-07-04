// /hooks/productos/useLoadDataProd.js

import { useCallback } from "react";
import { getAllProducts, getAllCategories, searchProducts } from "../../services/productService";
import { createError } from "../../services/errorService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataProd = ({
    setListaProductos,
    setListaCategorias,
    codigoBusqueda,
    productoBusqueda,
    precioBusqueda,
    stockBusqueda,
    categoriaBusqueda,
    imagenUrlBusqueda, // --- NUEVO: Parámetro para búsqueda de imagenUrl ---
    setCodigo,
    setProducto,
    setPrecioUnitario,
    setStock,
    setIdCategoria,
    setImagenUrl, // --- NUEVO: Setter para el estado de imagenUrl ---
    setEditarProducto,
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

    const loadProducts = useCallback(async () => {
        try {
            const productos = await getAllProducts();
            setListaProductos(productos);
        } catch (error) {
            showError(error, "loadProducts");
        }
    }, [setListaProductos, showError]);

    const loadCategories = useCallback(async () => {
        try {
            const categorias = await getAllCategories();
            setListaCategorias(categorias);
        } catch (error) {
            showError(error, "loadCategories");
        }
    }, [setListaCategorias, showError]);

    const buscarProductos = useCallback(async () => {
        if (
            !codigoBusqueda &&
            !productoBusqueda &&
            !precioBusqueda &&
            !stockBusqueda &&
            !categoriaBusqueda &&
            !imagenUrlBusqueda // --- NUEVO: Incluir imagenUrlBusqueda en la validación ---
        ) {
            noti.fire({
                icon: "warning",
                title: "Campos vacíos",
                text: "Por favor, ingrese al menos un dato para buscar.",
            });
            return;
        }

        const params = {
            ...(codigoBusqueda && { codigo: codigoBusqueda }),
            ...(productoBusqueda && { producto: productoBusqueda }),
            ...(precioBusqueda && { precioUnitario: precioBusqueda }),
            ...(stockBusqueda && { stock: stockBusqueda }),
            ...(categoriaBusqueda && { id_categoria_producto: categoriaBusqueda }),
            ...(imagenUrlBusqueda && { imagenUrl: imagenUrlBusqueda }), // --- NUEVO: Incluir imagenUrl en los parámetros de búsqueda ---
        };

        try {
            const productos = await searchProducts(params);
            if (productos.length === 0) {
                noti.fire({
                    icon: "info",
                    title: "Sin resultados",
                    text: "No se encontraron productos que coincidan con los criterios.",
                });
            } else {
                setListaProductos(productos);
            }
        } catch (error) {
            showError(error, "buscarProductos");
        }
    }, [
        codigoBusqueda,
        productoBusqueda,
        precioBusqueda,
        stockBusqueda,
        categoriaBusqueda,
        imagenUrlBusqueda, // --- NUEVO: Dependencia para imagenUrlBusqueda ---
        setListaProductos,
        showError
    ]);

    const limpiarCampos = useCallback(() => {
        setCodigo("");
        setProducto("");
        setPrecioUnitario("");
        setStock("");
        setIdCategoria("");
        setImagenUrl(""); // --- NUEVO: Limpiar imagenUrl ---
        setEditarProducto(false);
    }, [
        setCodigo,
        setProducto,
        setPrecioUnitario,
        setStock,
        setIdCategoria,
        setImagenUrl, // --- NUEVO: Dependencia para setImagenUrl ---
        setEditarProducto,
    ]);

    const llenarParaEditar = useCallback((val) => {
        setCodigo(val.codigo);
        setProducto(val.producto);
        setPrecioUnitario(val.precioUnitario);
        setStock(val.stock);
        setIdCategoria(val.id_categoria_producto);
        setImagenUrl(val.imagenUrl || ""); // --- NUEVO: Llenar imagenUrl, asegurando un string vacío si es null/undefined ---
        setEditarProducto(true);
    }, [
        setCodigo,
        setProducto,
        setPrecioUnitario,
        setStock,
        setIdCategoria,
        setImagenUrl, // --- NUEVO: Dependencia para setImagenUrl ---
        setEditarProducto,
    ]);

    return {
        loadProducts,
        loadCategories,
        buscarProductos,
        limpiarCampos,
        llenarParaEditar,
    };
};