import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClienteForm from "../components/clientes/clientForm.js";

import { useLoadDataCli } from "../hooks/clientes/useLoadDataCli";
import { useOrderActionsCli } from "../hooks/clientes/useOrderActionsCli";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ¡IMPORTANTE!

// Componente que contiene toda la lógica y la UI de la gestión de clientes (para Vendedor)
// Lo renombramos para poder envolverlo en el Router de esta ventana.
const ClientesVendedorContent = () => { // Renombrado
  const formRef = useRef(null);

  // Estados de formulario
  const [cedula, setCedula] = useState("");
  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  // Estados generales
  const [listaClientes, setListaClientes] = useState([]);
  const [editarCliente, setEditarCliente] = useState(false);

  // Estados de búsqueda
  const [cedulaBusqueda, setCedulaBusqueda] = useState("");
  const [nombre1Busqueda, setNombre1Busqueda] = useState("");
  const [nombre2Busqueda, setNombre2Busqueda] = useState("");
  const [apellido1Busqueda, setApellido1Busqueda] = useState("");
  const [apellido2Busqueda, setApellido2Busqueda] = useState("");
  const [telefonoBusqueda, setTelefonoBusqueda] = useState("");
  const [direccionBusqueda, setDireccionBusqueda] = useState("");

  const {
    loadClients,
    buscarClientes,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataCli({
    setListaClientes,
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
    setEditarCliente,
  });

  const { add, edit, remove } = useOrderActionsCli({
    loadClients,
    limpiarCampos,
  });

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Búsqueda con debounce de todos los campos
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
        buscarClientes({
          cedula: cedulaBusqueda,
          nombre1: nombre1Busqueda,
          nombre2: nombre2Busqueda,
          apellido1: apellido1Busqueda,
          apellido2: apellido2Busqueda,
          telefono: telefonoBusqueda,
          direccion: direccionBusqueda,
        });
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
    buscarClientes,
  ]);

  const llenarParaEditarYScroll = (cliente) => {
    llenarParaEditarHook(cliente);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">GESTIÓN DE CLIENTES</div>
        <div className="card-body">
          <ClienteForm
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
            editarCliente={editarCliente}
            handleSubmit={() =>
              editarCliente
                ? edit(cedula, {
                    cedula,
                    nombre1,
                    nombre2,
                    apellido1,
                    apellido2,
                    telefono, // Corregido: "ltelefono" a "telefono"
                    direccion,
                  })
                : add({
                    cedula,
                    nombre1,
                    nombre2,
                    apellido1,
                    apellido2,
                    telefono,
                    direccion,
                  })
            }
            limpiarCampos={limpiarCampos}
          />
        </div>
      </div>
      {/* Aquí normalmente iría tu tabla de clientes para edición/eliminación si fuera gui_clientes.js */}
      {/* Si este es el gui_clientesVendedor.js, podrías tener una tabla de solo visualización o no tenerla. */}
      {/* Por simplicidad, asumo que solo necesitas el formulario en el popup. */}
    </div>
  );
};

// Componente principal exportado para la ventana emergente
const ClientesVendedor = () => { // Usamos el nombre original del archivo gui_clientesVendedor.js
  return (
    <Router> {/* Envuelve el contenido en un BrowserRouter */}
      <Routes>
        {/*
          Define la ruta para este componente dentro de su propio router.
          La ruta principal que se abrirá es '/clientesVendedor'.
          También agregamos una ruta para la raíz '/' por si acaso.
        */}
        <Route path="/clientesVendedor" element={<ClientesVendedorContent />} />
        <Route path="/" element={<ClientesVendedorContent />} />
      </Routes>
    </Router>
  );
};

export default ClientesVendedor;