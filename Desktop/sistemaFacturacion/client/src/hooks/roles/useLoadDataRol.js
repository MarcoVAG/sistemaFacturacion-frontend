// src/hooks/roles/useLoadDataRol.js
import { useCallback } from "react";
import { getAllRoles, searchRoles } from "../../services/roleService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataRol = ({
  setListaRoles,
  idRolBusqueda,
  nombreRolBusqueda,
  descripcionBusqueda,
  setIdRol,
  setNombreRol,
  setDescripcion,
  setEditarRol,
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
   * Carga todos los roles desde el servicio y actualiza el estado `listaRoles`.
   */
  const loadRoles = useCallback(async () => {
    try {
      const roles = await getAllRoles();
      setListaRoles(roles);
    } catch (error) {
      showError(error, "loadRoles");
    }
  }, [setListaRoles, showError]);

  /**
   * Realiza una búsqueda de roles basada en los criterios de búsqueda actuales
   * y actualiza el estado `listaRoles`.
   */
  const buscarRoles = useCallback(async () => {
    // Validar si al menos un campo de búsqueda tiene valor antes de buscar
    if (
      !idRolBusqueda &&
      !nombreRolBusqueda &&
      !descripcionBusqueda
    ) {
      noti.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, ingrese al menos un dato para buscar.",
      });
      return;
    }

    const params = {
      ...(idRolBusqueda && { id_rol: idRolBusqueda }),
      ...(nombreRolBusqueda && { nombre_rol: nombreRolBusqueda }),
      ...(descripcionBusqueda && { descripcion: descripcionBusqueda }),
    };

    try {
      const roles = await searchRoles(params);
      if (roles.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron roles que coincidan con los criterios.",
        });
      } else {
        setListaRoles(roles);
      }
    } catch (error) {
      showError(error, "buscarRoles");
    }
  }, [
    idRolBusqueda,
    nombreRolBusqueda,
    descripcionBusqueda,
    setListaRoles,
    showError
  ]);

  /**
   * Limpia todos los campos del formulario de creación/edición de rol
   * y restablece el estado de edición.
   */
  const limpiarCampos = useCallback(() => {
    setIdRol("");
    setNombreRol("");
    setDescripcion("");
    setEditarRol(false);
  }, [
    setIdRol,
    setNombreRol,
    setDescripcion,
    setEditarRol,
  ]);

  /**
   * Llena los campos del formulario con los datos de un rol seleccionado para edición.
   * @param {Object} rol - El objeto del rol a editar.
   */
  const llenarParaEditar = useCallback((rol) => {
    setIdRol(rol.id_rol);
    setNombreRol(rol.nombre_rol);
    setDescripcion(rol.descripcion || ""); // Asegura que la descripción no sea undefined
    setEditarRol(true);
  }, [
    setIdRol,
    setNombreRol,
    setDescripcion,
    setEditarRol,
  ]);

  return {
    loadRoles,
    buscarRoles,
    limpiarCampos,
    llenarParaEditar,
  };
};
