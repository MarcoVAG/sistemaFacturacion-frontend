import React from "react";

const SearchForm = ({
  codigoBusqueda,
  setCodigoBusqueda,
  productoBusqueda,
  setProductoBusqueda,
  precioBusqueda,
  setPrecioBusqueda,
  stockBusqueda,
  setStockBusqueda,
  categoriaBusqueda,
  setCategoriaBusqueda,
  imagenUrlBusqueda, // --- NUEVO: Prop para la URL de la imagen en búsqueda ---
  setImagenUrlBusqueda, // --- NUEVO: Setter para la URL de la imagen en búsqueda ---
  getAll,
  listaCategorias,
}) => {
  return (
    <div>
      {/* Código */}
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

      {/* Nombre del Producto */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Nombre:</span>
        <input
          type="text"
          onChange={(event) => setProductoBusqueda(event.target.value)}
          className="form-control"
          value={productoBusqueda}
          placeholder="Ingrese el nombre del producto"
        />
      </div>

      {/* Precio Unitario */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Precio:</span>
        <input
          type="number"
          step="0.01"
          onChange={(event) => setPrecioBusqueda(event.target.value)}
          className="form-control"
          value={precioBusqueda}
          placeholder="Ingrese el precio unitario"
        />
      </div>

      {/* Stock */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por Stock:</span>
        <input
          type="number"
          onChange={(event) => setStockBusqueda(event.target.value)}
          className="form-control"
          value={stockBusqueda}
          placeholder="Ingrese la cantidad de stock"
        />
      </div>

      {/* Categoría */}
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
              {cat.categoria}
            </option>
          ))}
        </select>
      </div>

      {/* --- NUEVO: Campo para buscar por URL de Imagen --- */}
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por URL Imagen:</span>
        <input
          type="text"
          onChange={(event) => setImagenUrlBusqueda(event.target.value)}
          className="form-control"
          value={imagenUrlBusqueda}
          placeholder="Ingrese parte de la URL de la imagen"
        />
      </div>

      {/* Botón Mostrar Todos */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={getAll}>
          Mostrar Todos los Productos
        </button>
      </div>
    </div>
  );
};

export default SearchForm;