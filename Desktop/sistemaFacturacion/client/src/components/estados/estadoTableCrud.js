// src/components/estados/estadoTableCrud.js
import React from "react";

const EstadoTable = ({ listaEstados, llenarParaEditar, remove }) => {
  return (
    <div className="table-responsive mt-4"> {/* Agregamos responsividad y margen superior */}
      <h4>Listado de Estados de Factura</h4>
      <table className="table table-striped table-hover"> {/* Añadimos table-hover para interactividad */}
        <thead>
          <tr>
            <th scope="col">ID Estado</th>
            <th scope="col">Nombre del Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaEstados.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay estados para mostrar.</td>
            </tr>
          ) : (
            listaEstados.map((est) => (
              <tr
                key={est.id_estado}
                style={{ cursor: 'pointer' }}
                onClick={() => llenarParaEditar(est)} // Al hacer clic en la fila, se autollena el formulario
              >
                <td>{est.id_estado}</td>
                <td>{est.estado}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el clic del botón active el clic de la fila
                      remove(est.id_estado); // Llama a la función remove con el ID del estado
                    }}
                  >
                    Eliminar
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

export default EstadoTable;
