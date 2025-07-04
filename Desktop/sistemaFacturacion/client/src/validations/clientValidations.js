// src/validations/clientValidations.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateForm = (cedula, nombre1, apellido1, telefono, direccion) => {
  if (!cedula || !nombre1 || !apellido1 || !telefono || !direccion) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete todos los campos.",
    });
    return false;
  }

  return true;
};