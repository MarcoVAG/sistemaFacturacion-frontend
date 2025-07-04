//src/components/productTable

import React from "react";

const ProductTable = ({ listaProductos, listaCategorias }) => {
  const handleProductClick = (codigo) => {
    // Envía el código del producto a la ventana que abrió esta ventana emergente
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ codigoProductoSeleccionado: codigo }, window.opener.location.origin);
    }
    // Cierra la ventana emergente
    window.close();
  };

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
          const categoria = listaCategorias.find(cat => cat.id_categoria === prod.id_categoria_producto);
          return (
            <tr
              key={prod.codigo}
              style={{ cursor: 'pointer' }}
              onClick={() => handleProductClick(prod.codigo)}
            >
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

export default ProductTable;