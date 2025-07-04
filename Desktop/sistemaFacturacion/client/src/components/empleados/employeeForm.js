// src/components/empleados/employeeForm.js
import React from "react";

const EmployeeForm = ({
  cedula,
  setCedula,
  nombre1,
  setNombre1,
  nombre2,
  setNombre2,
  apellido1,
  setApellido1,
  apellido2,
  setApellido2,
  telefono,
  setTelefono,
  direccion,
  setDireccion,
  editarEmpleado,
  limpiarCampos,
  handleSubmit,
  idUsuario, // Nuevo prop para el ID del usuario
  handleOpenUserModal, // Nuevo prop para abrir el modal de usuario
}) => {
  return (
    <div>
      {/* Campo para id_usuario y botón para crear usuario */}
      <div className="input-group mb-3">
        <span className="input-group-text">ID de Usuario:</span>
        <input
          type="text"
          className="form-control"
          value={idUsuario || ""} // Muestra el ID si está presente
          readOnly // Campo de solo lectura
          placeholder="Se asignará al crear un usuario"
        />
        {!editarEmpleado && ( // Muestra el botón solo cuando NO estamos editando un empleado
          <button
            className="btn btn-info"
            onClick={handleOpenUserModal}
            type="button" // Importante para que no actúe como submit del form
          >
            Crear Usuario
          </button>
        )}
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Cédula:</span>
        <input
          type="text"
          onChange={(e) => setCedula(e.target.value)}
          className="form-control"
          value={cedula}
          placeholder="Ingrese la cédula del empleado"
          disabled={editarEmpleado} // Deshabilita la cédula al editar
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Primer Nombre:</span>
        <input
          type="text"
          onChange={(e) => setNombre1(e.target.value)}
          className="form-control"
          value={nombre1}
          placeholder="Ingrese el primer nombre"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Segundo Nombre:</span>
        <input
          type="text"
          onChange={(e) => setNombre2(e.target.value)}
          className="form-control"
          value={nombre2}
          placeholder="Ingrese el segundo nombre"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Primer Apellido:</span>
        <input
          type="text"
          onChange={(e) => setApellido1(e.target.value)}
          className="form-control"
          value={apellido1}
          placeholder="Ingrese el primer apellido"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Segundo Apellido:</span>
        <input
          type="text"
          onChange={(e) => setApellido2(e.target.value)}
          className="form-control"
          value={apellido2}
          placeholder="Ingrese el segundo apellido"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Teléfono:</span>
        <input
          type="text"
          onChange={(e) => setTelefono(e.target.value)}
          className="form-control"
          value={telefono}
          placeholder="Ingrese el teléfono"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Dirección:</span>
        <input
          type="text"
          onChange={(e) => setDireccion(e.target.value)}
          className="form-control"
          value={direccion}
          placeholder="Ingrese la dirección"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={handleSubmit}
          // Deshabilita el botón de registrar si no hay id_usuario en modo creación
          disabled={!editarEmpleado && !idUsuario}
        >
          {editarEmpleado ? "Actualizar" : "Registrar"}
        </button>
        <button className="btn btn-danger" onClick={limpiarCampos}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;