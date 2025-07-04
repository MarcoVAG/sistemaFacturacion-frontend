// src/hooks/estados/useLoadDataEstado.js
import { useCallback } from "react";
import { getAllStates, searchStates } from "../../services/statesService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataEstado = ({
  setListaEstados,
  terminoBusqueda,
  setIdEstado,
  setEstado,
  setEditarEstado,
}) => {
    // Función auxiliar para mostrar y reportar errores
    const showError = useCallback((error, eventOrigin = "Desconocido") => {
        noti.fire({
            icon: "error",
            title: "Ups...",
            text: error.message || "Ocurrió un error inesperado.",
        });
        // *** CAPTURA Y REPORTE DE ERROR ***
        createError({
            mensajeError: error.message || "Error desconocido en la gestión de estados",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Estados",
            eventoOrigen: eventOrigin
        });
    }, []);

  /**
   * Carga todos los estados desde el servicio y actualiza el estado `listaEstados`.
   */
  const loadEstados = useCallback(async () => {
    try {
      const estados = await getAllStates();
      setListaEstados(estados);
    } catch (error) {
      showError(error, "loadEstados");
    }
  }, [setListaEstados, showError]);

  /**
   * Realiza una búsqueda de estados basada en el término de búsqueda actual
   * y actualiza el estado `listaEstados`.
   */
  const buscarEstados = useCallback(async () => {
    // Si el término de búsqueda está vacío, no hacemos la búsqueda, se espera que loadEstados se encargue
    if (terminoBusqueda.trim() === "") {
      return;
    }

    try {
      const estados = await searchStates(terminoBusqueda);
      if (estados.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron estados que coincidan con el criterio.",
        });
      }
      setListaEstados(estados);
    } catch (error) {
      showError(error, "buscarEstados");
    }
  }, [
    terminoBusqueda,
    setListaEstados,
    showError
  ]);

  /**
   * Limpia todos los campos del formulario de creación/edición de estado
   * y restablece el estado de edición.
   */
  const limpiarCampos = useCallback(() => {
    setIdEstado("");
    setEstado("");
    setEditarEstado(false);
  }, [
    setIdEstado,
    setEstado,
    setEditarEstado,
  ]);

  /**
   * Llena los campos del formulario con los datos de un estado seleccionado para edición.
   * @param {Object} estadoData - El objeto del estado a editar.
   */
  const llenarParaEditar = useCallback((estadoData) => {
    setIdEstado(estadoData.id_estado);
    setEstado(estadoData.estado || ""); // Asegura que el nombre del estado no sea undefined
    setEditarEstado(true);
  }, [
    setIdEstado,
    setEstado,
    setEditarEstado,
  ]);

  return {
    loadEstados,
    buscarEstados,
    limpiarCampos,
    llenarParaEditar,
  };
};
