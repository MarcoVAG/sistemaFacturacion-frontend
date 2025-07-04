// facuctTable.js
import React from "react";

const FacturaTable = ({ listaFacturas, listaClientes, listaEmpleados, listaEstados, listaMetodos }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Cliente</th>
          <th scope="col">Empleado</th>
          <th scope="col">Total</th>
          <th scope="col">Estado</th>
          <th scope="col">Método de Pago</th>
          <th scope="col">Fecha Emisión</th>
        </tr>
      </thead>
      <tbody>
        {listaFacturas.map((fac) => {
          const cliente = listaClientes.find(cli => cli.id_cliente === fac.id_cliente_orden);
          const empleado = listaEmpleados.find(emp => emp.id_empleado === fac.id_empleado_orden);
          const estado = listaEstados.find(est => est.id_estado === fac.id_estado_orden);
          const metodoPago = listaMetodos.find(met => met.id_metodoPago === fac.id_metodo_pago_orden);
          return (
            <tr key={fac.id_orden}>
              <td>{fac.id_orden}</td>
              <td>
                {cliente
                  ? `${cliente.nombre1 ?? ""} ${cliente.nombre2 ?? ""} ${cliente.apellido1 ?? ""} ${cliente.apellido2 ?? ""}`
                  : "Sin cliente"}
              </td>
              <td>
                {empleado
                  ? `${empleado.nombre1 ?? ""} ${empleado.nombre2 ?? ""} ${empleado.apellido1 ?? ""} ${empleado.apellido2 ?? ""}`
                  : "Sin empleado"}
              </td>

              <td>{fac.total}</td>
              <td>{estado ? estado.estado : "Sin estado"}</td>
              <td>{metodoPago ? metodoPago.metodo : "Sin metodo de pago"}</td>
              <td>{fac.fechaEmision}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FacturaTable;