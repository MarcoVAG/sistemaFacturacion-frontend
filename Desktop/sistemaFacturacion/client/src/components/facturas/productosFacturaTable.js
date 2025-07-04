// productosFacturaTable.js
import React from "react";

const ProductTable = ({ listaDetalles, listaProductos, llenarParaEditar, remove }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio Unitario</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listaDetalles.map((det) => {
          // Buscar el nombre del producto usando el id_produto
          const productos = listaProductos.find(prod => prod.id_producto === det.id_producto_detalle);
          return (
            <tr key={det.id_orden_detalle}>
              <td>{productos ? productos.producto : "Sin producto"}</td>
              <td>{det.cantidad}</td>
              <td>${det.precioUnitario.toFixed(2)}</td>
              <td>${parseFloat(det.subtotal).toFixed(2)}</td>
               <td>
                <button className="btn btn-primary m-2" onClick={() => llenarParaEditar(det, productos)}>Editar</button>
                <button className="btn btn-danger m-2" onClick={() => remove(det.id_producto_detalle)}>Eliminar</button>
              </td> 
            </tr>
          );
        })}
      </tbody>
      <br></br><br></br><br></br>
    </table>
  );
};

export default ProductTable;