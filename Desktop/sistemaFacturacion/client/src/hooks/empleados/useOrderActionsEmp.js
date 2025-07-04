// src/hooks/empleados/useOrderActionsEmp.js
import { useCallback } from "react";
import { createEmployee, updateEmployee, deleteEmployee } from "../../services/employeeService";
import { validateForm } from "../../validations/employeeValidation";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useOrderActionsEmp = ({ loadEmployees, limpiarCampos }) => {
  const showError = useCallback((error, eventOrigin = "Desconocido") => {
    noti.fire({
      icon: "error",
      title: "Ups...",
      text: error.message || "Ocurrió un error inesperado.",
    });
    // *** CAPTURA Y REPORTE DE ERROR ***
    createError({
      mensajeError: error.message || "Error desconocido en la gestión de empleados",
      detalleError: error.stack,
      pantallaOrigen: "Gestión de Empleados",
      eventoOrigen: eventOrigin
    });
  }, []);

  const add = useCallback(async (formData) => {
    if (!formData.id_usuario) {
      noti.fire({
        icon: "warning",
        title: "ID de Usuario Requerido",
        text: "Por favor, crea un usuario antes de registrar el empleado.",
      });
      return;
    }

    try {
      await createEmployee(formData);
      await loadEmployees();
      limpiarCampos();
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: (
          <i>
            El empleado <strong>{formData.cedula}</strong> fue registrado con
            éxito y vinculado al usuario.
          </i>
        ),
        icon: "success",
      });
    } catch (error) {
      showError(error, "addEmployee");
    }
  }, [loadEmployees, limpiarCampos, showError]);

  const edit = useCallback(async (cedula, formData) => {
    if (!validateForm(formData)) {
      noti.fire({
          icon: "warning",
          title: "Campos Incompletos",
          text: "Por favor, completa todos los campos requeridos del empleado."
      });
      return;
    }

    try {
      await updateEmployee(cedula, formData);
      await loadEmployees();
      limpiarCampos();
      noti.fire({
        title: <strong>Actualización exitosa!</strong>,
        html: (
          <i>
            El empleado <strong>{cedula}</strong> fue actualizado con éxito.
          </i>
        ),
        icon: "success",
      });
    } catch (error) {
      showError(error, "editEmployee");
    }
  }, [loadEmployees, limpiarCampos, showError]);

  const remove = useCallback(async (cedula) => {
    const result = await noti.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(cedula);
        await loadEmployees();
        limpiarCampos();
        noti.fire("Eliminado!", "El empleado ha sido eliminado.", "success");
      } catch (error) {
        showError(error, "removeEmployee");
      }
    }
  }, [loadEmployees, limpiarCampos, showError]);

  return { add, edit, remove };
};
