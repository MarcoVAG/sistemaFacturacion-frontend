// src/hooks/ordenVenta/useLoadDataOrdenVentaReg.js
import { useCallback } from "react";
import { getAllOrders, searchOrder } from "../../services/orderService"; // Usar el servicio de órdenes existente
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataOrdenVentaReg = ({
  setListaOrdenes,
  searchParamsOrden, // Ahora se espera un objeto con los parámetros de búsqueda
}) => {
  /**
   * Carga todas las órdenes de venta desde el servicio y actualiza el estado `listaOrdenes`.
   */
  const loadOrdenes = useCallback(async () => {
    try {
      const ordenes = await getAllOrders();
      setListaOrdenes(ordenes);
    } catch (error) {
      noti.fire({ icon: "error", title: "Error al cargar órdenes de venta", text: error.message });
    }
  }, [setListaOrdenes]);

  /**
   * Realiza una búsqueda de órdenes de venta basada en los criterios de búsqueda actuales
   * y actualiza el estado `listaOrdenes`.
   */
  const buscarOrdenes = useCallback(async () => {
    // Verificar si al menos un campo de búsqueda tiene valor
    const hasSearchParams = Object.values(searchParamsOrden).some(param => param && String(param).trim() !== '');

    if (!hasSearchParams) {
      // Si no hay parámetros de búsqueda, cargar todas las órdenes
      loadOrdenes();
      return;
    }

    try {
      // Pasar el objeto completo de parámetros de búsqueda al servicio
      const ordenes = await searchOrder(searchParamsOrden); 
      if (ordenes.length === 0) {
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron órdenes de venta que coincidan con los criterios.",
        });
      }
      setListaOrdenes(ordenes);
    } catch (error) {
      noti.fire({ icon: "error", title: "Error en la búsqueda", text: error.message });
    }
  }, [
    searchParamsOrden, // Dependencia del objeto de parámetros
    setListaOrdenes,
    loadOrdenes,
  ]);

  return {
    loadOrdenes,
    buscarOrdenes,
  };
};
