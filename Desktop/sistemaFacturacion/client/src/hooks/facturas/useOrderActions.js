// /hooks/facturas/userOrderActions.js

import { addDetail } from "../../services/detalleService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateForm, validateListaDetalle } from "../../validations/orderValidations";

const noti = withReactContent(Swal);

export const useOrderActions = ({
  idEmpleado,
  listaDetalles,
  limpiarCampos,
  limpiarCamposProduct
}) => {
  const add = async ({ id_Cliente_Orden, id_metodoPago, id_estado, fechaPago }) => {
    if (!validateForm(id_Cliente_Orden, id_metodoPago, id_estado)) return;
    if (!validateListaDetalle(listaDetalles)) return;

    const validFechaPago = fechaPago ? new Date(fechaPago).toISOString().split('T')[0] : null;

    const nuevaOrdenDetalle = {
      id_Cliente_Orden: parseInt(id_Cliente_Orden),
      id_Empleado_Orden: idEmpleado,
      total: listaDetalles.reduce((sum, d) => sum + parseFloat(d.subtotal), 0).toFixed(2),
      id_estado: parseInt(id_estado),
      id_metodoPago: parseInt(id_metodoPago),
      fechaPago: validFechaPago,
      detalles: listaDetalles.map(det => ({
        id_producto_detalle: det.id_producto_detalle,
        cantidad: parseFloat(det.cantidad),
        precioUnitario: det.precioUnitario,
        iva: det.iva,
        subtotal: parseFloat(det.subtotal),
      })),
    };

    try {
      const result = await addDetail(nuevaOrdenDetalle);
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: <i>{result.message}</i>,
        icon: "success",
      });
      limpiarCampos();
    } catch (error) {
      noti.fire({ icon: "error", title: "Ups...", text: error.message });
    }
  };

const edit = (id_producto_detalle, nuevaCantidad, listaProductos, listaDetalles, setListaDetalles) => {
  const index = listaDetalles.findIndex(d => d.id_producto_detalle === id_producto_detalle);
  if (index === -1) return;

  // Validar cantidad
  const cantidadInt = parseInt(nuevaCantidad);
  if (isNaN(cantidadInt) || cantidadInt <= 0) {
    return noti.fire({
      icon: "error",
      title: "Cantidad inválida",
      text: "La cantidad debe ser un número mayor a cero.",
    });
  }

  const producto = listaProductos.find(p => p.id_producto === id_producto_detalle);
  if (!producto) {
    return noti.fire({ icon: "error", title: "Producto no encontrado" });
  }

  const stockDisponible = producto.stock;

  // Stock insuficiente
  if (cantidadInt > stockDisponible) {
    return noti.fire({
      icon: "warning",
      title: "Stock insuficiente",
      text: `Solo hay ${stockDisponible} unidades disponibles.`,
    });
  }

  const precioUnitario = parseFloat(producto.precioUnitario);
  const iva = (precioUnitario * 0.12) * cantidadInt;
  const subtotal = precioUnitario * cantidadInt + iva;

  listaDetalles[index] = {
    ...listaDetalles[index],
    cantidad: cantidadInt,
    precioUnitario,
    iva,
    subtotal,
  };

  setListaDetalles([...listaDetalles]);
  limpiarCamposProduct();
  noti.fire({ title: "Actualización exitosa", icon: "success" });
};



  const remove = async (id_producto_detalle, listaDetalles, setListaDetalles) => {
    const result = await noti.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const updated = listaDetalles.filter(d => d.id_producto_detalle !== id_producto_detalle);
      setListaDetalles([...updated]);
      noti.fire("Eliminado", "Detalle eliminado.", "success");
    }
  };

  return { add, edit, remove };
};
