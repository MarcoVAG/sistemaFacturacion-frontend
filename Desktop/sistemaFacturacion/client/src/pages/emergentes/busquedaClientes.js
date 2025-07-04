import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SearchForm from "../../components/clientes/searchFormC";
import ClientTable from "../../components/clientes/clientTable";
import { getAllClients, searchClient } from "../../services/clientService";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Router, Routes, Route

const noti = withReactContent(Swal);

// Este es el componente que contiene toda la lógica y la UI de la búsqueda de clientes
const BusquedaClientesContent = () => { // Renombramos el componente principal
    const [listaClientes, setListaClientes] = useState([]);

    // Campos de búsqueda
    const [cedulaBusqueda, setCedulaBusqueda] = useState("");
    const [nombre1Busqueda, setNombre1Busqueda] = useState("");
    const [nombre2Busqueda, setNombre2Busqueda] = useState("");
    const [apellido1Busqueda, setApellido1Busqueda] = useState("");
    const [apellido2Busqueda, setApellido2Busqueda] = useState("");
    const [telefonoBusqueda, setTelefonoBusqueda] = useState("");
    const [direccionBusqueda, setDireccionBusqueda] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const campos = [
                cedulaBusqueda,
                nombre1Busqueda,
                nombre2Busqueda,
                apellido1Busqueda,
                apellido2Busqueda,
                telefonoBusqueda,
                direccionBusqueda,
            ];
            const hayAlgo = campos.some((valor) => valor.trim() !== "");
            if (hayAlgo) {
                buscarClientes();
            } else {
                loadClients(); // Si todo está vacío, carga todos
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [
        cedulaBusqueda,
        nombre1Busqueda,
        nombre2Busqueda,
        apellido1Busqueda,
        apellido2Busqueda,
        telefonoBusqueda,
        direccionBusqueda,
    ]);

    const loadClients = async () => {
        try {
            const clientes = await getAllClients();
            setListaClientes(clientes);
        } catch (error) {
            noti.fire({
                icon: "error",
                title: "Ups...",
                text: error.message,
            });
        }
    };

    const buscarClientes = async () => {
        const params = {
            ...(cedulaBusqueda && { cedula: cedulaBusqueda }),
            ...(nombre1Busqueda && { nombre1: nombre1Busqueda }),
            ...(nombre2Busqueda && { nombre2: nombre2Busqueda }),
            ...(apellido1Busqueda && { apellido1: apellido1Busqueda }),
            ...(apellido2Busqueda && { apellido2: apellido2Busqueda }),
            ...(telefonoBusqueda && { telefono: telefonoBusqueda }),
            ...(direccionBusqueda && { direccion: direccionBusqueda }),
        };

        try {
            const clientes = await searchClient(params);
            setListaClientes(clientes);
        } catch (error) {
            noti.fire({
                icon: "error",
                title: "Ups...",
                text: error.message,
            });
        }
    };

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">BÚSQUEDA DE CLIENTES</div>

                <SearchForm
                    cedulaBusqueda={cedulaBusqueda}
                    setCedulaBusqueda={setCedulaBusqueda}
                    nombre1Busqueda={nombre1Busqueda}
                    setNombre1Busqueda={setNombre1Busqueda}
                    nombre2Busqueda={nombre2Busqueda}
                    setNombre2Busqueda={setNombre2Busqueda}
                    apellido1Busqueda={apellido1Busqueda}
                    setApellido1Busqueda={setApellido1Busqueda}
                    apellido2Busqueda={apellido2Busqueda}
                    setApellido2Busqueda={setApellido2Busqueda}
                    telefonoBusqueda={telefonoBusqueda}
                    setTelefonoBusqueda={setTelefonoBusqueda}
                    direccionBusqueda={direccionBusqueda}
                    setDireccionBusqueda={setDireccionBusqueda}
                    getAll={loadClients}
                />
            </div>

            <ClientTable listaClientes={listaClientes} />
        </div>
    );
};

// Este es el componente que se exporta y que Render (y window.open) cargará
const VentanaClientes = () => {
    return (
        <Router> {/* Envuelve tu componente principal con BrowserRouter */}
            <Routes>
                {/* Define la ruta específica para este componente dentro de su propio router */}
                {/* Si la ventana siempre abre solo este componente, puedes usar "/" */}
                <Route path="/busquedaClientes" element={<BusquedaClientesContent />} />
                {/* También puedes agregar una ruta comodín para la raíz de este Router */}
                <Route path="/" element={<BusquedaClientesContent />} />
            </Routes>
        </Router>
    );
};

export default VentanaClientes;