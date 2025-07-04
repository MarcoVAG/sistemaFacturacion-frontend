import React, { useState, useEffect, useCallback } from "react";
import { getAllErrors, searchErrors } from '../services/errorService'; // Importa el nuevo servicio de errores
import ErrorSearchForm from '../components/error/errorSeachForm'; // Importa el componente de búsqueda
import ErrorTable from '../components/error/errorTable'; // Importa el componente de tabla

const GuiErrores = () => {
    const [listaErrores, setListaErrores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para los campos de búsqueda
    const [mensajeErrorBusqueda, setMensajeErrorBusqueda] = useState('');
    const [detalleErrorBusqueda, setDetalleErrorBusqueda] = useState('');
    const [lineaErrorBusqueda, setLineaErrorBusqueda] = useState('');
    const [archivoErrorBusqueda, setArchivoErrorBusqueda] = useState('');
    const [metodoErrorBusqueda, setMetodoErrorBusqueda] = useState('');
    const [fechaHoraErrorBusqueda, setFechaHoraErrorBusqueda] = useState('');
    const [pantallaOrigenBusqueda, setPantallaOrigenBusqueda] = useState('');
    const [eventoOrigenBusqueda, setEventoOrigenBusqueda] = useState('');
    const [usuarioIdBusqueda, setUsuarioIdBusqueda] = useState('');
    const [ipUsuarioBusqueda, setIpUsuarioBusqueda] = useState('');
    const [navegadorUsuarioBusqueda, setNavegadorUsuarioBusqueda] = useState('');

    /**
     * Función para obtener todos los errores.
     * Se usa para la carga inicial y para el botón "Mostrar Todos".
     * Ya no limpia los campos de búsqueda aquí.
     */
    const fetchAllErrors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllErrors();
            setListaErrores(data);
        } catch (err) {
            setError(err.message);
            setListaErrores([]);
        } finally {
            setLoading(false);
        }
    }, []); // Ya no depende de clearAllSearchFields

    /**
     * Función para realizar la búsqueda de errores basada en los estados actuales de los campos de búsqueda.
     * Se llama explícitamente desde el useEffect con debounce.
     */
    const performSearch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                mensajeError: mensajeErrorBusqueda,
                detalleError: detalleErrorBusqueda,
                lineaError: lineaErrorBusqueda,
                archivoError: archivoErrorBusqueda,
                metodoError: metodoErrorBusqueda,
                fechaHoraError: fechaHoraErrorBusqueda,
                pantallaOrigen: pantallaOrigenBusqueda,
                eventoOrigen: eventoOrigenBusqueda,
                usuarioId: usuarioIdBusqueda,
                ipUsuario: ipUsuarioBusqueda,
                navegadorUsuario: navegadorUsuarioBusqueda,
            };

            // Eliminar parámetros vacíos para no enviarlos en la query string
            Object.keys(params).forEach(key => {
                if (!params[key]) {
                    delete params[key];
                }
            });

            const data = await searchErrors(params);
            setListaErrores(data);
        } catch (err) {
            setError(err.message);
            setListaErrores([]);
        } finally {
            setLoading(false);
        }
    }, [
        mensajeErrorBusqueda, detalleErrorBusqueda, lineaErrorBusqueda,
        archivoErrorBusqueda, metodoErrorBusqueda, fechaHoraErrorBusqueda,
        pantallaOrigenBusqueda, eventoOrigenBusqueda, usuarioIdBusqueda,
        ipUsuarioBusqueda, navegadorUsuarioBusqueda
    ]);

    // Efecto para cargar todos los errores al montar el componente (solo una vez)
    useEffect(() => {
        fetchAllErrors();
    }, [fetchAllErrors]);

    // Efecto para realizar la búsqueda cada vez que un parámetro de búsqueda cambia (búsqueda inteligente)
    useEffect(() => {
        const searchParams = [
            mensajeErrorBusqueda, detalleErrorBusqueda, lineaErrorBusqueda,
            archivoErrorBusqueda, metodoErrorBusqueda, fechaHoraErrorBusqueda,
            pantallaOrigenBusqueda, eventoOrigenBusqueda, usuarioIdBusqueda,
            ipUsuarioBusqueda, navegadorUsuarioBusqueda
        ];

        // Verificar si hay al menos un campo de búsqueda con valor
        const hasActiveSearchParams = searchParams.some(param => param !== '');

        // Limpiar el timeout anterior si existe
        const handler = setTimeout(() => {
            if (hasActiveSearchParams) {
                // Si hay parámetros, realizar la búsqueda
                performSearch();
            } else {
                // Si no hay parámetros activos (todos vacíos), cargar todos los errores
                // Esto maneja el caso donde el usuario borra todos los filtros
                fetchAllErrors();
            }
        }, 300); // Debounce de 300ms (puedes ajustar)

        return () => {
            clearTimeout(handler);
        };
    }, [
        mensajeErrorBusqueda, detalleErrorBusqueda, lineaErrorBusqueda,
        archivoErrorBusqueda, metodoErrorBusqueda, fechaHoraErrorBusqueda,
        pantallaOrigenBusqueda, eventoOrigenBusqueda, usuarioIdBusqueda,
        ipUsuarioBusqueda, navegadorUsuarioBusqueda, performSearch, fetchAllErrors
    ]);


    return (
        <div className="container-fluid mt-4">
            <h2 className="text-center mb-4">Gestión de Errores del Sistema</h2>

            {/* Formulario de Búsqueda */}
            <ErrorSearchForm
                mensajeErrorBusqueda={mensajeErrorBusqueda} setMensajeErrorBusqueda={setMensajeErrorBusqueda}
                detalleErrorBusqueda={detalleErrorBusqueda} setDetalleErrorBusqueda={setDetalleErrorBusqueda}
                lineaErrorBusqueda={lineaErrorBusqueda} setLineaErrorBusqueda={setLineaErrorBusqueda}
                archivoErrorBusqueda={archivoErrorBusqueda} setArchivoErrorBusqueda={setArchivoErrorBusqueda}
                metodoErrorBusqueda={metodoErrorBusqueda} setMetodoErrorBusqueda={setMetodoErrorBusqueda}
                fechaHoraErrorBusqueda={fechaHoraErrorBusqueda} setFechaHoraErrorBusqueda={setFechaHoraErrorBusqueda}
                pantallaOrigenBusqueda={pantallaOrigenBusqueda} setPantallaOrigenBusqueda={setPantallaOrigenBusqueda}
                eventoOrigenBusqueda={eventoOrigenBusqueda} setEventoOrigenBusqueda={setEventoOrigenBusqueda}
                usuarioIdBusqueda={usuarioIdBusqueda} setUsuarioIdBusqueda={setUsuarioIdBusqueda}
                ipUsuarioBusqueda={ipUsuarioBusqueda} setIpUsuarioBusqueda={setIpUsuarioBusqueda}
                navegadorUsuarioBusqueda={navegadorUsuarioBusqueda} setNavegadorUsuarioBusqueda={setNavegadorUsuarioBusqueda}
                onShowAll={fetchAllErrors} // Pasamos la función para mostrar todos (limpia y carga)
            />

            {/* Indicadores de estado */}
            {loading && (
                <div className="alert alert-info text-center mt-4" role="alert">
                    Cargando errores...
                </div>
            )}
            {error && (
                <div className="alert alert-danger text-center mt-4" role="alert">
                    Error: {error}
                </div>
            )}

            {/* Tabla de Errores */}
            {!loading && !error && (
                <ErrorTable listaErrores={listaErrores} />
            )}
        </div>
    );
};

export default GuiErrores;
