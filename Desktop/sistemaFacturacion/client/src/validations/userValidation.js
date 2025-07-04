// src/validations/userValidation.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

/**
 * Valida los campos del formulario de usuario para creación.
 * Requiere correo, hash de contraseña y rol.
 */
export const validateUserForm = (correo_electronico, password_hash, id_rol) => {
  if (!correo_electronico || !password_hash || !id_rol) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete el correo electrónico, la contraseña y seleccione un rol.",
    });
    return false;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo_electronico)) {
    noti.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor, ingrese un formato de correo electrónico válido.",
    });
    return false;
  }

  // Validación básica de la complejidad de la contraseña (solo longitud mínima)
  // NOTA: La validación de complejidad robusta se hace en el backend.
  if (password_hash.length < 8) {
    noti.fire({
      icon: "warning",
      title: "Contraseña corta",
      text: "La contraseña debe tener al menos 8 caracteres.",
    });
    return false;
  }

  return true;
};

/**
 * Valida los campos del formulario de usuario para actualización (sin la contraseña).
 * Requiere correo y rol.
 */
export const validateUserUpdateForm = (correo_electronico, id_rol) => {
  if (!correo_electronico || !id_rol) {
    noti.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, complete el correo electrónico y seleccione un rol.",
    });
    return false;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo_electronico)) {
    noti.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor, ingrese un formato de correo electrónico válido.",
    });
    return false;
  }

  return true;
};

/**
 * Valida el campo de la nueva contraseña.
 */
export const validatePasswordChangeForm = (newPasswordHash) => {
  if (!newPasswordHash) {
    noti.fire({
      icon: "error",
      title: "Campo incompleto",
      text: "Por favor, ingrese la nueva contraseña.",
    });
    return false;
  }
  // Validación básica de la complejidad de la contraseña (solo longitud mínima)
  if (newPasswordHash.length < 8) {
    noti.fire({
      icon: "warning",
      title: "Contraseña corta",
      text: "La nueva contraseña debe tener al menos 8 caracteres.",
    });
    return false;
  }
  return true;
};
