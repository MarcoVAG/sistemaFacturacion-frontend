// src/validations/roleValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateRoleForm = (nombreRol, descripcion) => {
  if (!nombreRol) {
    noti.fire({
      icon: "error",
      title: "Campo incompleto",
      text: "Por favor, ingrese el nombre del rol.",
    });
    return false;
  }

  return true;
};
