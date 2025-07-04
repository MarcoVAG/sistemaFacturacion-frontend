// src/hooks/metodosPago/useOrderActionsMetodos.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateMetodoPagoForm } from "../../validations/metodoPagoValidation";
import {
  createMethod,
  updateMethod,
  deleteMethod,
} from "../../services/methodsService"; // Importa las funciones del servicio de métodos de pago
import { createError } from "../../services/errorService"; // Importa el servicio de errores

const noti = withReactContent(Swal);

export const useOrderActionsMetodos = ({
  id_metodoPago, // Se usa para la edición
  metodo, // Nombre del método de pago
  loadMetodos, // Función para recargar la lista de métodos de pago
  limpiarCampos, // Función para limpiar el formulario
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
   * Añade un nuevo método de pago a la base de datos.
   */
  const add = useCallback(async () => {
    if (!validateMetodoPagoForm(metodo)) return;

    const newMetodo = {
      metodo,
    };

    try {
      await createMethod(newMetodo);
      loadMetodos(); // Recarga la lista de métodos de pago
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: <i>El método de pago <strong>{metodo}</strong> fue registrado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "addMetodoPago");
    }
  }, [metodo, loadMetodos, limpiarCampos, showError]);

  /**
   * Edita un método de pago existente en la base de datos.
   */
  const edit = useCallback(async () => {
    if (!validateMetodoPagoForm(metodo)) return;

    const updatedMetodo = {
      metodo,
    };

    try {
      await updateMethod(id_metodoPago, updatedMetodo); // Envía el ID y los datos actualizados
      loadMetodos(); // Recarga la lista de métodos de pago
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Actualización exitosa!</strong>,
        html: <i>El método de pago <strong>{metodo}</strong> fue actualizado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "editMetodoPago");
    }
  }, [id_metodoPago, metodo, loadMetodos, limpiarCampos, showError]);

  /**
   * Elimina un método de pago de la base de datos previa confirmación del usuario.
   * @param {number} metodoId - El ID del método de pago a eliminar.
   */
  const remove = useCallback(async (metodoId) => {
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
        await deleteMethod(metodoId);
        loadMetodos(); // Recarga la lista de métodos de pago
        limpiarCampos(); // Limpia los campos por si el método eliminado era el que se estaba editando
        noti.fire("Eliminado!", "El método de pago ha sido eliminado.", "success");
      } catch (error) {
        showError(error, "removeMetodoPago");
      }
    }
  }, [loadMetodos, limpiarCampos, showError]);

  return { add, edit, remove };
};
