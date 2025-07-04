// src/components/usuarios/searchForm.js
import React from "react";

const SearchForm = ({
  idUsuarioBusqueda,
  setIdUsuarioBusqueda,
  correoElectronicoBusqueda,
  setCorreoElectronicoBusqueda,
  habilitadoBusqueda,
  setHabilitadoBusqueda,
  rolBusqueda,
  setRolBusqueda,
  failedLoginAttemptsBusqueda, // NUEVO: Prop para intentos fallidos
  setFailedLoginAttemptsBusqueda, // NUEVO: Setter para intentos fallidos
  fechaCreacionBusqueda,         // NUEVO: Prop para fecha de creación
  setFechaCreacionBusqueda,       // NUEVO: Setter para fecha de creación
  listaRoles, // Lista de roles para el filtro
  getAll, // Función para recargar todos los usuarios
}) => {
  return (
    <div className="card-footer mt-4">
      <h5 className="text-center mb-3">Búsqueda de Usuarios</h5>
      {/* ID Usuario */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por ID:</span>
        <input
          type="number"
          onChange={(event) => setIdUsuarioBusqueda(event.target.value)}
          className="form-control"
          value={idUsuarioBusqueda}
          placeholder="Ingrese el ID del usuario"
        />
      </div>

      {/* Correo Electrónico */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Correo:</span>
        <input
          type="text"
          onChange={(event) => setCorreoElectronicoBusqueda(event.target.value)}
          className="form-control"
          value={correoElectronicoBusqueda}
          placeholder="Ingrese el correo electrónico"
        />
      </div>

      {/* Estado Habilitado */}
      <div className="input-group mb-3">
        <span className="input-group-text">Estado:</span>
        <select
          onChange={(event) => setHabilitadoBusqueda(event.target.value)}
          className="form-control"
          value={habilitadoBusqueda}
        >
          <option value="">Todos</option>
          <option value="true">Habilitado</option>
          <option value="false">Deshabilitado</option>
        </select>
      </div>

      {/* Rol */}
      <div className="input-group mb-3">
        <span className="input-group-text">Filtrar por Rol:</span>
        <select
          onChange={(event) => setRolBusqueda(event.target.value)}
          className="form-control"
          value={rolBusqueda}
        >
          <option value="">Todos los Roles</option>
          {listaRoles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>
      </div>

      {/* NUEVO: Intentos Fallidos */}
      <div className="input-group mb-3">
        <span className="input-group-text">Intentos Fallidos:</span>
        <input
          type="number"
          onChange={(event) => setFailedLoginAttemptsBusqueda(event.target.value)}
          className="form-control"
          value={failedLoginAttemptsBusqueda}
          placeholder="Número de intentos fallidos"
        />
      </div>

      {/* NUEVO: Fecha de Creación (Desde) */}
      <div className="input-group mb-3">
        <span className="input-group-text">Fecha Creación (Desde):</span>
        <input
          type="date"
          onChange={(event) => setFechaCreacionBusqueda(event.target.value)}
          className="form-control"
          value={fechaCreacionBusqueda}
        />
      </div>

      {/* Botón Mostrar Todos */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-info m-2" onClick={getAll}>
          Mostrar Todos los Usuarios
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
