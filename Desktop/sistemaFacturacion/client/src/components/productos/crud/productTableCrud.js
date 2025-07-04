import React from "react";

const ProductTable = ({ listaProductos, listaCategorias, llenarParaEditar, remove }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Categoría</th>
          <th scope="col">Imagen</th> {/* --- NUEVO: Columna para la imagen --- */}
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listaProductos.map((prod) => {
          const categoria = listaCategorias.find(cat => cat.id_categoria === prod.id_categoria_producto);
          return (
            <tr
              key={prod.codigo}
              style={{ cursor: 'pointer' }}
              onClick={() => llenarParaEditar(prod)}
            >
              <td>{prod.codigo}</td>
              <td>{prod.producto}</td>
              <td>{prod.precioUnitario}</td>
              <td>{prod.stock}</td>
              <td>{categoria ? categoria.categoria : "Sin categoría"}</td>
              {/* --- NUEVO: Celda para la imagen --- */}
              <td>
                {prod.imagenUrl ? (
                  <img
                    src={prod.imagenUrl}
                    alt={prod.producto}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder-image.jpg"; }} // Fallback
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(prod.codigo);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;