// src/hooks/usuarios/useLoadDataUser.js
import { useCallback } from "react";
import { getAllUsers, searchUsers } from "../../services/userService";
import { getAllRoles } from "../../services/roleService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataUser = ({
  setListaUsuarios,
  setListaRoles,
  idUsuarioBusqueda,
  correoElectronicoBusqueda,
  habilitadoBusqueda,
  rolBusqueda,
  failedLoginAttemptsBusqueda,
  fechaCreacionBusqueda,
  setIdUsuario,
  setCorreoElectronico,
  setHabilitado,
  setFailedLoginAttempts,
  setIdRol,
  setEditarUsuario,
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
            mensajeError: error.message || "Error desconocido en la gestión de usuarios",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Usuarios",
            eventoOrigen: eventOrigin
        });
    }, []);

  /**
   * Carga todos los usuarios desde el servicio y actualiza el estado `listaUsuarios`.
   */
  const loadUsers = useCallback(async () => {
    try {
      const users = await getAllUsers();
      setListaUsuarios(users);
    } catch (error) {
      showError(error, "loadUsers");
    }
  }, [setListaUsuarios, showError]);

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
   * Realiza una búsqueda de usuarios basada en los criterios de búsqueda actuales
   * y actualiza el estado `listaUsuarios`.
   */
  const buscarUsuarios = useCallback(async () => {
    // Validar si al menos un campo de búsqueda tiene valor antes de buscar
    if (
      !idUsuarioBusqueda &&
      !correoElectronicoBusqueda &&
      habilitadoBusqueda === "" &&
      !rolBusqueda &&
      failedLoginAttemptsBusqueda === "" &&
      !fechaCreacionBusqueda
    ) {
      noti.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, ingrese al menos un dato para buscar.",
      });
      return;
    }

    const params = {
      ...(idUsuarioBusqueda && { id_usuario: idUsuarioBusqueda }),
      ...(correoElectronicoBusqueda && { correo_electronico: correoElectronicoBusqueda }),
      ...(habilitadoBusqueda !== "" && { habilitado: habilitadoBusqueda === 'true' }),
      ...(rolBusqueda && { id_rol: rolBusqueda }),
      ...(failedLoginAttemptsBusqueda !== "" && { failed_login_attempts: parseInt(failedLoginAttemptsBusqueda, 10) }),
      ...(fechaCreacionBusqueda && { fecha_creacion_desde: fechaCreacionBusqueda }),
    };

    try {
      const users = await searchUsers(params);
      if (users.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron usuarios que coincidan con los criterios.",
        });
      } else {
        setListaUsuarios(users);
      }
    } catch (error) {
      showError(error, "buscarUsuarios");
    }
  }, [
    idUsuarioBusqueda,
    correoElectronicoBusqueda,
    habilitadoBusqueda,
    rolBusqueda,
    failedLoginAttemptsBusqueda,
    fechaCreacionBusqueda,
    setListaUsuarios,
    showError
  ]);

  /**
   * Limpia todos los campos del formulario de creación/edición de usuario
   * y restablece el estado de edición.
   */
  const limpiarCampos = useCallback(() => {
    setIdUsuario("");
    setCorreoElectronico("");
    setHabilitado(true);
    setFailedLoginAttempts(0);
    setIdRol("");
    setEditarUsuario(false);
  }, [
    setIdUsuario,
    setCorreoElectronico,
    setHabilitado,
    setFailedLoginAttempts,
    setIdRol,
    setEditarUsuario,
  ]);

  /**
   * Llena los campos del formulario con los datos de un usuario seleccionado para edición.
   * @param {Object} user - El objeto del usuario a editar.
   */
  const llenarParaEditar = useCallback((user) => {
    setIdUsuario(user.id_usuario);
    setCorreoElectronico(user.correo_electronico);
    setHabilitado(user.habilitado);
    setFailedLoginAttempts(user.failed_login_attempts);
    setIdRol(user.id_rol);
    setEditarUsuario(true);
  }, [
    setIdUsuario,
    setCorreoElectronico,
    setHabilitado,
    setFailedLoginAttempts,
    setIdRol,
    setEditarUsuario,
  ]);

  return {
    loadUsers,
    loadRoles,
    buscarUsuarios,
    limpiarCampos,
    llenarParaEditar,
  };
};
