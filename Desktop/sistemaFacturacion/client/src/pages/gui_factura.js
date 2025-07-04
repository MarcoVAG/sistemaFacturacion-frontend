// src/pages/gui_factura.js

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";

import FacturaForm from "../components/facturas/facturaForm";
import FacturaTable from "../components/facturas/productosFacturaTable";
import FacturaPDF from "../components/facturas/facturaPDF";

import { useLoadData } from "../hooks/facturas/useLoadData";
import { useOrderActions } from "../hooks/facturas/useOrderActions"; // Asegúrate de que esta ruta sea correcta

import Swal from "sweetalert2";


const Factura = () => {

  const [idEmpleado, setIdEmpleado] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("idEmpleado");
    setIdEmpleado(id);
  }, []);

  const [id_Cliente_Orden, set_Cliente_Orden] = useState("");
  const [id_estado, set_IdEstado] = useState("");
  const [id_metodoPago, set_Id_MetodoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");

  const [id_Producto_Orden, set_IdProducto_Orden] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [editarDetalle, setEditarDetalle] = useState(false);
  const [idProductoEditando, setIdProductoEditando] = useState(null); // NUEVO

  const [listaMetodoPago, setListaMetodoPago] = useState([]);
  const [listaEstado, setListaEstado] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [codigoProducto, setCodigoProducto] = useState("");
  const [listaClientes, setListaClientes] = useState([]);
  const [cedulaCliente, setCedulaCliente] = useState("");
  const [listaDetalles, setListaDetalles] = useState([]);

  const facturaRef = useRef();
  const handlePrint = useReactToPrint({ content: () => facturaRef.current });

  const limpiarCampos = () => {
    set_Cliente_Orden("");
    setCedulaCliente("");
    set_Id_MetodoPago("");
    setFechaPago("");
    set_IdEstado("");
    set_IdProducto_Orden("");
    setCodigoProducto("");
    setCantidad("");
    setEditarDetalle(false);
    setIdProductoEditando(null); // LIMPIAR ID EN EDICIÓN
    setListaDetalles([]);
  };

  const {
    loadMetodosPago,
    loadEstado,
    loadProducts,
    loadClients,
    loadTabla,
    buscarClientesPorCedula,
    buscarProductoPorCodigo,
    limpiarCamposProduct,
  } = useLoadData({
    setListaMetodoPago,
    setListaEstado,
    setListaProductos,
    setListaClientes,
    listaDetalles,
    setListaDetalles,
    id_Producto_Orden,
    set_IdProducto_Orden,
    cantidad,
    codigoProducto,
    setCodigoProducto,
    setCantidad,
    setEditarDetalle,
  });

  // PASAR handlePrint AL HOOK useOrderActions
  const { add, edit, remove } = useOrderActions({
    idEmpleado,
    listaDetalles,
    limpiarCampos,
    handlePrint, // <--- Aquí se pasa la función handlePrint
    setListaDetalles,
    limpiarCamposProduct,
  });

  useEffect(() => {
    loadMetodosPago();
    loadEstado();
    loadProducts();
    loadClients();
  }, []);

  const llenarParaEditar = (val, val2) => {
    setEditarDetalle(true);
    setCodigoProducto(val2.codigo);
    setCantidad(val.cantidad);
    setIdProductoEditando(val.id_producto_detalle); // GUARDAR ID EN EDICIÓN
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">FACTURACIÓN</div>
        <div className="card-body" style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
            <FacturaForm
              id_Cliente_Orden={id_Cliente_Orden}
              set_Cliente_Orden={set_Cliente_Orden}
              id_Producto_Orden={id_Producto_Orden}
              set_IdProducto_Orden={set_IdProducto_Orden}
              cantidad={cantidad}
              setCantidad={setCantidad}
              id_metodo_Pago={id_metodoPago}
              set_Id_MetodoPago={set_Id_MetodoPago}
              id_estado={id_estado}
              set_IdEstado={set_IdEstado}
              editarDetalle={editarDetalle}
              handleSubmitDos={() =>
                editarDetalle
                  ? edit(idProductoEditando, cantidad, listaProductos, listaDetalles, setListaDetalles)
                  : loadTabla()
              }
              // El handleSubmit ahora solo llama a la función 'add' del hook,
              // la cual se encargará de la validación y de llamar a handlePrint.
              handleSubmit={() => {
                if (!idEmpleado) {
                  Swal.fire({
                    icon: "error",
                    title: "Empleado no identificado",
                    text: "Debes iniciar sesión correctamente para poder facturar.",
                  });
                  return;
                }
                add({ id_Cliente_Orden, id_metodoPago, id_estado, fechaPago });
              }}

              loadTabla={loadTabla}
              limpiarCampos={limpiarCampos}
              listaDetalles={listaDetalles}
              listaMetodoPago={listaMetodoPago}
              setListaMetodoPago={setListaMetodoPago}
              listaEstado={listaEstado}
              setListaEstado={setListaEstado}
              codigoProducto={codigoProducto}
              setCodigoProducto={setCodigoProducto}
              buscarProductoPorCodigo={() =>
                buscarProductoPorCodigo(codigoProducto, listaProductos, set_IdProducto_Orden)
              }
              cedulaCliente={cedulaCliente}
              setCedulaCliente={setCedulaCliente}
              buscarClientesPorCedula={() =>
                buscarClientesPorCedula(cedulaCliente, listaClientes, set_Cliente_Orden)
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <FacturaPDF
              ref={facturaRef}
              orden={{
                clienteNombre: listaClientes.find(c => c.id_cliente === id_Cliente_Orden)
                  ? `${listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.nombre1} ${listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.nombre2 || ''} ${listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.apellido1} ${listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.apellido2 || ''}`.trim()
                  : "",
                clienteCedula: listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.cedula || "",
                clienteCorreo: listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.correo || "",
                clienteTelefono: listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.telefono || "",
                clienteDireccion: listaClientes.find(c => c.id_cliente === id_Cliente_Orden)?.direccion || "",
                id_orden_detalle: listaDetalles[0]?.id_orden_detalle || null, // Esto podría ser el ID de la orden recién creada si el backend lo devuelve
                id_estado: id_estado,
                id_metodoPago: id_metodoPago,
                fechaEmision: new Date().toLocaleDateString("es-ES"),
                // Estos subtotales y IVA se calculan aquí para la visualización en FacturaPDF
                subtotal: listaDetalles.reduce((sum, d) => sum + (parseFloat(d.subtotal) - parseFloat(d.iva)), 0),
                iva: listaDetalles.reduce((sum, d) => sum + parseFloat(d.iva), 0),
                total: listaDetalles.reduce((sum, d) => sum + parseFloat(d.subtotal), 0),
              }}
              listaDetalles={listaDetalles}
              listaProductos={listaProductos}
              listaEstado={listaEstado}
              listaMetodoPago={listaMetodoPago}
            />
          </div>
        </div>
        <FacturaTable
          listaDetalles={listaDetalles}
          listaProductos={listaProductos}
          llenarParaEditar={llenarParaEditar}
          remove={(id) => remove(id, listaDetalles, setListaDetalles)}
        />
      </div>
    </div>
  );
};

export default Factura;


//HASTA QUIIIIIII ! X2222