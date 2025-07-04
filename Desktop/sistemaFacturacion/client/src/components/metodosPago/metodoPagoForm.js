// src/components/metodosPago/metodoPagoForm.js
import React from "react";

const MetodoPagoForm = ({
  id_metodoPago, // Se usa para identificar el método de pago en modo edición
  metodo, // Nombre del método de pago
  setMetodo,
  editarMetodo, // Booleano que indica si estamos editando (true) o creando (false)
  limpiarCampos,
  handleSubmit, // Función que se ejecuta al enviar el formulario (add o edit)
}) => {
  const onSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        {editarMetodo && ( // Solo muestra el ID si estamos editando
          <div className="col-md-6 mb-3">
            <label htmlFor="id_metodoPago" className="form-label">
              ID Método de Pago
            </label>
            <input
              type="text"
              className="form-control"
              id="id_metodoPago"
              value={id_metodoPago}
              readOnly // El ID no debe ser editable
              disabled // Para que no se envíe en el formulario si no es necesario
            />
          </div>
        )}
        <div className="col-md-6 mb-3">
          <label htmlFor="metodo" className="form-label">
            Nombre del Método de Pago
          </label>
          <input
            type="text"
            onChange={(event) => setMetodo(event.target.value)}
            className="form-control"
            id="metodo"
            value={metodo}
            placeholder="Ingrese el nombre del método de pago (ej. Tarjeta de Crédito, Efectivo)"
            required
          />
        </div>
      </div>
      <div className="d-flex justify-content-center gap-2"> {/* Usar gap-2 para espaciado */}
        <button type="submit" className={`btn ${editarMetodo ? "btn-warning" : "btn-success"}`}>
          {editarMetodo ? "Actualizar" : "Registrar"}
        </button>
        <button
          type="button" // Importante: type="button" para evitar que envíe el formulario
          className="btn btn-danger"
          onClick={limpiarCampos}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default MetodoPagoForm;
