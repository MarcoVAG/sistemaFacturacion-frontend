// src/validations/productValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateForm = (codigo, producto, precioUnitario, stock, id_categoria_producto) => {
  if (!codigo || !producto || !precioUnitario || !stock || !id_categoria_producto) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete todos los campos.",
    });
    return false;
  }

  if (isNaN(precioUnitario) || parseFloat(precioUnitario) <= 0) {
    noti.fire({
      icon: "error",
      title: "Precio inválido",
      text: "El precio debe ser un número positivo.",
    });
    return false;
  }

  if (!Number.isInteger(parseInt(stock)) || parseInt(stock) < 0) {
    noti.fire({
      icon: "error",
      title: "Stock inválido",
      text: "El stock debe ser un número entero no negativo.",
    });
    return false;
  }

  return true;
};