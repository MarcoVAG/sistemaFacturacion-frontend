// ClientTable.js
import React from "react";

const ClientSearchTable = ({ listaClientes}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Cédula</th>
          <th scope="col">Primer Nombre</th>
          <th scope="col">Segundo Nombre</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Segundo Apellido</th>
          <th scope="col">Correo</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Dirección</th>
        </tr>
      </thead>
      <tbody>
        {listaClientes.map((cli) => (
          <tr key={cli.cedula}>
            <td>{cli.cedula}</td>
            <td>{cli.nombre1}</td>
            <td>{cli.nombre2}</td>
            <td>{cli.apellido1}</td>
            <td>{cli.apellido2}</td>
            <td>{cli.correo}</td>
            <td>{cli.telefono}</td>
            <td>{cli.direccion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientSearchTable;