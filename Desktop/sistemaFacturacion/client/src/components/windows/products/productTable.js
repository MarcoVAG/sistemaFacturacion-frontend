// ProductTable.js
import React from "react";

const ProductSearchTable = ({ listaProductos, listaCategorias, llenarParaEditar, remove }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Categoría</th>
        </tr>
      </thead>
      <tbody>
        {listaProductos.map((prod) => {
          // Buscar el nombre de la categoría usando el id_categoria_producto
          const categoria = listaCategorias.find(cat => cat.id_categoria === prod.id_categoria_producto);
          return (
            <tr key={prod.codigo}>
              <td>{prod.codigo}</td>
              <td>{prod.producto}</td>
              <td>{prod.precioUnitario}</td>
              <td>{prod.stock}</td>
              <td>{categoria ? categoria.categoria : "Sin categoría"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductSearchTable;