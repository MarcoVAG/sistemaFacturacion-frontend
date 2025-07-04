// src/components/facturas/facturaForm

import React, { useEffect, useRef } from "react";
// Eliminamos Dropdown y DropdownButton de aquí
// import { Dropdown, DropdownButton } from "react-bootstrap";
import "../styles/facturaForm.css";
import { useLocation } from 'react-router-dom'; // Importa useLocation

const FacturaForm = ({
  cantidad,
  setCantidad,
  id_metodo_Pago,
  set_Id_MetodoPago,
  id_estado,
  set_IdEstado,
  editarDetalle,
  limpiarCampos,
  handleSubmit,
  handleSubmitDos,
  loadTabla,
  listaMetodoPago,
  listaEstado,
  codigoProducto,
  setCodigoProducto,
  buscarProductoPorCodigo,
  cedulaCliente,
  setCedulaCliente,
  buscarClientesPorCedula,
  listaProductos,
}) => {
  const location = useLocation(); // Inicializa useLocation
  const cedulaInputRef = useRef(null); // Referencia para el input de cédula
  const codigoProductoInputRef = useRef(null); // Referencia para el input de código de producto

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
    // Lógica para la cédula (sin cambios)
    const searchParams = new URLSearchParams(location.search);
    const cedulaFromURL = searchParams.get('cedula');
    if (cedulaFromURL) {
      setCedulaCliente(cedulaFromURL);
    }

    // Escucha los mensajes de la ventana emergente de búsqueda de clientes
    const handleClienteMessage = (event) => {
      if (event.origin === window.location.origin && event.data && event.data.cedulaCliente) {
        setCedulaCliente(event.data.cedulaCliente);
        if (cedulaInputRef.current) {
          cedulaInputRef.current.focus();
          cedulaInputRef.current.selectionStart = event.data.cedulaCliente.length;
          cedulaInputRef.current.selectionEnd = event.data.cedulaCliente.length;
        }
      }
    };

    window.addEventListener('message', handleClienteMessage);

    // Escucha los mensajes de la ventana emergente de búsqueda de productos
    const handleProductoMessage = (event) => {
      if (event.origin === window.location.origin && event.data && event.data.codigoProductoSeleccionado) {
        setCodigoProducto(event.data.codigoProductoSeleccionado.toUpperCase()); // Asegúrate de que coincida con tu onChange
        if (codigoProductoInputRef.current) {
          codigoProductoInputRef.current.focus();
          codigoProductoInputRef.current.selectionStart = event.data.codigoProductoSeleccionado.length;
          codigoProductoInputRef.current.selectionEnd = event.data.codigoProductoSeleccionado.length;
        }
      }
    };

    window.addEventListener('message', handleProductoMessage);

    // Función de limpieza
    return () => {
      window.removeEventListener('message', handleClienteMessage);
      window.removeEventListener('message', handleProductoMessage);
    };
  }, [location.search, setCedulaCliente, setCodigoProducto]);

  // Eliminamos la función irAlLogin de aquí
  // const irAlLogin = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // };

  const handleButtonClick = () => {
    if (editarDetalle) {
      handleSubmitDos();
    } else {
      loadTabla();
    }
  };

  return (
    <div className="factura-form-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Formulario de Factura</h3>
        {/* Eliminamos el DropdownButton de Opciones de aquí */}
        {/* <DropdownButton
          id="dropdown-basic-button"
          title="Opciones"
          variant="outline-secondary"
        >
          <Dropdown.Item onClick={irAlLogin}>Cerrar Sesión</Dropdown.Item>
        </DropdownButton> */}
      </div>

      <div className="form-group mb-3">
        <label>Cliente:</label>
        <input
          type="text"
          onChange={(e) => setCedulaCliente(e.target.value)}
          onBlur={buscarClientesPorCedula}
          className="form-control"
          value={cedulaCliente}
          placeholder="Ingrese la cédula del cliente..."
          ref={cedulaInputRef}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            const width = 1000;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            window.open(
              "/busquedaClientes",
              "popup",
              `width=${width},height=${height},scrollbars=yes,resizable=yes,left=${left},top=${top}`
            );
          }}
        >
          Buscar Cliente
        </button>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            const width = 1000;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            window.open(
              "/clientesVendedor",
              "popup",
              `width=${width},height=${height},scrollbars=yes,resizable=yes,left=${left},top=${top}`
            );
          }}
        >
          Ingresar Cliente
        </button>
      </div>

      <div className="form-group mb-3">
        <label>Método de Pago:</label>
        <select
          value={id_metodo_Pago}
          onChange={(e) => set_Id_MetodoPago(e.target.value)}
          className="form-control"
        >
          <option value="">Seleccione un método de pago...</option>
          {listaMetodoPago.map((met) => (
            <option key={met.id_metodoPago} value={met.id_metodoPago}>
              {met.metodo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label>Estado:</label>
        <select
          onChange={(e) => set_IdEstado(e.target.value)}
          className="form-control"
          value={id_estado}
        >
          <option value="">Seleccione el estado de la factura...</option>
          {listaEstado.map((est) => (
            <option key={est.id_estado} value={est.id_estado}>
              {est.estado}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label>Producto:</label>
        <input
          type="text"
          onChange={(e) => setCodigoProducto(e.target.value.toUpperCase())}
          onBlur={buscarProductoPorCodigo}
          className="form-control"
          value={codigoProducto}
          placeholder="Ingrese el código del producto..."
          disabled={editarDetalle}
          ref={codigoProductoInputRef}
          readOnly
        />

        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            const width = 1000;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;

            window.open(
              "/busquedaProductos",
              "popup",
              `width=${width},height=${height},scrollbars=yes,resizable=yes,left=${left},top=${top}`
            );
          }}
        >
          Buscar Producto
        </button>
        <br></br><br></br>
        <label>Cantidad:</label>
        <input
          type="number"
          onChange={(e) => setCantidad(e.target.value)}
          className="form-control"
          value={cantidad}
          placeholder="Ingrese la cantidad"
        />
      </div>

      <div className="form-buttons mt-3">
        <button className="btn btn-success me-2" onClick={handleButtonClick}>
          {editarDetalle ? "Actualizar" : "Agregar Producto"}
        </button>

        <button className="btn btn-success me-2" onClick={handleSubmit}>
          Registrar
        </button>
        <button className="btn btn-danger" onClick={limpiarCampos}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FacturaForm;
