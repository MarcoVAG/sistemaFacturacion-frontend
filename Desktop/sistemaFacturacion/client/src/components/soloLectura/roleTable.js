// src/components/roles/crud/roleTableCrud.js
import React from "react";

const RoleTable = ({ listaRoles, llenarParaEditar, remove }) => {
  return (
    <div className="table-responsive mt-4"> {/* Agregamos responsividad y margen superior */}
      <table className="table table-striped table-hover"> {/* Añadimos table-hover para interactividad */}
        <thead>
          <tr>
            <th scope="col">ID Rol</th>
            <th scope="col">Nombre Rol</th>
            <th scope="col">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {listaRoles.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay roles para mostrar.</td>
            </tr>
          ) : (
            listaRoles.map((rol) => (
              <tr
                key={rol.id_rol}
                style={{ cursor: 'pointer' }}
                onClick={() => llenarParaEditar(rol)}
              >
                <td>{rol.id_rol}</td>
                <td>{rol.nombre_rol}</td>
                <td>{rol.descripcion || "N/A"}</td> {/* Muestra "N/A" si la descripción es nula */}
                <td>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
