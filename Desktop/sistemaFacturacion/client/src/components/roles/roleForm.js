// src/components/roles/roleForm.js
import React from "react";

const RoleForm = ({
  id_rol, // Se usa para identificar el rol en modo edición
  nombre_rol,
  setNombreRol,
  descripcion,
  setDescripcion,
  editarRol, // Booleano que indica si estamos editando (true) o creando (false)
  limpiarCampos,
  handleSubmit, // Función que se ejecuta al enviar el formulario (add o edit)
}) => {
  return (
    <div>
      {editarRol && ( // Solo muestra el ID si estamos editando
        <div className="input-group mb-3">
          <span className="input-group-text">ID Rol:</span>
          <input
            type="text"
            className="form-control"
            value={id_rol}
            disabled // El ID no debe ser editable
          />
        </div>
      )}
      <div className="input-group mb-3">
        <span className="input-group-text">Nombre Rol:</span>
        <input
          type="text"
          onChange={(event) => setNombreRol(event.target.value)}
          className="form-control"
          value={nombre_rol}
          placeholder="Ingrese el nombre del rol (ej. Administrador)"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Descripción:</span>
        <textarea
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
          value={descripcion}
          placeholder="Ingrese una descripción para el rol (opcional)"
          rows="3"
        ></textarea>
      </div>

      <div className="d-flex justify-content-center gap-2"> {/* Usar gap-2 para espaciado */}
        <button className="btn btn-success" onClick={handleSubmit}>
          {editarRol ? "Actualizar" : "Registrar"}
        </button>
        <button className="btn btn-danger" onClick={limpiarCampos}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RoleForm;
