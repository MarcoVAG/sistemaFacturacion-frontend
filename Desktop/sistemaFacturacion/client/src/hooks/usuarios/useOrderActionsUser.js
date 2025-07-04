// src/hooks/usuarios/useOrderActionsUser.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateUserForm, validateUserUpdateForm, validatePasswordChangeForm } from "../../validations/userValidation";
import {
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    toggleUserEnabledStatus,
} from "../../services/userService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores

const noti = withReactContent(Swal);

export const useOrderActionsUser = ({
    id_usuario,
    correo_electronico,
    password_hash,
    habilitado,
    failed_login_attempts,
    id_rol,
    loadUsers,
    limpiarCampos,
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
     * Añade un nuevo usuario a la base de datos.
     */
    const add = useCallback(async () => {
        if (!validateUserForm(correo_electronico, password_hash, id_rol)) return;

        const newUser = {
            correo_electronico,
            password_hash,
            habilitado: true,
            failed_login_attempts: 0,
            id_rol: parseInt(id_rol, 10),
        };

        try {
            await createUser(newUser);
            loadUsers();
            limpiarCampos();
            noti.fire({
                title: <strong>Registro exitoso!</strong>,
                html: <i>El usuario <strong>{correo_electronico}</strong> fue registrado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "addUser");
        }
    }, [correo_electronico, password_hash, id_rol, loadUsers, limpiarCampos, showError]);

    /**
     * Edita un usuario existente en la base de datos (excluye contraseña).
     */
    const edit = useCallback(async () => {
        if (!validateUserUpdateForm(correo_electronico, id_rol)) return;

        const updatedUserData = {
            correo_electronico,
            habilitado,
            id_rol: parseInt(id_rol, 10),
        };

        try {
            await updateUser(id_usuario, updatedUserData);
            loadUsers();
            limpiarCampos();
            noti.fire({
                title: <strong>Actualización exitosa!</strong>,
                html: <i>El usuario <strong>{correo_electronico}</strong> fue actualizado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "editUser");
        }
    }, [id_usuario, correo_electronico, habilitado, id_rol, loadUsers, limpiarCampos, showError]);

    /**
     * Actualiza solo la contraseña de un usuario.
     * @param {string} newPassword - La nueva contraseña en texto plano para hashear y actualizar.
     */
    const updatePassword = useCallback(async (newPassword) => {
        if (!validatePasswordChangeForm(newPassword)) return;

        try {
            await updateUserPassword(id_usuario, newPassword);
            noti.fire({
                title: <strong>Contraseña actualizada!</strong>,
                html: <i>La contraseña del usuario <strong>{correo_electronico}</strong> ha sido actualizada.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "updatePassword");
        }
    }, [id_usuario, correo_electronico, showError]);


    /**
     * Cambia el estado de habilitado/deshabilitado de un usuario.
     * @param {number} userId - El ID del usuario a modificar.
     * @param {boolean} currentStatus - El estado actual del usuario (true/false).
     */
    const toggleStatus = useCallback(async (userId, currentStatus) => {
        const newStatus = !currentStatus;
        const actionText = newStatus ? 'habilitar' : 'deshabilitar';
        const result = await noti.fire({
            title: "¿Estás seguro?",
            text: `¿Deseas ${actionText} a este usuario?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Sí, ${actionText}!`,
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await toggleUserEnabledStatus(userId, newStatus);
                loadUsers();
                noti.fire("¡Hecho!", `El usuario ha sido ${actionText === 'habilitar' ? 'habilitado' : 'deshabilitado'}.`, "success");
            } catch (error) {
                showError(error, "toggleUserStatus");
            }
        }
    }, [loadUsers, showError]);

    /**
     * Elimina un usuario de la base de datos previa confirmación.
     */
    const remove = useCallback(async (userId) => {
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
                await deleteUser(userId);
                loadUsers();
                limpiarCampos();
                noti.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
            } catch (error) {
                showError(error, "removeUser");
            }
        }
    }, [loadUsers, limpiarCampos, showError]);

    return { add, edit, remove, updatePassword, toggleStatus };
};
