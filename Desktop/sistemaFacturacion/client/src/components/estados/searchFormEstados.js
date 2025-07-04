// src/components/estados/searchFormEstados.js
import React from "react";

const SearchFormEstados = ({
  terminoBusqueda,
  setTerminoBusqueda,
  getAll, // Función para recargar todos los estados
}) => {
  const handleClear = () => {
    setTerminoBusqueda(""); // Limpia el campo de búsqueda
    getAll(); // Recarga todos los estados
  };

  return (
    <div className="card-footer mt-4"> {/* Agregamos margen superior para separar del formulario */}
      <h5 className="text-center mb-3">Búsqueda Inteligente de Estados</h5>
      {/* Campo de búsqueda por término */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar:</span>
        <input
          type="text"
          onChange={(event) => setTerminoBusqueda(event.target.value)}
          className="form-control"
          value={terminoBusqueda}
          placeholder="Buscar por ID o nombre de estado"
        />
      </div>

      {/* Botón Limpiar Búsqueda */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-info m-2" onClick={handleClear}>
          Limpiar Búsqueda / Mostrar Todos
        </button>
      </div>
    </div>
  );
};

export default SearchFormEstados;
