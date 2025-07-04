// SearchForm.js
import React from "react";

const searchClient = ({ cedulaBusqueda, setCedulaBusqueda, buscarClientes, getAll }) => {
  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Cédula:</span>
        <input
          type="text"
          onChange={(event) => setCedulaBusqueda(event.target.value)}
          className="form-control"
          value={cedulaBusqueda}
          placeholder="Ingrese la cédula del cliente"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={buscarClientes}>Buscar</button>
        <button className="btn btn-primary m-2" onClick={getAll}>Mostrar Clientes</button>
      </div>
    </div>
  );
};

export default searchClient;