// src/services/errorService.js
import api from '../api/api'; // Asegúrate de que esta ruta sea correcta para tu instancia de Axios configurada

/**
 * Registra un nuevo error en la base de datos a través del backend.
 * Esta función es utilizada por el frontend para reportar errores.
 *
 * @param {object} errorData - Objeto con los detalles del error.
 * @param {string} errorData.mensajeError - Mensaje principal del error.
 * @param {string} [errorData.detalleError] - Detalles técnicos del error (stack trace).
 * @param {number} [errorData.lineaError] - Línea donde ocurrió el error.
 * @param {string} [errorData.archivoError] - Archivo donde ocurrió el error.
 * @param {string} [errorData.metodoError] - Método o función donde ocurrió el error.
 * @param {string} [errorData.pantallaOrigen] - Pantalla o componente donde ocurrió el error.
 * @param {string} [errorData.eventoOrigen] - Evento o acción que desencadenó el error.
 */
export const createError = async ({
    mensajeError,
    detalleError = null, // Esto debería ser el error.stack
    pantallaOrigen = 'Desconocida',
    eventoOrigen = 'Desconocido'
}) => {
    let archivoError = null;
    let metodoError = null;
    let lineaError = null;

    // Intentar parsear el stack trace para obtener archivo, línea y método
    if (detalleError && typeof detalleError === 'string') {
        const stackLines = detalleError.split('\n');
        // Buscar la primera línea relevante del stack que no sea interna del navegador o polyfill
        // Formatos comunes:
        //    at functionName (filePath:lineNumber:columnNumber)
        //    at filePath:lineNumber:columnNumber
        //    at <anonymous> (filePath:lineNumber:columnNumber)
        const relevantLine = stackLines.find(line =>
            line.includes('http://localhost') || line.includes('webpack-internal') || line.includes('at ')
        );

        if (relevantLine) {
            // Regex para capturar el método, archivo, línea y columna
            // Ej: at loginUser (http://localhost:3000/static/js/bundle.js:18999:11)
            // Ej: at http://localhost:3000/static/js/bundle.js:18999:11
            const match = relevantLine.match(/(at\s+)?(?:(.+)\s+\()?(?:(.*?):(\d+):(\d+)|(.*?))?\)?/);

            if (match) {
                // match[2] es el nombre de la función (ej. loginUser), si existe
                metodoError = match[2] || 'Anónimo';

                // match[3] es la ruta del archivo (ej. http://localhost:3000/static/js/bundle.js)
                // match[4] es la línea
                // match[5] es la columna
                archivoError = match[3] || match[6] || null; // match[6] para casos sin paréntesis
                lineaError = match[4] ? parseInt(match[4], 10) : null;

                // Limpiar el nombre del archivo para que sea más legible (ej. solo el nombre del bundle)
                if (archivoError) {
                    const parts = archivoError.split('/');
                    archivoError = parts[parts.length - 1].split('?')[0]; // Obtener solo el nombre del archivo y quitar query params
                }
            }
        }
    }

    try {
        const idUsuario = localStorage.getItem("idUsuario");
        const navegadorUsuario = navigator.userAgent;

        const errorPayload = {
            MensajeError: mensajeError,
            DetalleError: detalleError,
            LineaError: lineaError,
            ArchivoError: archivoError,
            MetodoError: metodoError,
            PantallaOrigen: pantallaOrigen,
            EventoOrigen: eventoOrigen,
            UsuarioId: idUsuario ? parseInt(idUsuario) : null,
            NavegadorUsuario: navegadorUsuario
        };

        const response = await api.post('/errores/create', errorPayload);

        if (response.status !== 201) {
            console.error('Error al reportar el error al backend:', response.data || 'Error desconocido.');
            throw new Error(`Fallo al reportar error: ${response.data || 'Error desconocido.'}`);
        } else {
            console.log('Error reportado exitosamente al backend.');
        }
    } catch (err) {
        console.error('Error crítico al intentar reportar un error:', err.response?.data || err.message);
        // Aquí puedes decidir si relanzar el error o simplemente loguearlo.
        // Para el reporte de errores, a menudo solo se loguea para no interrumpir el flujo principal.
        throw new Error("No se pudo reportar el error al servidor: " + (err.response?.data || err.message));
    }
};

/**
 * Obtiene todos los errores registrados en la base de datos.
 * @returns {Promise<Array<object>>} Un array de objetos, cada uno representando un error.
 * @throws {Error} Si ocurre un problema al obtener los errores.
 */
export const getAllErrors = async () => {
    try {
        const response = await api.get('/errores/selectAll');
        return response.data;
    } catch (error) {
        console.error("Error en getAllErrors:", error.response?.data || error.message);
        throw new Error("Error al obtener los errores: " + (error.response?.data || error.message));
    }
};

/**
 * Busca errores en la base de datos por varios campos de forma inteligente.
 * @param {object} params - Objeto con los parámetros de búsqueda.
 * @returns {Promise<Array<object>>} Un array de objetos de errores que coinciden con los criterios.
 * @throws {Error} Si ocurre un problema al buscar los errores.
 */
export const searchErrors = async (params) => {
    try {
        // Axios permite pasar un objeto 'params' para construir la query string
        const response = await api.get('/errores/search', { params });
        return response.data;
    } catch (error) {
        console.error("Error en searchErrors:", error.response?.data || error.message);
        throw new Error("Error en la búsqueda de errores: " + (error.response?.data || error.message));
    }
};
