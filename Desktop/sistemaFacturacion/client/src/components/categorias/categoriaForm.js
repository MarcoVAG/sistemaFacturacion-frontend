// src/components/categorias/categoriaForm.js
import React from "react";

const CategoriaForm = ({
  id_categoria,
  categoria,
  setCategoria,
  editarCategoria,
  handleSubmit,
  limpiarCampos,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        {editarCategoria && (
          <div className="col-md-6 mb-3">
            <label htmlFor="id_categoria" className="form-label">
              ID Categoría
            </label>
            <input
              type="text"
              className="form-control"
              id="id_categoria"
              value={id_categoria}
              readOnly // El ID no se edita directamente
              disabled // Para que no se envíe en el formulario si no es necesario
            />
          </div>
        )}
        <div className="col-md-6 mb-3">
          <label htmlFor="categoria" className="form-label">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ingrese el nombre de la categoría"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn ${editarCategoria ? "btn-warning" : "btn-success"} me-2`}>
            {editarCategoria ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={limpiarCampos}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoriaForm;