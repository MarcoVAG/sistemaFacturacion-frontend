// src/components/ordenVenta/DetalleVentaModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { useLoadDataDetalleVentaReg } from "../../hooks/facturasRegistradas/useLoadDataDetallesVentaReg"; // Ruta corregida si es necesario

const DetalleVentaModal = ({ id_orden, onClose }) => {
  const [searchParamsDetalle, setSearchParamsDetalle] = useState({
    // id_orden_detalle no es un campo de búsqueda directo para el detalle individual en el frontend
    // ya que el modal ya está filtrado por id_orden.
    // id_detalle es el ID único del detalle.
    id_orden_detalle: '',
    id_producto_detalle: '',
    nombreProducto: '',
    codigo: '',
    cantidad: '',
    precioUnitario: '',
    iva: '',
    subtotal: '',
  });

  const { listaDetalles, loadingDetalles, loadDetalles, buscarDetalles } = useLoadDataDetalleVentaReg(
    id_orden,
    searchParamsDetalle
  );

  // Función para manejar el cambio en los campos de búsqueda
  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParamsDetalle(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Función para limpiar los campos de búsqueda y recargar todos los detalles
  const handleClearSearch = () => {
    setSearchParamsDetalle({
      id_orden_detalle: '',
      id_producto_detalle: '',
      nombreProducto: '',
      codigo: '',
      cantidad: '',
      precioUnitario: '',
      iva: '',
      subtotal: '',
    });
    // El useEffect con debounce en el hook se encargará de recargar los detalles al limpiar los parámetros.
  };

  return (
    <Modal show={true} onHide={onClose} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Orden #{id_orden}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center mb-3">Búsqueda de Detalles</h5>
        <Form>
          <Row className="mb-3 g-2">
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nombre Producto"
                  name="nombreProducto"
                  value={searchParamsDetalle.nombreProducto}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Código Producto"
                  name="codigo"
                  value={searchParamsDetalle.codigo}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Cantidad"
                  name="cantidad"
                  value={searchParamsDetalle.cantidad}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Precio Unitario"
                  name="precioUnitario"
                  value={searchParamsDetalle.precioUnitario}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="IVA"
                  name="iva"
                  value={searchParamsDetalle.iva}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Subtotal"
                  name="subtotal"
                  value={searchParamsDetalle.subtotal}
                  onChange={handleSearchParamChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="d-flex justify-content-center mt-3">
              <Button variant="info" onClick={handleClearSearch}>
                Limpiar Búsqueda / Mostrar Todos
              </Button>
            </Col>
          </Row>
        </Form>

        {loadingDetalles ? (
          <p className="text-center mt-4">Cargando detalles...</p>
        ) : listaDetalles.length === 0 ? (
          <p className="text-center mt-4">No hay detalles para esta orden o no se encontraron coincidencias.</p>
        ) : (
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>ID Detalle</th>
                <th>Producto</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>IVA</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {listaDetalles.map((detalle) => (
                <tr key={detalle.id_detalle}> {/* CORREGIDO: Usar id_detalle como key */}
                  <td>{detalle.id_orden_detalle}</td>
                  <td>{detalle.nombreProducto}</td>
                  <td>{detalle.codigo}</td>
                  <td>{detalle.cantidad}</td>
                  <td>${parseFloat(detalle.precioUnitario).toFixed(2)}</td>
                  <td>${parseFloat(detalle.iva).toFixed(2)}</td>
                  <td>${parseFloat(detalle.subtotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleVentaModal;
