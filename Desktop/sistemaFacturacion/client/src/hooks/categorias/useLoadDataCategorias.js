// src/hooks/categorias/useLoadDataCategorias.js
import { useCallback } from "react";
import { getAllCategorias, searchCategorias } from "../../services/categoriaService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataCategoria = ({
  setListaCategorias,
  idCategoriaBusqueda,
  nombreCategoriaBusqueda,
  setIdCategoria,
  setCategoria,
  setEditarCategoria,
}) => {
  /**
   * Carga todas las categorías desde el servicio y actualiza el estado `listaCategorias`.
   */
  const loadCategorias = useCallback(async () => {
    try {
      const categorias = await getAllCategorias();
      setListaCategorias(categorias);
    } catch (error) {
      noti.fire({ icon: "error", title: "Error al cargar categorías", text: error.message });
      // *** CAPTURA Y REPORTE DE ERROR ***
      createError({
        mensajeError: "Error al cargar categorías",
        detalleError: error.message,
        pantallaOrigen: "Gestión de Categorías",
        eventoOrigen: "loadCategorias"
      });
    }
  }, [setListaCategorias]);

  /**
   * Realiza una búsqueda de categorías basada en los criterios de búsqueda actuales
   * y actualiza el estado `listaCategorias`.
   */
  const buscarCategorias = useCallback(async () => {
    // Validar si al menos un campo de búsqueda tiene valor antes de buscar
    if (
      !idCategoriaBusqueda &&
      !nombreCategoriaBusqueda
    ) {
      noti.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, ingrese al menos un dato para buscar.",
      });
      return;
    }

    const params = {
      ...(idCategoriaBusqueda && { id_categoria: idCategoriaBusqueda }),
      ...(nombreCategoriaBusqueda && { categoria: nombreCategoriaBusqueda }),
    };

    try {
      const categorias = await searchCategorias(params);
      if (categorias.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron categorías que coincidan con los criterios.",
        });
      } else {
        setListaCategorias(categorias);
      }
    } catch (error) {
      noti.fire({ icon: "error", title: "Error en la búsqueda", text: error.message });
      // *** CAPTURA Y REPORTE DE ERROR ***
      createError({
        mensajeError: "Error al buscar categorías",
        detalleError: error.message,
        pantallaOrigen: "Gestión de Categorías",
        eventoOrigen: "buscarCategorias"
      });
    }
  }, [
    idCategoriaBusqueda,
    nombreCategoriaBusqueda,
    setListaCategorias,
  ]);

  /**
   * Limpia todos los campos del formulario de creación/edición de categoría
   * y restablece el estado de edición.
   */
  const limpiarCampos = useCallback(() => {
    setIdCategoria("");
    setCategoria("");
    setEditarCategoria(false);
  }, [
    setIdCategoria,
    setCategoria,
    setEditarCategoria,
  ]);

  /**
   * Llena los campos del formulario con los datos de una categoría seleccionada para edición.
   * @param {Object} categoria - El objeto de la categoría a editar.
   */
  const llenarParaEditar = useCallback((categoriaData) => {
    setIdCategoria(categoriaData.id_categoria);
    setCategoria(categoriaData.categoria || ""); // Asegura que el nombre de categoría no sea undefined
    setEditarCategoria(true);
  }, [
    setIdCategoria,
    setCategoria,
    setEditarCategoria,
  ]);

  return {
    loadCategorias,
    buscarCategorias,
    limpiarCampos,
    llenarParaEditar,
  };
};
