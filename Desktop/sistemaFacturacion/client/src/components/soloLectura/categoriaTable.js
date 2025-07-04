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
            </tr>
          </thead>
          <tbody>
            {listaCategorias.length > 0 ? (
              listaCategorias.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.id_categoria}</td>
                  <td>{cat.categoria}</td>
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