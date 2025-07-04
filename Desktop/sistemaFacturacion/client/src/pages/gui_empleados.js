// src/pages/gui_empleados.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmpleadoForm from "../components/empleados/employeeForm";
import SearchFormEmp from "../components/empleados/searchFormEmp";
import EmpleadoTable from "../components/empleados/employeeTableCrud";
import UserCreationModal from "../components/empleados/userCreationModal";

import { useLoadDataEmp } from "../hooks/empleados/useLoadDataEmp";
import { useOrderActionsEmp } from "../hooks/empleados/useOrderActionsEmp";

const Empleados = () => {
    const formRef = useRef(null);

    const [idUsuario, setIdUsuario] = useState(null);
    const [cedula, setCedula] = useState("");
    const [nombre1, setNombre1] = useState("");
    const [nombre2, setNombre2] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [editarEmpleado, setEditarEmpleado] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    // Search states for all fields
    const [cedulaBusqueda, setCedulaBusqueda] = useState("");
    const [nombre1Busqueda, setNombre1Busqueda] = useState("");
    const [nombre2Busqueda, setNombre2Busqueda] = useState(""); // NEW
    const [apellido1Busqueda, setApellido1Busqueda] = useState("");
    const [apellido2Busqueda, setApellido2Busqueda] = useState(""); // NEW
    const [telefonoBusqueda, setTelefonoBusqueda] = useState(""); // NEW
    const [direccionBusqueda, setDireccionBusqueda] = useState(""); // NEW

    const {
        loadEmployees,
        buscarEmpleados,
        limpiarCampos: limpiarCamposHook,
        llenarParaEditar: llenarParaEditarHook,
    } = useLoadDataEmp({
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
        setNombre2Busqueda, // Pass to hook
        setApellido1Busqueda,
        setApellido2Busqueda, // Pass to hook
        setTelefonoBusqueda, // Pass to hook
        setDireccionBusqueda, // Pass to hook
        setEditarEmpleado,
    });

    const limpiarCampos = useCallback(() => {
        limpiarCamposHook();
        setIdUsuario(null);
    }, [limpiarCamposHook]);

    const { add, edit, remove } = useOrderActionsEmp({
        loadEmployees,
        limpiarCampos,
    });

    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);

    // This useEffect now watches all search fields
    useEffect(() => {
        const debounce = setTimeout(() => {
            const campos = [
                cedulaBusqueda,
                nombre1Busqueda,
                nombre2Busqueda,
                apellido1Busqueda,
                apellido2Busqueda,
                telefonoBusqueda,
                direccionBusqueda,
            ];
            const hayAlgo = campos.some((val) => val.trim() !== "");
            if (hayAlgo) {
                buscarEmpleados({
                    cedula: cedulaBusqueda,
                    nombre1: nombre1Busqueda,
                    nombre2: nombre2Busqueda, // Pass to search
                    apellido1: apellido1Busqueda,
                    apellido2: apellido2Busqueda, // Pass to search
                    telefono: telefonoBusqueda, // Pass to search
                    direccion: direccionBusqueda, // Pass to search
                });
            } else {
                // If all search fields are empty, load all employees
                loadEmployees();
            }
        }, 300); // Debounce for 300ms

        return () => clearTimeout(debounce);
    }, [
        cedulaBusqueda,
        nombre1Busqueda,
        nombre2Busqueda, // Add to dependency array
        apellido1Busqueda,
        apellido2Busqueda, // Add to dependency array
        telefonoBusqueda, // Add to dependency array
        direccionBusqueda, // Add to dependency array
        buscarEmpleados,
        loadEmployees // Added loadEmployees to dependency array for when all fields are empty
    ]);

    const llenarParaEditarYScroll = (empleado) => {
        llenarParaEditarHook(empleado);
        setIdUsuario(empleado.id_usuario);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleOpenUserModal = () => {
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
    };

    const handleUserCreated = (newIdUsuario) => {
        setIdUsuario(newIdUsuario);
        setShowUserModal(false);
    };

    const handleSubmitEmpleado = () => {
        const empleadoData = {
            id_usuario: idUsuario,
            cedula,
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            telefono,
            direccion,
        };

        if (editarEmpleado) {
            edit(cedula, empleadoData);
        } else {
            add(empleadoData);
        }
    };

    return (
        <div className="container">
            <div className="card text-center" ref={formRef}>
                <div className="card-header">GESTIÓN DE EMPLEADOS</div>
                <div className="card-body">
                    <EmpleadoForm
                        cedula={cedula}
                        setCedula={setCedula}
                        nombre1={nombre1}
                        setNombre1={setNombre1}
                        nombre2={nombre2}
                        setNombre2={setNombre2}
                        apellido1={apellido1}
                        setApellido1={setApellido1}
                        apellido2={apellido2}
                        setApellido2={setApellido2}
                        telefono={telefono}
                        setTelefono={setTelefono}
                        direccion={direccion}
                        setDireccion={setDireccion}
                        editarEmpleado={editarEmpleado}
                        handleSubmit={handleSubmitEmpleado}
                        limpiarCampos={limpiarCampos}
                        idUsuario={idUsuario}
                        handleOpenUserModal={handleOpenUserModal}
                    />
                </div>
                <SearchFormEmp
                    cedulaBusqueda={cedulaBusqueda}
                    setCedulaBusqueda={setCedulaBusqueda}
                    nombre1Busqueda={nombre1Busqueda}
                    setNombre1Busqueda={setNombre1Busqueda}
                    nombre2Busqueda={nombre2Busqueda} // Pass to SearchFormEmp
                    setNombre2Busqueda={setNombre2Busqueda} // Pass to SearchFormEmp
                    apellido1Busqueda={apellido1Busqueda}
                    setApellido1Busqueda={setApellido1Busqueda}
                    apellido2Busqueda={apellido2Busqueda} // Pass to SearchFormEmp
                    setApellido2Busqueda={setApellido2Busqueda} // Pass to SearchFormEmp
                    telefonoBusqueda={telefonoBusqueda} // Pass to SearchFormEmp
                    setTelefonoBusqueda={setTelefonoBusqueda} // Pass to SearchFormEmp
                    direccionBusqueda={direccionBusqueda} // Pass to SearchFormEmp
                    setDireccionBusqueda={setDireccionBusqueda} // Pass to SearchFormEmp
                    getAll={loadEmployees}
                />
                <EmpleadoTable
                    listaEmpleados={listaEmpleados}
                    llenarParaEditar={llenarParaEditarYScroll}
                    remove={remove}
                />
            </div>

            <UserCreationModal
                show={showUserModal}
                handleClose={handleCloseUserModal}
                onUserCreated={handleUserCreated}
            />
        </div>
    );
};

export default Empleados;