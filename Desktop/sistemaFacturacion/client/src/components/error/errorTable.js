import React from "react";

/**
 * Componente funcional para mostrar una tabla de errores.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.listaErrores - Un array de objetos de error para mostrar.
 */
const ErrorTable = ({ listaErrores }) => {
    // Función para formatear la fecha y hora
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return '';
        try {
            const date = new Date(dateTimeString);
            return date.toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        } catch (e) {
            console.error("Error al formatear fecha:", dateTimeString, e);
            return dateTimeString;
        }
    };

    return (
        <div className="table-responsive mt-4">
            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" style={{ width: '3%' }}>ID</th>
                        <th scope="col" style={{ width: '20%' }}>Mensaje Error</th>
                        <th scope="col" style={{ width: '25%' }}>Detalle Error</th>
                        <th scope="col" style={{ width: '3%' }}>Línea</th>
                        <th scope="col" style={{ width: '4%' }}>Archivo</th>
                        <th scope="col" style={{ width: '6%' }}>Método</th>
                        <th scope="col" style={{ width: '9%' }}>Fecha/Hora</th>
                        <th scope="col" style={{ width: '6%' }}>Pantalla Origen</th>
                        <th scope="col" style={{ width: '6%' }}>Evento Origen</th>
                        <th scope="col" style={{ width: '2%' }}>ID Usuario</th>
                        <th scope="col" style={{ width: '3%' }}>IP Usuario</th>
                        <th scope="col" style={{ width: '3%' }}>Navegador Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {listaErrores.length === 0 ? (
                        <tr>
                            <td colSpan="12" className="text-center">No se encontraron errores.</td>
                        </tr>
                    ) : (
                        listaErrores.map((error) => (
                            <tr key={error.IdError}>
                                <td>{error.IdError}</td>
                                <td style={{ wordBreak: 'break-word' }}>{error.MensajeError}</td>
                                <td style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{error.DetalleError}</td>
                                <td>{error.LineaError}</td>
                                <td>{error.ArchivoError}</td>
                                <td>{error.MetodoError}</td>
                                <td>{formatDateTime(error.FechaHoraError)}</td>
                                <td>{error.PantallaOrigen}</td>
                                <td>{error.EventoOrigen}</td>
                                <td>{error.UsuarioId || 'N/A'}</td>
                                <td>{error.IPUsuario}</td>
                                <td style={{ wordBreak: 'break-word' }}>{error.NavegadorUsuario}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ErrorTable;
