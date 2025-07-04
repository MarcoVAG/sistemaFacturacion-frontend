//src/components/clientes/clientTable

import React from "react";

const ClientTable = ({ listaClientes }) => {
  const handleClientClick = (cedula) => {
    // Redirige a la página de facturación y pasa la cédula como parámetro de consulta
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ cedulaCliente: cedula }, window.opener.location.origin);
    }
    window.close();
  };

  return (
    <div className="card-body">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {listaClientes.map((cliente) => (
            <tr
              key={cliente.id_cliente}
              style={{ cursor: 'pointer' }} // Indica que la fila es clickable
              onClick={() => handleClientClick(cliente.cedula)} // Llama a la función al hacer clic
            >
              <td>{cliente.cedula}</td>
              <td>{`${cliente.nombre1} ${cliente.nombre2}`}</td>
              <td>{`${cliente.apellido1} ${cliente.apellido2}`}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
















/*
import React from "react";
import { useNavigate } from 'react-router-dom';

const ClientTable = ({ listaClientes }) => {
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

export default ClientTable;*/