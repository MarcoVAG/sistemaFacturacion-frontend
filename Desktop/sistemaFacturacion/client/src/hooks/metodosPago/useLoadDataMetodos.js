// src/hooks/metodosPago/useLoadDataMetodos.js
import { useCallback } from "react";
import { getAllMethods, searchMethods } from "../../services/methodsService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataMetodos = ({
  setListaMetodos,
  terminoBusqueda,
  setIdMetodoPago,
  setMetodo,
  setEditarMetodo,
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
            mensajeError: error.message || "Error desconocido en la gestión de métodos de pago",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Métodos de Pago",
            eventoOrigen: eventOrigin
        });
    }, []);

  /**
   * Carga todos los métodos de pago desde el servicio y actualiza el estado `listaMetodos`.
   */
  const loadMetodos = useCallback(async () => {
    try {
      const metodos = await getAllMethods();
      setListaMetodos(metodos);
    } catch (error) {
      showError(error, "loadMetodos");
    }
  }, [setListaMetodos, showError]);

  /**
   * Realiza una búsqueda de métodos de pago basada en el término de búsqueda actual
   * y actualiza el estado `listaMetodos`.
   */
  const buscarMetodos = useCallback(async () => {
    // Si el término de búsqueda está vacío, no hacemos la búsqueda, se espera que loadMetodos se encargue
    if (terminoBusqueda.trim() === "") {
      return;
    }

    try {
      const metodos = await searchMethods(terminoBusqueda);
      if (metodos.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron métodos de pago que coincidan con el criterio.",
        });
      }
      setListaMetodos(metodos);
    } catch (error) {
      showError(error, "buscarMetodos");
    }
  }, [
    terminoBusqueda,
    setListaMetodos,
    showError
  ]);

  /**
   * Limpia todos los campos del formulario de creación/edición de método de pago
   * y restablece el estado de edición.
   */
  const limpiarCampos = useCallback(() => {
    setIdMetodoPago("");
    setMetodo("");
    setEditarMetodo(false);
  }, [
    setIdMetodoPago,
    setMetodo,
    setEditarMetodo,
  ]);

  /**
   * Llena los campos del formulario con los datos de un método de pago seleccionado para edición.
   * @param {Object} metodoData - El objeto del método de pago a editar.
   */
  const llenarParaEditar = useCallback((metodoData) => {
    setIdMetodoPago(metodoData.id_metodoPago);
    setMetodo(metodoData.metodo || ""); // Asegura que el nombre del método no sea undefined
    setEditarMetodo(true);
  }, [
    setIdMetodoPago,
    setMetodo,
    setEditarMetodo,
  ]);

  return {
    loadMetodos,
    buscarMetodos,
    limpiarCampos,
    llenarParaEditar,
  };
};
