//src/pages/gui_clientes
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchFormC from "../../components/clientes/searchFormC.js";
import ClientTable from "../../components/clientes/clientTable.js";
//import "./styles/gui_client.css";

import { useLoadDataCli } from "../../hooks/clientes/useLoadDataCli";
import { useOrderActionsCli } from "../../hooks/clientes/useOrderActionsCli";

const Clientes = () => {
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
        <div className="card-header">CONSULTA DE CLIENTES</div>
        <SearchFormC
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
        <ClientTable
          listaClientes={listaClientes}
          llenarParaEditar={llenarParaEditarYScroll}
          remove={remove}
        />
      </div>
    </div>
  );
};

export default Clientes;
