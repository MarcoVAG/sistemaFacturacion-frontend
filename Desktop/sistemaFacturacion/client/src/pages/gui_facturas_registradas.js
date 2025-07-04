// src/pages/gui_facturas_registradas.js
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
import SearchFormOrdenVenta from "../components/facturasRegistradas/searchFormOrdenVenta.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import OrdenVentaTable from "../components/facturasRegistradas/ordenVentaTable.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import DetalleVentaModal from "../components/facturasRegistradas/DetalleVentaModal.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import FacturaReconstruccionModal from "../components/facturasRegistradas/FacturaReconstruccionModal.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import { useLoadDataOrdenVentaReg } from "../hooks/facturasRegistradas/useLoadDataOrdenVentaReg"; // *** NUEVO HOOK ***

const FacturasRegistradas = () => {
  const formRef = useRef(null);

  const [listaOrdenes, setListaOrdenes] = useState([]);
  
  const [searchParamsOrden, setSearchParamsOrden] = useState({
    id_orden: '',
    clienteCedula: '',
    clienteNombre: '',
    empleadoNombre: '',
    estadoNombre: '',
    metodoPagoNombre: '',
    total: '',
    fechaEmision: '',
  });

  // Estados para el Modal de Detalles de Venta
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [selectedOrdenIdForDetails, setSelectedOrdenIdForDetails] = useState(null);

  // Estados para el Modal de Reconstrucción de Factura
  const [showReconstruccionModal, setShowReconstruccionModal] = useState(false);
  const [selectedOrdenIdForReconstruction, setSelectedOrdenIdForReconstruction] = useState(null);
  const [selectedOrdenDataForReconstruction, setSelectedOrdenDataForReconstruction] = useState(null);

  // Obtener las funciones del hook
  const {
    loadOrdenes,
    buscarOrdenes,
  } = useLoadDataOrdenVentaReg({
    setListaOrdenes,
    searchParamsOrden,
  });

  // Cargar todas las órdenes de venta al inicio (solo una vez)
  useEffect(() => {
    loadOrdenes();
  }, [loadOrdenes]); // loadOrdenes es memoized en el hook, por lo que esta dependencia es estable

  // Efecto para la búsqueda de órdenes con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Verificar si al menos un campo de búsqueda tiene valor
      const hasSearchParams = Object.values(searchParamsOrden).some(param => 
        (typeof param === 'string' && param.trim() !== '') || 
        (typeof param === 'number' && param !== null && param !== '') // Para campos numéricos, considerar string vacío
      );

      if (hasSearchParams) {
        buscarOrdenes(); // Llama a la función de búsqueda
      } else {
        loadOrdenes(); // Si todos los campos de búsqueda están vacíos, recarga todas las órdenes
      }
    }, 300); // Retraso de 300ms

    return () => clearTimeout(delayDebounce);
  }, [
    searchParamsOrden, // ÚNICA dependencia que debe disparar este efecto de debounce
    // Se eliminan buscarOrdenes y loadOrdenes de aquí para evitar el bucle infinito.
    // Estas funciones ya son estables o se recrean de forma controlada por sus propias dependencias.
  ]);

  // Función para manejar el cambio en los campos de búsqueda
  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParamsOrden(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Funciones para abrir y cerrar Modals
  const handleShowDetalleModal = (id_orden) => {
    setSelectedOrdenIdForDetails(id_orden);
    setShowDetalleModal(true);
  };

  const handleCloseDetalleModal = () => {
    setShowDetalleModal(false);
    setSelectedOrdenIdForDetails(null);
  };

  const handleShowReconstruccionModal = (ordenData) => {
    setSelectedOrdenIdForReconstruction(ordenData.id_orden);
    setSelectedOrdenDataForReconstruction(ordenData); // Pasa todos los datos de la orden
    setShowReconstruccionModal(true);
  };

  const handleCloseReconstruccionModal = () => {
    setShowReconstruccionModal(false);
    setSelectedOrdenIdForReconstruction(null);
    setSelectedOrdenDataForReconstruction(null);
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">FACTURAS REGISTRADAS</div>
        <div className="card-body">
          <SearchFormOrdenVenta
            searchParamsOrden={searchParamsOrden}
            handleSearchParamChange={handleSearchParamChange}
            setSearchParamsOrden={setSearchParamsOrden} // Para la función de limpiar
            getAll={loadOrdenes} // Función para recargar todas las órdenes
          />
        </div>
      </div>
      <OrdenVentaTable
        listaOrdenes={listaOrdenes}
        onViewDetails={handleShowDetalleModal} // Función para abrir el modal de detalles
        onReconstructInvoice={handleShowReconstruccionModal} // Función para abrir el modal de reconstrucción
      />

      {/* Modal para ver detalles de la orden */}
      {showDetalleModal && (
        <DetalleVentaModal
          id_orden={selectedOrdenIdForDetails}
          onClose={handleCloseDetalleModal}
        />
      )}

      {/* Modal para reconstruir y generar PDF de la factura */}
      {showReconstruccionModal && (
        <FacturaReconstruccionModal
          id_orden={selectedOrdenIdForReconstruction}
          ordenData={selectedOrdenDataForReconstruction} // Pasa los datos completos de la orden
          onClose={handleCloseReconstruccionModal}
        />
      )}
    </div>
  );
};

export default FacturasRegistradas;