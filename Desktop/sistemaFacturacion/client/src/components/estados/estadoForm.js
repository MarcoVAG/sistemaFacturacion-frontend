  // src/components/estados/estadoForm.js
  import React from "react";

  const EstadoForm = ({
    id_estado, // Se usa para identificar el estado en modo edición
    estado, // Nombre del estado
    setEstado,
    editarEstado, // Booleano que indica si estamos editando (true) o creando (false)
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
          {editarEstado && ( // Solo muestra el ID si estamos editando
            <div className="col-md-6 mb-3">
              <label htmlFor="id_estado" className="form-label">
                ID Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="id_estado"
                value={id_estado}
                readOnly // El ID no debe ser editable
                disabled // Para que no se envíe en el formulario si no es necesario
              />
            </div>
          )}
          <div className="col-md-6 mb-3">
            <label htmlFor="estado" className="form-label">
              Nombre del Estado
            </label>
            <input
              type="text"
              onChange={(event) => setEstado(event.target.value)}
              className="form-control"
              id="estado"
              value={estado}
              placeholder="Ingrese el nombre del estado (ej. Pendiente, Pagado)"
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2"> {/* Usar gap-2 para espaciado */}
          <button type="submit" className={`btn ${editarEstado ? "btn-warning" : "btn-success"}`}>
            {editarEstado ? "Actualizar" : "Registrar"}
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

  export default EstadoForm;
