// src/components/metodosPago/metodoPagoTableCrud.js
import React from "react";

const MetodoPagoTable = ({ listaMetodos, llenarParaEditar, remove }) => {
  return (
    <div className="table-responsive mt-4"> {/* Agregamos responsividad y margen superior */}
      <h4>Listado de Métodos de Pago</h4>
      <table className="table table-striped table-hover"> {/* Añadimos table-hover para interactividad */}
        <thead>
          <tr>
            <th scope="col">ID Método de Pago</th>
            <th scope="col">Nombre del Método</th>
          </tr>
        </thead>
        <tbody>
          {listaMetodos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay métodos de pago para mostrar.</td>
            </tr>
          ) : (
            listaMetodos.map((met) => (
              <tr
                key={met.id_metodoPago}
                style={{ cursor: 'pointer' }}
                onClick={() => llenarParaEditar(met)} // Al hacer clic en la fila, se autollena el formulario
              >
                <td>{met.id_metodoPago}</td>
                <td>{met.metodo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MetodoPagoTable;
