import React, { useState, useEffect } from "react";

const FacturaSearch = ({
  idBusqueda,
  setIdBusqueda,
  clienteBusqueda,
  setClienteBusqueda,
  listaClientes,
  setIdClienteBusqueda,
  buscarFacturas,
  getAll,
}) => {
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    if (clienteBusqueda.trim() === "") {
      setSugerencias([]);
      return;
    }

    // Convertir búsqueda y campos del cliente a minúsculas
    const busqueda = clienteBusqueda.toLowerCase();

    // Filtrar por nombre completo (nombre1, nombre2, apellido1, apellido2)
    const coincidencias = listaClientes.filter((cli) => {
      const nombreCompleto = `${cli.nombre1} ${cli.nombre2 || ""} ${cli.apellido1} ${cli.apellido2 || ""}`.toLowerCase();
      return nombreCompleto.includes(busqueda);
    });

    setSugerencias(coincidencias);

    // Si solo hay una coincidencia, buscar automáticamente
    if (coincidencias.length === 1) {
      const clienteEncontrado = coincidencias[0];
      setIdClienteBusqueda(clienteEncontrado.id_cliente);
      buscarFacturas(clienteEncontrado.id_cliente);
    } else {
      setIdClienteBusqueda("");
    }
  }, [clienteBusqueda, listaClientes, buscarFacturas, setIdClienteBusqueda]);

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text">Buscar por ID:</span>
        <input
          type="text"
          onChange={(e) => setIdBusqueda(e.target.value)}
          className="form-control"
          value={idBusqueda}
          placeholder="Ingrese el ID de la factura"
        />
      </div>

      <div className="input-group mb-3 position-relative">
        <span className="input-group-text">Buscar por Cliente:</span>
        <input
          type="text"
          onChange={(e) => setClienteBusqueda(e.target.value)}
          className="form-control"
          value={clienteBusqueda}
          placeholder="Nombre o apellido del cliente"
        />
        {sugerencias.length > 1 && (
          <ul
            className="list-group position-absolute"
            style={{ top: "100%", width: "100%", zIndex: 999 }}
          >
            {sugerencias.map((cli) => {
              const nombreCompleto = `${cli.nombre1} ${cli.nombre2 || ""} ${cli.apellido1} ${cli.apellido2 || ""}`;
              return (
                <li
                  key={cli.id_cliente}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setClienteBusqueda(nombreCompleto);
                    setIdClienteBusqueda(cli.id_cliente);
                    buscarFacturas(cli.id_cliente);
                    setSugerencias([]);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {nombreCompleto}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={getAll}>
          Mostrar Facturas
        </button>
      </div>
    </div>
  );
};

export default FacturaSearch;
