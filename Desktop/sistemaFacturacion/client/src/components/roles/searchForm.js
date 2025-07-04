// src/components/roles/searchForm.js
import React from "react";

const SearchForm = ({
  idRolBusqueda,
  setIdRolBusqueda,
  nombreRolBusqueda,
  setNombreRolBusqueda,
  descripcionBusqueda,
  setDescripcionBusqueda,
  getAll, // Función para recargar todos los roles
}) => {
  return (
    <div className="card-footer mt-4"> {/* Agregamos margen superior para separar del formulario */}
      <h5 className="text-center mb-3">Búsqueda de Roles</h5>
      {/* ID Rol */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por ID:</span>
        <input
          type="number" // El ID es numérico
          onChange={(event) => setIdRolBusqueda(event.target.value)}
          className="form-control"
          value={idRolBusqueda}
          placeholder="Ingrese el ID del rol"
        />
      </div>

      {/* Nombre del Rol */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Nombre:</span>
        <input
          type="text"
          onChange={(event) => setNombreRolBusqueda(event.target.value)}
          className="form-control"
          value={nombreRolBusqueda}
          placeholder="Ingrese el nombre del rol"
        />
      </div>

      {/* Descripción */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Descripción:</span>
        <input
          type="text"
          onChange={(event) => setDescripcionBusqueda(event.target.value)}
          className="form-control"
          value={descripcionBusqueda}
          placeholder="Ingrese palabras clave de la descripción"
        />
      </div>

      {/* Botón Mostrar Todos */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-info m-2" onClick={getAll}> {/* Cambiado a btn-info para diferenciar */}
          Mostrar Todos los Roles
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
