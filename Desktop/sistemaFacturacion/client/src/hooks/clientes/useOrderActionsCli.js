//src/hooks/clientes/useOrderActionsCli
import { useCallback } from "react";
import { createClient, editClient, removeClient } from "../../services/clientService";
import { validateForm } from "../../validations/clientValidations";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useOrderActionsCli = ({ loadClients, limpiarCampos }) => {
    const showError = useCallback((error, eventOrigin = "Desconocido") => {
        noti.fire({
            icon: "error",
            title: "Ups...",
            text: error.message,
        });
        // *** CAPTURA Y REPORTE DE ERROR ***
        createError({
            mensajeError: error.message,
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Clientes",
            eventoOrigen: eventOrigin
        });
    }, []);

    const add = useCallback(async (formData) => {
        if (!validateForm(...Object.values(formData))) return;

        try {
            await createClient(formData);
            await loadClients();
            limpiarCampos();
            noti.fire({
                title: <strong>Registro exitoso!</strong>,
                html: <i>El cliente <strong>{formData.cedula}</strong> fue registrado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "addClient");
        }
    }, [loadClients, limpiarCampos, showError]);

    const edit = useCallback(async (cedula, formData) => {
        if (!validateForm(cedula, ...Object.values(formData))) return;

        try {
            await editClient(cedula, formData);
            await loadClients();
            limpiarCampos();
            noti.fire({
                title: <strong>Actualización exitosa!</strong>,
                html: <i>El cliente <strong>{cedula}</strong> fue actualizado con éxito.</i>,
                icon: "success",
            });
        } catch (error) {
            showError(error, "editClient");
        }
    }, [loadClients, limpiarCampos, showError]);

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
                await removeClient(cedula);
                await loadClients();
                limpiarCampos();
                noti.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
            } catch (error) {
                showError(error, "removeClient");
            }
        }
    }, [loadClients, limpiarCampos, showError]);

    return { add, edit, remove };
};
