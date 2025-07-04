//src/components/clientes/crud/clientTableCrud

// Recibimos la función llenarParaEditar y remove como props
const ClientTable = ({ listaClientes, llenarParaEditar, remove }) => {
  // Eliminamos la función handleClientClick.
  // La lógica para rellenar el formulario se manejará directamente
  // con la prop 'llenarParaEditar' al hacer clic en la fila.
  // La lógica de window.opener no es necesaria para la edición en la misma página.

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
            <th>Acciones</th> {/* Columna solo para acciones como eliminar */}
          </tr>
        </thead>
        <tbody>
          {listaClientes.map((cliente) => (
            <tr
              key={cliente.cedula} // Usamos la cédula como key si es única
              style={{ cursor: 'pointer' }} // Indica que la fila es clickable
              // Al hacer clic en la fila, llamamos directamente a la función llenarParaEditar
              // y le pasamos el objeto 'cliente' completo.
              onClick={() => llenarParaEditar(cliente)}
            >
              <td>{cliente.cedula}</td>
              <td>{`${cliente.nombre1 || ''} ${cliente.nombre2 || ''}`}</td>
              <td>{`${cliente.apellido1 || ''} ${cliente.apellido2 || ''}`}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>
                {/* Botón de eliminar - Es importante detener la propagación del evento
                    para que el clic en el botón de eliminar no active también el clic de la fila. */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic del botón active el clic de la fila
                    remove(cliente.cedula); // Llama a la función remove con la cédula del cliente
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;