// src/hooks/roles/useOrderActionsRol.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateRoleForm } from "../../validations/roleValidation";
import {
  createRole,
  updateRole,
  deleteRole,
} from "../../services/roleService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores

const noti = withReactContent(Swal);

export const useOrderActionsRol = ({
  id_rol, // Se usa para la edición
  nombre_rol,
  descripcion,
  loadRoles, // Función para recargar la lista de roles
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
            mensajeError: error.message || "Error desconocido en la gestión de roles",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Roles",
            eventoOrigen: eventOrigin
        });
    }, []);

  /**
   * Añade un nuevo rol a la base de datos.
   */
  const add = useCallback(async () => {
    if (!validateRoleForm(nombre_rol, descripcion)) return;

    const newRole = {
      nombre_rol,
      descripcion,
    };

    try {
      await createRole(newRole);
      loadRoles(); // Recarga la lista de roles
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: <i>El rol <strong>{nombre_rol}</strong> fue registrado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "addRole");
    }
  }, [nombre_rol, descripcion, loadRoles, limpiarCampos, showError]);

  /**
   * Edita un rol existente en la base de datos.
   */
  const edit = useCallback(async () => {
    if (!validateRoleForm(nombre_rol, descripcion)) return;

    const updatedRole = {
      nombre_rol,
      descripcion,
    };

    try {
      await updateRole(id_rol, updatedRole); // Envía el ID y los datos actualizados
      loadRoles(); // Recarga la lista de roles
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Actualización exitosa!</strong>,
        html: <i>El rol <strong>{nombre_rol}</strong> fue actualizado con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      showError(error, "editRole");
    }
  }, [id_rol, nombre_rol, descripcion, loadRoles, limpiarCampos, showError]);

  /**
   * Elimina un rol de la base de datos previa confirmación del usuario.
   * @param {number} rolId - El ID del rol a eliminar.
   */
  const remove = useCallback(async (rolId) => {
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
        await deleteRole(rolId);
        loadRoles(); // Recarga la lista de roles
        limpiarCampos(); // Limpia los campos por si el rol eliminado era el que se estaba editando
        noti.fire("Eliminado!", "El rol ha sido eliminado.", "success");
      } catch (error) {
        showError(error, "removeRole");
      }
    }
  }, [loadRoles, limpiarCampos, showError]);

  return { add, edit, remove };
};
