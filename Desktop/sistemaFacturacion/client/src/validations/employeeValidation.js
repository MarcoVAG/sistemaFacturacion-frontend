// src/validations/employeeValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

// Modifica la función para que acepte un solo objeto 'formData'
export const validateForm = (formData) => {
    // Accede a las propiedades directamente desde el objeto formData
    const { cedula, nombre1, nombre2, apellido1, apellido2, telefono, direccion } = formData;

    if (!cedula || cedula.trim() === "") { // Añadimos .trim() para evitar espacios en blanco como valores válidos
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "La cédula es obligatoria.",
        });
        return false;
    }
    if (!nombre1 || nombre1.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "El primer nombre es obligatorio.",
        });
        return false;
    }
    if (!apellido1 || apellido1.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "El primer apellido es obligatorio.",
        });
        return false;
    }
    // Asegúrate de que todos los campos requeridos estén aquí
    if (!nombre2 || nombre2.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "El segundo nombre es obligatorio.",
        });
        return false;
    }
    if (!apellido2 || apellido2.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "El segundo apellido es obligatorio.",
        });
        return false;
    }
    if (!telefono || telefono.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "El teléfono es obligatorio.",
        });
        return false;
    }
    if (!direccion || direccion.trim() === "") {
        noti.fire({
            icon: "error",
            title: "Campo requerido",
            text: "La dirección es obligatoria.",
        });
        return false;
    }

    return true; // Si todas las validaciones pasan
};