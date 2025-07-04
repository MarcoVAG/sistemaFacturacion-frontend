// src/hooks/detalleVenta/useLoadDataDetalleVentaReg.js
import { useCallback, useState, useEffect } from "react";
import { getDetailsByOrderId, searchDetail } from "../../services/detalleService"; // Usar el servicio de detalles existente
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataDetalleVentaReg = (id_orden, searchParamsDetalle) => {
  const [listaDetalles, setListaDetalles] = useState([]);
  const [loadingDetalles, setLoadingDetalles] = useState(false);

  const loadDetalles = useCallback(async () => {
    if (!id_orden) {
      setListaDetalles([]);
      return;
    }
    setLoadingDetalles(true);
    try {
      const detalles = await getDetailsByOrderId(id_orden);
      setListaDetalles(detalles);
    } catch (error) {
      noti.fire({ icon: "error", title: "Error al cargar detalles de venta", text: error.message });
      setListaDetalles([]);
    } finally {
      setLoadingDetalles(false);
    }
  }, [id_orden, setListaDetalles]); // setListaDetalles para estabilidad de useCallback

  const buscarDetalles = useCallback(async () => {
    if (!id_orden) {
      setListaDetalles([]);
      return;
    }
    setLoadingDetalles(true);
    try {
      // Verificar si hay algún parámetro de búsqueda válido (excluyendo id_orden, que ya se pasa)
      const hasSearchParams = Object.values(searchParamsDetalle).some(param => 
        (typeof param === 'string' && param.trim() !== '') || 
        (typeof param === 'number' && param !== null && param !== '')
      );

      let detalles;
      if (hasSearchParams) {
        // Pasar id_orden y el objeto completo de searchParamsDetalle
        detalles = await searchDetail(id_orden, searchParamsDetalle);
      } else {
        // Si no hay parámetros de búsqueda, cargar todos los detalles para la orden
        detalles = await getDetailsByOrderId(id_orden);
      }

      if (detalles.length === 0 && hasSearchParams) { // Solo mostrar "Sin resultados" si hubo búsqueda y no se encontró nada
        noti.fire({
          icon: "info",
          title: "Sin resultados",
          text: "No se encontraron detalles que coincidan con el criterio para esta orden.",
        });
      }
      setListaDetalles(detalles);
    } catch (error) {
      noti.fire({ icon: "error", title: "Error en la búsqueda de detalles", text: error.message });
      setListaDetalles([]);
    } finally {
      setLoadingDetalles(false);
    }
  }, [id_orden, searchParamsDetalle, setListaDetalles]); // setListaDetalles para estabilidad de useCallback

  // Efecto para cargar detalles cuando el id_orden cambia o al inicio
  useEffect(() => {
    if (id_orden) {
      loadDetalles();
    }
  }, [id_orden, loadDetalles]); // loadDetalles es estable por useCallback

  // Efecto para la búsqueda con debounce dentro del modal
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const hasSearchParams = Object.values(searchParamsDetalle).some(param => 
        (typeof param === 'string' && param.trim() !== '') || 
        (typeof param === 'number' && param !== null && param !== '')
      );

      if (id_orden) { // Solo ejecutar si hay una orden seleccionada
        if (hasSearchParams) {
          buscarDetalles();
        } else {
          loadDetalles(); // Si no hay parámetros de búsqueda, recargar todos los detalles
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [id_orden, searchParamsDetalle, buscarDetalles, loadDetalles]); 
  // ^^^ ESTA ES LA LÍNEA QUE CAUSA EL PROBLEMA:
  // Aunque buscarDetalles y loadDetalles son useCallback, si sus *propias* dependencias cambian,
  // se recrean. Y al recrearse, disparan este useEffect.
  // La solución es no incluir las funciones memoizadas aquí.
  // El useEffect solo debe depender de los datos que *usan* esas funciones.

  // RE-CORRECCIÓN del useEffect para evitar el bucle infinito:
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const hasSearchParams = Object.values(searchParamsDetalle).some(param => 
        (typeof param === 'string' && param.trim() !== '') || 
        (typeof param === 'number' && param !== null && param !== '')
      );

      if (id_orden) { // Solo ejecutar si hay una orden seleccionada
        if (hasSearchParams) {
          buscarDetalles(); // Llama a la función memoizada
        } else {
          loadDetalles(); // Llama a la función memoizada
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [id_orden, searchParamsDetalle]); // <-- Dependencias CORRECTAS

  return {
    listaDetalles,
    loadingDetalles,
    loadDetalles,
    buscarDetalles,
  };
};
