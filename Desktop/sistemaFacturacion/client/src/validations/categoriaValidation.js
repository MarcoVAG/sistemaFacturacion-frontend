// src/validations/categoriaValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const validateCategoriaForm = (categoriaNombre) => {
  if (!categoriaNombre || categoriaNombre.trim() === "") {
    noti.fire({
      icon: "warning",
      title: "Campo vacío",
      text: "El nombre de la categoría no puede estar vacío.",
    });
    return false;
  }
  // Puedes añadir más validaciones aquí, por ejemplo, longitud mínima/máxima, caracteres especiales, etc.
  return true;
};