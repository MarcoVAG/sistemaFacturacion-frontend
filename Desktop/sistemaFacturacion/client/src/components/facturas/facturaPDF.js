import React, { forwardRef } from 'react';
import { jsPDF } from 'jspdf';
// Si tienes un archivo CSS específico para el HTML de la factura, puedes mantenerlo.
// Para el PDF, el estilo se define directamente en el JS.
// import '../styles/facturaPDF.css'; // Comentado si no es necesario para el HTML

// El componente FacturaPDF recibe 'orden', 'listaDetalles', 'listaProductos', 'listaEstado', 'listaMetodoPago'
const FacturaPDF = forwardRef(({ orden, listaDetalles, listaProductos, listaEstado, listaMetodoPago }, ref) => {

    // Funciones para obtener nombres a partir de IDs (necesarias porque gui_factura.js pasa los IDs)
    const obtenerEstado = (id_estado) => {
        const estadoObj = listaEstado.find(est => String(est.id_estado) === String(id_estado));
        return estadoObj ? estadoObj.estado : 'No encontrado';
    };

    const obtenerMetodoPago = (id_metodoPago) => {
        const metodoObj = listaMetodoPago.find(met => String(met.id_metodoPago) === String(id_metodoPago));
        return metodoObj ? metodoObj.metodo : 'No encontrado';
    };

    // Función para obtener el producto por su ID de detalle
    const obtenerProductoPorIdDetalle = (id_producto_detalle) => {
        return listaProductos.find(prod => prod.id_producto === id_producto_detalle) || { producto: 'Producto no encontrado', codigo: 'N/A' };
    };

    // --- handlePrint RE-INTRODUCIDO aquí ---
    const handlePrint = () => {
        const doc = new jsPDF('p', 'mm', 'a4'); // 'p' para portrait, 'mm' para milímetros, 'a4' tamaño
        const margin = 15;
        let y = margin; // Posición vertical inicial

        // --- ENCABEZADO DE LA FACTURA ---
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.text("FACTURA DE VENTA", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
        y += 10;
        doc.setFontSize(14);
        doc.setFont("Helvetica", "normal");
        // Usamos orden.id_orden_detalle si existe, de lo contrario 'N/A'
        doc.text(`No. ${orden.id_orden_detalle || 'N/A'}`, doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
        y += 15;

        // --- INFORMACIÓN DE LA EMPRESA (Ejemplo, puedes personalizarla) ---
        doc.setFontSize(10);
        doc.text("Nombre de la Empresa S.A.", margin, y);
        y += 5;
        doc.text("RUC: 1792XXXXXXX001", margin, y);
        y += 5;
        doc.text("Dirección: Av. Principal y Calle Secundaria, Ciudad", margin, y);
        y += 5;
        doc.text("Teléfono: (02) 123-4567", margin, y);
        y += 10; // Espacio después de la información de la empresa

        // Línea divisoria
        doc.setDrawColor(0, 0, 0); // Color negro
        doc.setLineWidth(0.5);
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 5; // Espacio después de la línea

        // --- INFORMACIÓN DEL CLIENTE Y ORDEN ---
        doc.setFontSize(12);
        doc.setFont("Helvetica", "bold");
        doc.text("Información del Cliente:", margin, y);
        doc.text("Detalles de la Orden:", doc.internal.pageSize.getWidth() / 2, y);
        y += 7; // Increment y for the next lines (client info)
        doc.setFont("Helvetica", "normal");

        // Store the starting Y for both columns to align them
        const clientInfoStartY = y;
        let currentYClient = clientInfoStartY;

        // Columna izquierda (Cliente)
        doc.text(`Cédula: ${orden.clienteCedula}`, margin, currentYClient);
        currentYClient += 5;
        doc.text(`Cliente: ${orden.clienteNombre}`, margin, currentYClient);
        currentYClient += 5;
        currentYClient += 5;
        doc.text(`Teléfono: ${orden.clienteTelefono}`, margin, currentYClient);
        currentYClient += 5;
        doc.text(`Dirección: ${orden.clienteDireccion}`, margin, currentYClient);

        // Columna derecha (Orden) - Start at the same Y level as the client info
        let currentYOrder = clientInfoStartY; // Start at the same level as client info

        doc.text(`Fecha Emisión: ${orden.fechaEmision}`, doc.internal.pageSize.getWidth() / 2, currentYOrder);
        currentYOrder += 5;
        currentYOrder += 5;
        doc.text(`Estado: ${obtenerEstado(orden.id_estado)}`, doc.internal.pageSize.getWidth() / 2, currentYOrder);
        currentYOrder += 5;
        doc.text(`Método de Pago: ${obtenerMetodoPago(orden.id_metodoPago)}`, doc.internal.pageSize.getWidth() / 2, currentYOrder);
        currentYOrder += 5;
        // Asumiendo que orden.empleado es el nombre del empleado que viene de gui_factura.js
        // Si no, necesitarías una prop 'listaEmpleados' y una función 'obtenerEmpleado'

        // Update 'y' to be the max of both columns' final positions, plus some spacing
        y = Math.max(currentYClient, currentYOrder) + 10;
        
        // Línea divisoria
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 5;

        // --- DETALLES DE PRODUCTOS (TABLA) ---
        doc.setFontSize(14);
        doc.setFont("Helvetica", "bold");
        doc.text("Detalles de Productos", margin, y);
        y += 10;

        // Encabezados de la tabla
        const headers = ["Código", "Producto", "Cant.", "P. Unit.", "IVA", "Subtotal"];
        const columnWidths = [25, 65, 20, 25, 20, 30]; // Anchos ajustados para A4
        const startX = margin;
        let currentX = startX;

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10); // Tamaño de fuente para encabezados de tabla
        headers.forEach((header, i) => {
            doc.text(header, currentX, y);
            currentX += columnWidths[i];
        });
        y += 5;
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y); // Línea debajo de encabezados
        y += 5;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10); // Tamaño de fuente para contenido de tabla

        // Dibujar filas de productos
        listaDetalles.forEach((detalle) => {
            const producto = obtenerProductoPorIdDetalle(detalle.id_producto_detalle);
            // Asegurarse de que los valores sean numéricos antes de toFixed
            const cantidad = detalle.cantidad;
            const precioUnitario = parseFloat(detalle.precioUnitario).toFixed(2);
            const iva = parseFloat(detalle.iva).toFixed(2);
            const subtotal = parseFloat(detalle.subtotal).toFixed(2);

            const fila = [
                producto.codigo,
                producto.producto,
                String(cantidad),
                precioUnitario,
                iva,
                subtotal,
            ];

            let rowHeight = 6; // Altura de fila por defecto
            currentX = startX;
            fila.forEach((item, i) => {
                const textLines = doc.splitTextToSize(item, columnWidths[i] - 2); // Restar un poco para padding
                doc.text(textLines, currentX, y);
                rowHeight = Math.max(rowHeight, textLines.length * 4); // Ajustar altura de fila si hay texto multilínea
                currentX += columnWidths[i];
            });
            y += rowHeight + 2; // Mover a la siguiente línea, con un pequeño espacio
        });

        // Línea divisoria antes de totales
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 5;

        // --- TOTALES DE LA FACTURA ---
        doc.setFontSize(12);
        doc.setFont("Helvetica", "bold");
        const totalX = doc.internal.pageSize.getWidth() - margin - 40; // Posición para los totales a la derecha

        doc.text(`Subtotal: $${(orden.subtotal || 0).toFixed(2)}`, totalX, y);
        y += 7;
        doc.text(`IVA: $${(orden.iva || 0).toFixed(2)}`, totalX, y);
        y += 7;
        doc.setFontSize(14);
        doc.text(`TOTAL: $${(orden.total || 0).toFixed(2)}`, totalX, y);
        y += 15;

        // --- MENSAJE FINAL ---
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        doc.text("¡Gracias por su compra!", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
        y += 5;
        doc.text("Documento generado electrónicamente.", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });

        doc.save(`factura_${orden.id_orden_detalle || 'nueva_orden'}.pdf`);
    };

    // --- HTML QUE SE RENDERIZA EN EL COMPONENTE REACT ---
    // Este HTML es lo que el usuario ve en la interfaz antes de generar el PDF.
    // Lo he estilizado con clases de Bootstrap para que se vea bien en el navegador.
    return (
        <div ref={ref} className="container p-4 my-0 border rounded shadow-sm bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="text-center mb-4">
                <h4 className="mb-0 text-primary">FACTURA DE VENTA</h4>
                <p className="text-muted">No. {orden.id_orden_detalle || 'N/A'}</p>
            </div>

            <div className="row mb-4 pb-3 border-bottom">
                <div className="col-md-6">
                    <h5 className="mb-2 text-info">Información del Cliente:</h5>
                    <p className="mb-1"><strong>Cédula:</strong> {orden.clienteCedula}</p>
                    <p className="mb-1"><strong>Nombre:</strong> {orden.clienteNombre}</p>
                    <p className="mb-1"><strong>Teléfono:</strong> {orden.clienteTelefono}</p>
                    <p className="mb-1"><strong>Dirección:</strong> {orden.clienteDireccion}</p>
                </div>
                <div className="col-md-6 text-md-end">
                    <h5 className="mb-2 text-info">Detalles de la Orden:</h5>
                    <p className="mb-1"><strong>Fecha Emisión:</strong> {orden.fechaEmision}</p>
                    <p className="mb-1"><strong>Estado:</strong> <span className="badge bg-secondary">{obtenerEstado(orden.id_estado)}</span></p>
                    <p className="mb-1"><strong>Método de Pago:</strong> <span className="badge bg-success">{obtenerMetodoPago(orden.id_metodoPago)}</span></p>
                </div>
            </div>

            <h5 className="mb-3 text-info">Productos Adquiridos:</h5>
            <table className="table table-striped table-bordered table-hover mb-4">
                <thead className="bg-light">
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">P. Unitario</th>
                        <th className="text-end">IVA</th>
                        <th className="text-end">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDetalles.map((detalle) => {
                        const producto = obtenerProductoPorIdDetalle(detalle.id_producto_detalle);
                        return (
                            <tr key={detalle.id_detalle || Math.random()}>
                                <td>{producto.codigo}</td>
                                <td>{producto.producto}</td>
                                <td className="text-end">{detalle.cantidad}</td>
                                <td className="text-end">${parseFloat(detalle.precioUnitario).toFixed(2)}</td>
                                <td className="text-end">${parseFloat(detalle.iva).toFixed(2)}</td>
                                <td className="text-end">${parseFloat(detalle.subtotal).toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="row justify-content-end">
                <div className="col-md-5">
                    <table className="table table-bordered text-end">
                        <tbody>
                            <tr>
                                <td><strong>Subtotal:</strong></td>
                                <td>${(orden.subtotal || 0).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>IVA:</strong></td>
                                <td>${(orden.iva || 0).toFixed(2)}</td>
                            </tr>
                            <tr className="table-primary">
                                <td><strong>TOTAL A PAGAR:</strong></td>
                                <td><strong>${(orden.total || 0).toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Botón de Generar PDF re-introducido aquí */}
            <div className="text-center mt-4">
                <button className="btn btn-success" onClick={handlePrint}>
                    Generar PDF de Factura
                </button>
            </div>
        </div>
    );
});

export default FacturaPDF;