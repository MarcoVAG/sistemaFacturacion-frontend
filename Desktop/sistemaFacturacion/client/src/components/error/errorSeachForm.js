import React from "react";

const ErrorSearchForm = ({
    mensajeErrorBusqueda, setMensajeErrorBusqueda,
    detalleErrorBusqueda, setDetalleErrorBusqueda,
    lineaErrorBusqueda, setLineaErrorBusqueda,
    archivoErrorBusqueda, setArchivoErrorBusqueda,
    metodoErrorBusqueda, setMetodoErrorBusqueda,
    fechaHoraErrorBusqueda, setFechaHoraErrorBusqueda,
    pantallaOrigenBusqueda, setPantallaOrigenBusqueda,
    eventoOrigenBusqueda, setEventoOrigenBusqueda,
    usuarioIdBusqueda, setUsuarioIdBusqueda,
    ipUsuarioBusqueda, setIpUsuarioBusqueda,
    navegadorUsuarioBusqueda, setNavegadorUsuarioBusqueda,
    onShowAll, // Renombrado de getAllErrors
}) => {
    // Función para limpiar todos los campos de búsqueda en el formulario y luego mostrar todos
    const handleClearAndShowAll = () => {
        setMensajeErrorBusqueda('');
        setDetalleErrorBusqueda('');
        setLineaErrorBusqueda('');
        setArchivoErrorBusqueda('');
        setMetodoErrorBusqueda('');
        setFechaHoraErrorBusqueda('');
        setPantallaOrigenBusqueda('');
        setEventoOrigenBusqueda('');
        setUsuarioIdBusqueda('');
        setIpUsuarioBusqueda('');
        setNavegadorUsuarioBusqueda('');
        onShowAll(); // Llama a la función para mostrar todos los errores
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow-sm bg-light">
            <h4 className="mb-3 text-center text-primary">Buscar Errores</h4>
            <div className="row g-3"> {/* Usamos g-3 para espaciado entre columnas y filas */}

                {/* Mensaje de Error */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Mensaje Error:</span>
                        <input
                            type="text"
                            onChange={(e) => setMensajeErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={mensajeErrorBusqueda}
                            placeholder="Mensaje de error"
                        />
                    </div>
                </div>

                {/* Detalle de Error - Aumentar el ancho */}
                <div className="col-md-8"> {/* Cambiado a col-md-8 para darle más espacio */}
                    <div className="input-group">
                        <span className="input-group-text">Detalle Error:</span>
                        <input
                            type="text"
                            onChange={(e) => setDetalleErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={detalleErrorBusqueda}
                            placeholder="Detalle del error"
                        />
                    </div>
                </div>

                {/* Línea de Error */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Línea Error:</span>
                        <input
                            type="number"
                            onChange={(e) => setLineaErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={lineaErrorBusqueda}
                            placeholder="Número de línea"
                        />
                    </div>
                </div>

                {/* Archivo de Error */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Archivo Error:</span>
                        <input
                            type="text"
                            onChange={(e) => setArchivoErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={archivoErrorBusqueda}
                            placeholder="Nombre del archivo"
                        />
                    </div>
                </div>

                {/* Método de Error */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Método Error:</span>
                        <input
                            type="text"
                            onChange={(e) => setMetodoErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={metodoErrorBusqueda}
                            placeholder="Nombre del método"
                        />
                    </div>
                </div>

                {/* Fecha y Hora de Error */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Fecha/Hora Error:</span>
                        <input
                            type="date"
                            onChange={(e) => setFechaHoraErrorBusqueda(e.target.value)}
                            className="form-control"
                            value={fechaHoraErrorBusqueda}
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                </div>

                {/* Pantalla de Origen */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Pantalla Origen:</span>
                        <input
                            type="text"
                            onChange={(e) => setPantallaOrigenBusqueda(e.target.value)}
                            className="form-control"
                            value={pantallaOrigenBusqueda}
                            placeholder="Pantalla de origen"
                        />
                    </div>
                </div>

                {/* Evento de Origen */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Evento Origen:</span>
                        <input
                            type="text"
                            onChange={(e) => setEventoOrigenBusqueda(e.target.value)}
                            className="form-control"
                            value={eventoOrigenBusqueda}
                            placeholder="Evento de origen"
                        />
                    </div>
                </div>

                {/* ID de Usuario */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">ID Usuario:</span>
                        <input
                            type="number"
                            onChange={(e) => setUsuarioIdBusqueda(e.target.value)}
                            className="form-control"
                            value={usuarioIdBusqueda}
                            placeholder="ID del usuario"
                        />
                    </div>
                </div>

                {/* IP de Usuario */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">IP Usuario:</span>
                        <input
                            type="text"
                            onChange={(e) => setIpUsuarioBusqueda(e.target.value)}
                            className="form-control"
                            value={ipUsuarioBusqueda}
                            placeholder="IP del usuario"
                        />
                    </div>
                </div>

                {/* Navegador de Usuario */}
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Navegador Usuario:</span>
                        <input
                            type="text"
                            onChange={(e) => setNavegadorUsuarioBusqueda(e.target.value)}
                            className="form-control"
                            value={navegadorUsuarioBusqueda}
                            placeholder="Navegador del usuario"
                        />
                    </div>
                </div>

                {/* Botón Mostrar Todos */}
                <div className="col-12 d-flex justify-content-center mt-4">
                    <button className="btn btn-secondary" onClick={handleClearAndShowAll}>
                        <i className="bi bi-list-ul me-1"></i> Mostrar Todos los Errores
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorSearchForm;
