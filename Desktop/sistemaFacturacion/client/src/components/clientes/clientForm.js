//src/components/clientes/clientForm

import React from "react";

const ClientForm = ({ cedula, setCedula, nombre1, setNombre1, nombre2, setNombre2, apellido1, setApellido1, apellido2, setApellido2, telefono, setTelefono, direccion, setDireccion, editarCliente, limpiarCampos, handleSubmit }) => {

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">Cédula:</span>
        <input
          type="text"
          onChange={(event) => setCedula(event.target.value)}
          className="form-control"
          value={cedula}
          placeholder="Ingrese la cédula del cliente"
          disabled={editarCliente}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Primer nombre:</span>
        <input
          type="text"
          onChange={(event) => setNombre1(event.target.value)}
          className="form-control"
          value={nombre1}
          placeholder="Ingrese el primer nombre"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Segundo nombre:</span>
        <input
          type="text"
          onChange={(event) => setNombre2(event.target.value)}
          className="form-control"
          value={nombre2}
          placeholder="Ingrese el segundo nombre"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Primer apellido:</span>
        <input
          type="text"
          onChange={(event) => setApellido1(event.target.value)}
          className="form-control"
          value={apellido1}
          placeholder="Ingrese el primer apellido"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Segundo apellido:</span>
        <input
          type="text"
          onChange={(event) => setApellido2(event.target.value)}
          className="form-control"
          value={apellido2}
          placeholder="Ingrese el segundo apellido"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Telefono:</span>
        <input
          type="text"
          onChange={(event) => setTelefono(event.target.value)}
          className="form-control"
          value={telefono}
          placeholder="Ingrese el teléfono"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Dirección:</span>
        <input
          type="text"
          onChange={(event) => setDireccion(event.target.value)}
          className="form-control"
          value={direccion}
          placeholder="Ingrese la dirección"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success" onClick={handleSubmit}>
          {editarCliente ? "Actualizar" : "Registrar"}
        </button>
        <button className="btn btn-danger" onClick={limpiarCampos}>
          Cancelar
        </button>
      </div>

    </div>
  );
};

export default ClientForm;