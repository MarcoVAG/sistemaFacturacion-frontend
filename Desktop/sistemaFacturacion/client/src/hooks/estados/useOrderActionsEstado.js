// src/hooks/estados/useOrderActionsEstado.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateEstadoForm } from "../../validations/estadoValidation";
import {
  createState,
  updateState,
  deleteState,
} from "../../services/statesService"; // Importa las funciones del servicio de estados
import { createError } from "../../services/errorService"; // Importa el servicio de errores

const noti = withReactContent(Swal);

export const useOrderActionsEstado = ({
  id_estado, // Se usa para la edición
  estado, // Nombre del estado
  loadEstados, // Función para recargar la lista de estados
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
            mensajeError: error.message || "Error desconocido en la gestión de estados",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Estados",
            eventoOrigen: eventOrigin
        });
    }, []);

  /**
   * Añade un nuevo estado a la base de datos.
   */
  const add = useCallback(async () => {
    if (!validateEstadoForm(estado)) return;

    const newEstado = {
      estado,
    };

    try {
      await createState(newEstado);
      loadEstados(); // Recarga la lista de estados
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: <i>El estado <strong>{estado}</strong> fue registrado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "addEstado");
    }
  }, [estado, loadEstados, limpiarCampos, showError]);

  /**
   * Edita un estado existente en la base de datos.
   */
  const edit = useCallback(async () => {
    if (!validateEstadoForm(estado)) return;

    const updatedEstado = {
      estado,
    };

    try {
      await updateState(id_estado, updatedEstado); // Envía el ID y los datos actualizados
      loadEstados(); // Recarga la lista de estados
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Actualización exitosa!</strong>,
        html: <i>El estado <strong>{estado}</strong> fue actualizado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "editEstado");
    }
  }, [id_estado, estado, loadEstados, limpiarCampos, showError]);

  /**
   * Elimina un estado de la base de datos previa confirmación del usuario.
   * @param {number} estadoId - El ID del estado a eliminar.
   */
  const remove = useCallback(async (estadoId) => {
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
        await deleteState(estadoId);
        loadEstados(); // Recarga la lista de estados
        limpiarCampos(); // Limpia los campos por si el estado eliminado era el que se estaba editando
        noti.fire("Eliminado!", "El estado ha sido eliminado.", "success");
      } catch (error) {
        showError(error, "removeEstado");
      }
    }
  }, [loadEstados, limpiarCampos, showError]);

  return { add, edit, remove };
};
