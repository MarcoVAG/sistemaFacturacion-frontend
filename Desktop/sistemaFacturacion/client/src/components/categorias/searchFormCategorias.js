// src/components/categorias/searchFormCategorias.js
import React from "react";

const SearchFormCategorias = ({
  idCategoriaBusqueda,
  setIdCategoriaBusqueda,
  nombreCategoriaBusqueda,
  setNombreCategoriaBusqueda,
  getAll, // Función para recargar todos los datos (útil para "mostrar todos")
}) => {
  const handleClear = () => {
    setIdCategoriaBusqueda("");
    setNombreCategoriaBusqueda("");
    getAll(); // Recarga todos los datos al limpiar la búsqueda
  };

  return (
    <div className="card-footer mt-4">
      <h5 className="mb-3">Búsqueda Inteligente de Categorías</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Buscar por ID"
            value={idCategoriaBusqueda}
            onChange={(e) => setIdCategoriaBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Nombre de Categoría"
            value={nombreCategoriaBusqueda}
            onChange={(e) => setNombreCategoriaBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <button className="btn btn-outline-secondary" onClick={handleClear}>
            Limpiar Búsqueda
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormCategorias;