// src/components/usuarios/crud/userTableCrud.js
import React from "react";

const UserTable = ({ listaUsuarios, llenarParaEditar, remove, toggleStatus }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID Usuario</th>
            <th scope="col">Correo Electrónico</th>
            <th scope="col">Rol</th>
            <th scope="col">Habilitado</th>
            <th scope="col">Intentos Fallidos</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No hay usuarios para mostrar.</td>
            </tr>
          ) : (
            listaUsuarios.map((user) => (
              <tr
                key={user.id_usuario}
                style={{ cursor: 'pointer' }}
                onClick={() => llenarParaEditar(user)}
              >
                <td>{user.id_usuario}</td>
                <td>{user.correo_electronico}</td>
                <td>{user.nombre_rol || "N/A"}</td> {/* Muestra el nombre del rol */}
                <td>{user.habilitado ? "Sí" : "No"}</td>
                <td>{user.failed_login_attempts}</td>
                <td>{new Date(user.fecha_creacion).toLocaleDateString()}</td> {/* Formatea la fecha */}
                <td>
                  <div className="d-flex gap-1"> {/* Para alinear los botones */}
                    <button
                      className={`btn btn-sm ${user.habilitado ? 'btn-warning' : 'btn-success'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(user.id_usuario, user.habilitado);
                      }}
                    >
                      {user.habilitado ? "Deshabilitar" : "Habilitar"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(user.id_usuario);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
