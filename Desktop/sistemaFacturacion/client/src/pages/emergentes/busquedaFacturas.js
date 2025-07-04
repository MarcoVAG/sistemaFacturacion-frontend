import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FacturaForm from "../../components/facturas/facturaSearch";
import FacturaTable from "../../components/facturas/facturaTable";
import {
  getAllOrders,
  searchOrder,
  getAllEmployees
} from "../../services/orderService";

import {
  getAllClients
} from "../../services/clientService";

import {
  getAllStates
} from "../../services/statesService";

import {
  getAllMethods
} from "../../services/methodsService";

const noti = withReactContent(Swal);

const VentanaFacturas = () => {
  const [listaFacturas, setListaFacturas] = useState([]);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [clienteBusqueda, setClienteBusqueda] = useState("");
  const [listaClientes, setListaClientes] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaMetodos, setListaMetodos] = useState([]);

  const [idClienteBusqueda, setIdClienteBusqueda] = useState("");


  useEffect(() => {
    loadFacturas();
    loadClients();
    loadEmployees();
    loadStates();
    loadMethods();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (idBusqueda.trim() !== "" || clienteBusqueda.trim !== "") {
        buscarFacturas();
      } else {
        loadFacturas(); // Si está vacío, carga todos
      }
    }, 300); // Espera 300ms para evitar demasiadas llamadas

    return () => clearTimeout(delayDebounce); // Limpia el timeout anterior
  }, [idBusqueda, clienteBusqueda]);


  const loadFacturas = async () => {
    try {
      const facturas = await getAllOrders();
      setListaFacturas(facturas);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

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

  const loadEmployees = async () => {
    try {
      const empleados = await getAllEmployees();
      setListaEmpleados(empleados);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  const loadStates = async () => {
    try {
      const estados = await getAllStates();
      setListaEstados(estados);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  const loadMethods = async () => {
    try {
      const metodos = await getAllMethods();
      setListaMetodos(metodos);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  const buscarFacturas = async (clienteIdParam = null) => {
    const clienteId = clienteIdParam || idClienteBusqueda;

    /*if (!idBusqueda && !clienteId) {
      noti.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese el ID de la factura o un apellido válido.",
      });
      return;
    }*/

    const params = {
      ...(idBusqueda && { id_orden: idBusqueda }),
      ...(clienteId && { id_cliente_orden: clienteId }),
    };

    try {
      const facturas = await searchOrder(params);
      setListaFacturas(facturas);
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
        <div className="card-header">BÚSQUEDA DE FACTURAS</div>
        <FacturaForm
          idBusqueda={idBusqueda} setIdBusqueda={setIdBusqueda}
          clienteBusqueda={clienteBusqueda} setClienteBusqueda={setClienteBusqueda}
          buscarFacturas={buscarFacturas} getAll={loadFacturas}
          listaClientes={listaClientes} listaEmpleados={listaEmpleados}
          listaEstados={listaEstados} listaMetodos={listaMetodos}
          setIdClienteBusqueda={setIdClienteBusqueda}
        />
      </div>
      <FacturaTable
        listaFacturas={listaFacturas} listaClientes={listaClientes}
        listaEmpleados={listaEmpleados} listaEstados={listaEstados}
        listaMetodos={listaMetodos}
      />
    </div>
  );
};

export default VentanaFacturas;