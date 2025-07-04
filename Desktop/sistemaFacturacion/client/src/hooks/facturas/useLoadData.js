// /hooks/facturas/userLoadData.js

import { getAllMethods } from "../../services/methodsService";
import { getAllStates } from "../../services/statesService";
import { getAllProducts } from "../../services/productService";
import { getProductDetails } from "../../services/detalleService";
import { getAllClients } from "../../services/clientService";
import { validateForm2 } from "../../validations/orderValidations";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadData = ({
  setListaMetodoPago,
  setListaEstado,
  setListaProductos,
  setListaClientes,
  listaDetalles,
  setListaDetalles,
  id_Producto_Orden,
  cantidad,
  codigoProducto,
  setCodigoProducto,
  setCantidad,
  setEditarDetalle
}) => {
  const loadMetodosPago = async () => {
    try {
      const metodosPago = await getAllMethods();
      setListaMetodoPago(metodosPago);
    } catch (error) {
      showError(error);
    }
  };

  const loadEstado = async () => {
    try {
      const estado = await getAllStates();
      setListaEstado(estado);
    } catch (error) {
      showError(error);
    }
  };

  const loadProducts = async () => {
    try {
      const productos = await getAllProducts();
      setListaProductos(productos);
    } catch (error) {
      showError(error);
    }
  };

  const loadClients = async () => {
    try {
      const clientes = await getAllClients();
      setListaClientes(clientes);
    } catch (error) {
      showError(error);
    }
  };

  const loadTabla = async () => {
    if (!validateForm2(codigoProducto, cantidad)) return;

    const productoExistente = listaDetalles.find(
      (detalle) => detalle.id_producto_detalle === parseInt(id_Producto_Orden)
    );

    if (productoExistente) {
      noti.fire({
        icon: "warning",
        title: "El producto ya ha sido ingresado",
        text: "No se puede agregar el mismo producto más de una vez.",
      });
      return;
    }

    try {
      const producto = await getProductDetails(id_Producto_Orden);
      const stockDisponible = producto.stock;

      if (stockDisponible < cantidad) {
        noti.fire({
          icon: "warning",
          title: "Stock insuficiente",
          text: `Stock disponible: ${stockDisponible}`,
        });
        return;
      }

      const precioUnitario = parseFloat(producto.precioUnitario);
      const cantidadInt = parseInt(cantidad);
      const iva = (precioUnitario * 0.12) * cantidadInt;
      const subtotal = precioUnitario * cantidadInt + iva;

      const newDetail = {
        id_producto_detalle: parseInt(id_Producto_Orden),
        cantidad: cantidadInt,
        precioUnitario,
        iva,
        subtotal,
      };

      setListaDetalles([...listaDetalles, newDetail]);
      limpiarCamposProduct();

    } catch (error) {
      showError(error);
    }
  };

  const buscarClientesPorCedula = (cedulaCliente, listaClientes, set_Cliente_Orden) => {
    const cliente = listaClientes.find(cli => cli.cedula === cedulaCliente);
    if (cliente) {
      set_Cliente_Orden(cliente.id_cliente);
    } else {
      noti.fire({
        icon: "error",
        title: "Cliente no encontrado",
        text: "Ingrese una cédula válida."
      });
    }
  };

  const buscarProductoPorCodigo = (codigoProducto, listaProductos, set_IdProducto_Orden) => {
    const producto = listaProductos.find(prod => prod.codigo === codigoProducto);
    if (producto) {
      set_IdProducto_Orden(producto.id_producto);
    } else {
      noti.fire({
        icon: "error",
        title: "Producto no encontrado",
        text: "Código inválido."
      });
    }
  };

  const limpiarCamposProduct = () => {
    setCodigoProducto("");
    setCantidad("");
    setEditarDetalle(false);
  };

  const showError = (error) => {
    noti.fire({
      icon: "error",
      title: "Ups...",
      text: error.message,
    });
  };

  return {
    loadMetodosPago,
    loadEstado,
    loadProducts,
    loadClients,
    loadTabla,
    buscarClientesPorCedula,
    buscarProductoPorCodigo,
    limpiarCamposProduct,
  };
};
