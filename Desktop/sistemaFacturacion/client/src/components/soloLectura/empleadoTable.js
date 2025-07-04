const EmployeeTable = ({ listaEmpleados, llenarParaEditar }) => {
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
          {listaEmpleados.map((emp) => (
            <tr
              key={emp.cedula}
              style={{ cursor: "pointer" }}
              onClick={() => llenarParaEditar(emp)}
            >
              <td>{emp.cedula}</td>
              <td>{`${emp.nombre1 || ""} ${emp.nombre2 || ""}`}</td>
              <td>{`${emp.apellido1 || ""} ${emp.apellido2 || ""}`}</td>
              <td>{emp.telefono}</td>
              <td>{emp.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
