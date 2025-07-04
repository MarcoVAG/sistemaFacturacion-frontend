// src/hooks/empleados/useLoadDataEmp.js
import { useCallback } from "react";
import { getAllEmployees, searchEmployees } from "../../services/employeeService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataEmp = ({
    setListaEmpleados,
    setCedula,
    setNombre1,
    setNombre2,
    setApellido1,
    setApellido2,
    setTelefono,
    setDireccion,
    setCedulaBusqueda,
    setNombre1Busqueda,
    setNombre2Busqueda,
    setApellido1Busqueda,
    setApellido2Busqueda,
    setTelefonoBusqueda,
    setDireccionBusqueda,
    setEditarEmpleado,
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
            mensajeError: error.message || "Error desconocido en la gestión de empleados",
            detalleError: error.stack,
            pantallaOrigen: "Gestión de Empleados",
            eventoOrigen: eventOrigin
        });
    }, []);

    const loadEmployees = useCallback(async () => {
        try {
            const empleados = await getAllEmployees();
            setListaEmpleados(empleados);
        } catch (error) {
            showError(error, "loadEmployees");
        }
    }, [setListaEmpleados, showError]);

    const buscarEmpleados = useCallback(async (params) => {
        const hayDatos = Object.values(params).some(
            (v) => v && String(v).trim() !== ""
        );

        if (!hayDatos) {
            noti.fire({
                icon: "warning",
                title: "Campo vacío",
                text: "Ingrese al menos un campo para buscar.",
            });
            return;
        }

        try {
            const empleados = await searchEmployees(params);
            if (empleados.length === 0) {
                noti.fire({
                    icon: "info",
                    title: "Sin resultados",
                    text: "No se encontró ningún empleado que coincida con los criterios.",
                });
                setListaEmpleados([]);
            } else {
                setListaEmpleados(empleados);
            }
        } catch (error) {
            console.error("Error al buscar empleados:", error);
            showError(error, "buscarEmpleados");
        }
    }, [setListaEmpleados, showError]);

    const limpiarCampos = useCallback(() => {
        setCedula("");
        setNombre1("");
        setNombre2("");
        setApellido1("");
        setApellido2("");
        setTelefono("");
        setDireccion("");

        setCedulaBusqueda("");
        setNombre1Busqueda("");
        setNombre2Busqueda("");
        setApellido1Busqueda("");
        setApellido2Busqueda("");
        setTelefonoBusqueda("");
        setDireccionBusqueda("");

        setEditarEmpleado(false);
    }, [
        setCedula,
        setNombre1,
        setNombre2,
        setApellido1,
        setApellido2,
        setTelefono,
        setDireccion,
        setCedulaBusqueda,
        setNombre1Busqueda,
        setNombre2Busqueda,
        setApellido1Busqueda,
        setApellido2Busqueda,
        setTelefonoBusqueda,
        setDireccionBusqueda,
        setEditarEmpleado,
    ]);

    const llenarParaEditar = useCallback((emp) => {
        setCedula(emp.cedula);
        setNombre1(emp.nombre1);
        setNombre2(emp.nombre2);
        setApellido1(emp.apellido1);
        setApellido2(emp.apellido2);
        setTelefono(emp.telefono);
        setDireccion(emp.direccion);
        setEditarEmpleado(true);
    }, [
        setCedula,
        setNombre1,
        setNombre2,
        setApellido1,
        setApellido2,
        setTelefono,
        setDireccion,
        setEditarEmpleado,
    ]);

    return {
        loadEmployees,
        buscarEmpleados,
        limpiarCampos,
        llenarParaEditar,
    };
};
