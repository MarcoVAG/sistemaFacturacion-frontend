// src/components/ordenVenta/ordenVentaTable.js
import React from "react";

const OrdenVentaTable = ({ listaOrdenes, onViewDetails, onReconstructInvoice }) => {
  return (
    <div className="table-responsive mt-4"> {/* Agregamos responsividad y margen superior */}
      <h4>Listado de Órdenes de Venta</h4>
      <table className="table table-striped table-hover"> {/* Añadimos table-hover para interactividad */}
        <thead>
          <tr>
            <th scope="col">ID Orden</th>
            <th scope="col">Cliente (Cédula / Nombre)</th>
            <th scope="col">Estado</th>
            <th scope="col">Método de Pago</th>
            <th scope="col">Total</th>
            <th scope="col">Fecha de Emisión</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaOrdenes.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No hay órdenes de venta para mostrar.</td>
            </tr>
          ) : (
            listaOrdenes.map((orden) => (
              <tr key={orden.id_orden}>
                <td>{orden.id_orden}</td>
                <td>{orden.clienteCedula} / {orden.clienteNombre1} {orden.clienteApellido1}</td>
                <td>{orden.nombre_estado}</td>
                <td>{orden.nombre_metodo}</td>
                <td>${parseFloat(orden.total).toFixed(2)}</td>
                <td>{orden.fechaEmision}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => onViewDetails(orden.id_orden)}
                  >
                    Ver Detalles
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onReconstructInvoice(orden)} // Pasa el objeto completo de la orden
                  >
                    Reconstruir Factura
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenVentaTable;
