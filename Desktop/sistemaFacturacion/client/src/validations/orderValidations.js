// src/validations/productValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateForm = (id_Cliente_Orden, id_metodoPago, id_estado) => {
  if (!id_Cliente_Orden || !id_metodoPago || !id_estado) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete todos los campos.",
    });
    return false;
  }

  return true;
};

export const validateForm2 = (codigoProducto, cantidad) => {
  if (!codigoProducto || !cantidad) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete todos los campos.",
    });
    return false;
  }

  if (isNaN(cantidad) || parseFloat(cantidad) <= 0) {
    noti.fire({
      icon: "error",
      title: "cantidad inválida",
      text: "La cantidad debe ser un número positivo y mayor que cero.",
    });
    return false;
  }

  return true;
};

export const validateListaDetalle = (listaDetalles) => {
  if (listaDetalles.length === 0) {
    noti.fire({
      icon: "error",
      title: "Debe ingresar al menos 1 producto",
    });
    return false;
  }

  return true;
};

export const limpiarCampos2 = (set_Cliente_Orden, setCedulaCliente, set_Id_MetodoPago, setFechaPago, set_IdEstado,
  set_IdProducto_Orden, setCodigoProducto, setCantidad, setEditarDetalle, setListaDetalles
) => {
  set_Cliente_Orden("");
  setCedulaCliente("");
  set_Id_MetodoPago("");
  setFechaPago("");
  set_IdEstado("");
  set_IdProducto_Orden("");
  setCodigoProducto("");
  setCantidad("");
  setEditarDetalle(false);
  setListaDetalles([]);
};