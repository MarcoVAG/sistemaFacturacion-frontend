// src/validations/metodoPagoValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateMetodoPagoForm = (metodoNombre) => {
  if (!metodoNombre || metodoNombre.trim() === "") {
    noti.fire({
      icon: "warning",
      title: "Campo vacío",
      text: "El nombre del método de pago no puede estar vacío.",
    });
    return false;
  }
  // Puedes añadir más validaciones aquí, por ejemplo, longitud mínima/máxima, caracteres especiales, etc.
  return true;
};
