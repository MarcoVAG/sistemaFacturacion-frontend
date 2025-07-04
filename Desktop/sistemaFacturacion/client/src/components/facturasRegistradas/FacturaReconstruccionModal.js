import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { getOrderWithDetails } from "../../services/orderService";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FacturaReconstruccionModal = ({ id_orden, ordenData, onClose }) => {
    const [facturaCompleta, setFacturaCompleta] = useState(null);
    const [loading, setLoading] = useState(true);
    const invoiceRef = useRef();
    // Nuevo estado para controlar el modo de visualización (color por defecto)
    const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

    useEffect(() => {
        const fetchFacturaCompleta = async () => {
            try {
                setLoading(true);
                const data = await getOrderWithDetails(id_orden);
                setFacturaCompleta(data);
            } catch (error) {
                console.error("Error al cargar la factura completa:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id_orden) {
            fetchFacturaCompleta();
        }
    }, [id_orden]);

    const generatePdf = async () => {
        if (!invoiceRef.current) return;

        const input = invoiceRef.current;

        // 1. Activar el modo blanco y negro antes de la captura
        setIsBlackAndWhite(true);

        // Pequeño retardo para asegurar que los estilos se apliquen antes de la captura
        // Esto es crucial para que html2canvas capture los estilos actualizados
        await new Promise(resolve => setTimeout(resolve, 50)); 

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                windowWidth: input.scrollWidth,
                windowHeight: input.scrollHeight,
                // Ignorar elementos específicos si causan problemas (ej: si hay elementos interactivos que no quieres en el PDF)
                // ignoreElements: (element) => {
                //     return element.classList.contains('no-print');
                // }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`factura_${facturaCompleta.orden.id_orden}.pdf`);

        } catch (error) {
            console.error("Error al generar el PDF:", error);
            // Puedes mostrar un Swal.fire aquí si lo deseas
        } finally {
            // 2. Desactivar el modo blanco y negro después de la captura (o después de la descarga)
            setIsBlackAndWhite(false);
        }
    };

    if (loading) {
        return (
            <Modal show={true} onHide={onClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cargando Factura...</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <p className="mt-2">Obteniendo datos de la factura...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (!facturaCompleta) {
        return (
            <Modal show={true} onHide={onClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Factura no encontrada</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>No se pudieron cargar los datos de la factura.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const { orden, detalles } = facturaCompleta;

    // Clases CSS condicionales
    const invoiceClasses = `container p-4 my-4 border rounded shadow-sm bg-white ${isBlackAndWhite ? 'black-and-white-mode' : 'color-mode'}`;

    return (
        <Modal show={true} onHide={onClose} size="xl" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Factura #{orden.id_orden}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div ref={invoiceRef} className={invoiceClasses} style={{ fontFamily: 'Arial, sans-serif' }}>
                    <div className="text-center mb-4">
                        {/* Título principal: color condicional */}
                        <h3 className={`mb-0 ${isBlackAndWhite ? 'text-dark' : 'text-primary'}`}>FACTURA DE VENTA</h3>
                        <p className="text-muted">No. {orden.id_orden || 'N/A'}</p>
                    </div>

                    {/* Información de la Empresa */}
                    <div className="mb-4">
                        <p className="mb-1" style={{ fontSize: '10px' }}>Nombre de la Empresa S.A.</p>
                        <p className="mb-1" style={{ fontSize: '10px' }}>RUC: 1792XXXXXXX001</p>
                        <p className="mb-1" style={{ fontSize: '10px' }}>Dirección: Av. Principal y Calle Secundaria, Ciudad</p>
                        <p className="mb-1" style={{ fontSize: '10px' }}>Teléfono: (02) 123-4567</p>
                    </div>
                    <hr className="mb-4" />

                    <div className="row mb-4 pb-3">
                        <div className="col-md-6">
                            {/* Títulos de sección: color condicional */}
                            <h5 className={`mb-2 ${isBlackAndWhite ? 'text-dark' : 'text-info'}`}>Información del Cliente:</h5>
                            <p className="mb-1"><strong>Cédula:</strong> {orden.cliente.cedula}</p>
                            <p className="mb-1"><strong>Nombre:</strong> {orden.cliente.nombre}</p>
                            <p className="mb-1"><strong>Teléfono:</strong> {orden.cliente.telefono}</p>
                            <p className="mb-1"><strong>Dirección:</strong> {orden.cliente.direccion}</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            {/* Títulos de sección: color condicional */}
                            <h5 className={`mb-2 ${isBlackAndWhite ? 'text-dark' : 'text-info'}`}>Detalles de la Orden:</h5>
                            <p className="mb-1"><strong>Fecha Emisión:</strong> {orden.fechaEmision}</p>
                            {/* Badges: color condicional */}
                            <p className="mb-1"><strong>Estado:</strong> <span className={`badge ${isBlackAndWhite ? 'border border-dark text-dark bg-white' : 'bg-secondary'}`}>{orden.estado}</span></p>
                            <p className="mb-1"><strong>Método de Pago:</strong> <span className={`badge ${isBlackAndWhite ? 'border border-dark text-dark bg-white' : 'bg-success'}`}>{orden.metodoPago}</span></p>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Título de sección: color condicional */}
                    <h5 className={`mb-3 ${isBlackAndWhite ? 'text-dark' : 'text-info'}`}>Productos Adquiridos:</h5>
                    <table className="table table-striped table-bordered table-hover mb-4">
                        <thead className={`bg-light ${isBlackAndWhite ? 'text-dark' : ''}`}> {/* bg-light es un gris claro */}
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
                            {detalles.map((detalle) => (
                                <tr key={detalle.id_detalle}>
                                    <td>{detalle.codigo}</td>
                                    <td>{detalle.nombreProducto}</td>
                                    <td className="text-end">{detalle.cantidad}</td>
                                    <td className="text-end">${parseFloat(detalle.precioUnitario).toFixed(2)}</td>
                                    <td className="text-end">${parseFloat(detalle.iva).toFixed(2)}</td>
                                    <td className="text-end">${parseFloat(detalle.subtotal).toFixed(2)}</td>
                                </tr>
                            ))}
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
                                    {/* Fila de total: color condicional */}
                                    <tr className={isBlackAndWhite ? 'table-light text-dark' : 'table-primary'}>
                                        <td><strong>TOTAL A PAGAR:</strong></td>
                                        <td><strong>${(orden.total || 0).toFixed(2)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="mb-1">¡Gracias por su compra!</p>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Documento generado electrónicamente.</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* Botones */}
                <Button variant="success" onClick={generatePdf}>
                    Generar PDF (B/N)
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FacturaReconstruccionModal;