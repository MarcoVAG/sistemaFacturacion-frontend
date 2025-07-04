// SearchForm.js
import React from "react";

const SearchForm = ({ codigoBusqueda, setCodigoBusqueda, categoriaBusqueda, setCategoriaBusqueda, buscarProductos, getAll , listaCategorias, id_categoria_producto, setIdCategoria}) => {
  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Código:</span>
        <input
          type="text"
          onChange={(event) => setCodigoBusqueda(event.target.value)}
          className="form-control"
          value={codigoBusqueda}
          placeholder="Ingrese el código del producto"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Categoría:</span>
        <select
          onChange={(event) => setCategoriaBusqueda(event.target.value)}
          className="form-control"
          value={categoriaBusqueda}
        >
          <option value="">Seleccione una categoría...</option>
          {listaCategorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.categoria} {/* Asegúrate de que 'categoria' es el nombre que deseas mostrar */}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={buscarProductos}>Buscar</button>
        <button className="btn btn-primary m-2" onClick={getAll}>Mostrar Productos</button>
      </div>
    </div>
  );
};

export default SearchForm;