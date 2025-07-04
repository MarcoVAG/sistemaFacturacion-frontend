// src/components/ordenVenta/searchFormOrdenVenta.js
import React from "react";

const SearchFormOrdenVenta = ({
  searchParamsOrden, // Objeto con todos los parámetros de búsqueda
  handleSearchParamChange, // Función para actualizar un parámetro específico
  setSearchParamsOrden, // Para resetear todos los parámetros
  getAll, // Función para recargar todas las órdenes (al limpiar)
}) => {
  const handleClear = () => {
    setSearchParamsOrden({ // Resetea todos los campos de búsqueda
      id_orden: '',
      clienteCedula: '',
      clienteNombre: '',
      empleadoNombre: '',
      estadoNombre: '',
      metodoPagoNombre: '',
      total: '',
      fechaEmision: '',
    });
    getAll(); // Recarga todas las órdenes al limpiar la búsqueda
  };

  return (
    <div className="card-footer mt-4">
      <h5 className="text-center mb-3">Búsqueda de Órdenes de Venta</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="id_orden" className="form-label visually-hidden">ID Orden</label>
          <input
            type="number"
            className="form-control"
            id="id_orden"
            name="id_orden"
            value={searchParamsOrden.id_orden}
            onChange={handleSearchParamChange}
            placeholder="Buscar por ID de Orden"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="clienteCedula" className="form-label visually-hidden">Cédula Cliente</label>
          <input
            type="text"
            className="form-control"
            id="clienteCedula"
            name="clienteCedula"
            value={searchParamsOrden.clienteCedula}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Cédula Cliente"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="clienteNombre" className="form-label visually-hidden">Nombre Cliente</label>
          <input
            type="text"
            className="form-control"
            id="clienteNombre"
            name="clienteNombre"
            value={searchParamsOrden.clienteNombre}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Nombre Cliente"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="empleadoNombre" className="form-label visually-hidden">Nombre Empleado</label>
          <input
            type="text"
            className="form-control"
            id="empleadoNombre"
            name="empleadoNombre"
            value={searchParamsOrden.empleadoNombre}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Nombre Empleado"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="estadoNombre" className="form-label visually-hidden">Estado</label>
          <input
            type="text"
            className="form-control"
            id="estadoNombre"
            name="estadoNombre"
            value={searchParamsOrden.estadoNombre}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Estado"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="metodoPagoNombre" className="form-label visually-hidden">Método de Pago</label>
          <input
            type="text"
            className="form-control"
            id="metodoPagoNombre"
            name="metodoPagoNombre"
            value={searchParamsOrden.metodoPagoNombre}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Método de Pago"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="total" className="form-label visually-hidden">Total</label>
          <input
            type="number" // Tipo number para valores numéricos
            step="0.01" // Permite decimales
            className="form-control"
            id="total"
            name="total"
            value={searchParamsOrden.total}
            onChange={handleSearchParamChange}
            placeholder="Buscar por Total"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="fechaEmision" className="form-label visually-hidden">Fecha Emisión</label>
          <input
            type="date" // Tipo date para un selector de fecha
            className="form-control"
            id="fechaEmision"
            name="fechaEmision"
            value={searchParamsOrden.fechaEmision}
            onChange={handleSearchParamChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-info" onClick={handleClear}>
          Limpiar Búsqueda / Mostrar Todas
        </button>
      </div>
    </div>
  );
};

export default SearchFormOrdenVenta;
