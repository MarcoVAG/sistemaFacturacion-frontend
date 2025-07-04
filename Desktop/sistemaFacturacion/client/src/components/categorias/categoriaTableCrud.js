// src/components/categorias/categoriaTableCrud.js
import React from "react";

const CategoriaTable = ({ listaCategorias, llenarParaEditar, remove }) => {
  return (
    <div className="mt-4">
      <h4>Listado de Categorías</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaCategorias.length > 0 ? (
              listaCategorias.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.id_categoria}</td>
                  <td>{cat.categoria}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => llenarParaEditar(cat)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(cat.id_categoria)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No hay categorías para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriaTable;