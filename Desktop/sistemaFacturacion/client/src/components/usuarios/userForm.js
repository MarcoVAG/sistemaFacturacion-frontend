// src/components/usuarios/userForm.js
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validatePasswordChangeForm } from "../../validations/userValidation"; // Importa la validación de contraseña

const noti = withReactContent(Swal);

const UserForm = ({
  id_usuario,
  correo_electronico,
  setCorreoElectronico,
  password_hash,
  setPasswordHash,
  habilitado,
  setHabilitado,
  id_rol,
  setIdRol,
  listaRoles, // Lista de roles para el selector
  editarUsuario,
  limpiarCampos,
  handleSubmit, // Para crear o actualizar datos generales
  updatePassword, // Para actualizar solo la contraseña
}) => {
  const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña

  const handlePasswordChange = async () => {
    // Abre un SweetAlert para pedir la nueva contraseña
    const { value: password } = await noti.fire({
      title: 'Cambiar Contraseña',
      input: 'password',
      inputPlaceholder: 'Ingrese la nueva contraseña',
      inputAttributes: {
        maxlength: 50, // Ajusta la longitud máxima si es necesario
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (newPass) => {
        // Validación básica en frontend antes de enviar
        if (!validatePasswordChangeForm(newPass)) {
          return false; // SweetAlert no se cierra si devuelve false
        }
        return newPass; // Retorna la contraseña para que esté disponible en el resultado
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (password) {
      // Si el usuario ingresó una contraseña y la validación básica pasó
      // Llama a la función de actualizar contraseña del hook
      await updatePassword(password); // Aquí pasamos el texto plano, el backend lo hashea
      setNewPassword(""); // Limpia el campo de contraseña
    }
  };

  return (
    <div>
      {editarUsuario && (
        <div className="input-group mb-3">
          <span className="input-group-text">ID Usuario:</span>
          <input
            type="text"
            className="form-control"
            value={id_usuario}
            disabled
          />
        </div>
      )}
      <div className="input-group mb-3">
        <span className="input-group-text">Correo Electrónico:</span>
        <input
          type="email"
          onChange={(event) => setCorreoElectronico(event.target.value)}
          className="form-control"
          value={correo_electronico}
          placeholder="Ingrese el correo electrónico del usuario"
        />
      </div>

      {!editarUsuario && ( // Campo de contraseña solo para creación
        <div className="input-group mb-3">
          <span className="input-group-text">Contraseña:</span>
          <input
            type="password"
            onChange={(event) => setPasswordHash(event.target.value)}
            className="form-control"
            value={password_hash}
            placeholder="Ingrese la contraseña"
          />
        </div>
      )}

      {editarUsuario && ( // Botón para cambiar contraseña en modo edición
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-warning" onClick={handlePasswordChange}>
            Cambiar Contraseña
          </button>
        </div>
      )}

      <div className="input-group mb-3">
        <span className="input-group-text">Rol:</span>
        <select
          onChange={(event) => setIdRol(event.target.value)}
          className="form-control"
          value={id_rol}
        >
          <option value="">Seleccione un rol...</option>
          {listaRoles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="habilitadoCheck"
          checked={habilitado}
          onChange={(event) => setHabilitado(event.target.checked)}
        />
        <label className="form-check-label" htmlFor="habilitadoCheck">
          Habilitado
        </label>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-success" onClick={handleSubmit}>
          {editarUsuario ? "Actualizar Datos" : "Registrar Usuario"}
        </button>
        <button className="btn btn-danger" onClick={limpiarCampos}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default UserForm;
