// src/pages/gui_metodosPago.js
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
import MetodoPagoForm from "../components/metodosPago/metodoPagoForm.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import SearchFormMetodos from "../components/metodosPago/searchFormMetodos.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import MetodoPagoTable from "../components/metodosPago/metodosPagoTableCrud.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import { useLoadDataMetodos } from "../hooks/metodosPago/useLoadDataMetodos";
import { useOrderActionsMetodos } from "../hooks/metodosPago/useOrderActionsMetodos";
//import "./styles/gui_metodosPago.css"; // Estilos específicos para la GUI de métodos de pago (opcional)

const MetodosPago = () => {
  const formRef = useRef(null);

  // Estados del formulario para crear/editar método de pago
  const [id_metodoPago, setIdMetodoPago] = useState(""); // Solo para edición
  const [metodo, setMetodo] = useState(""); // Nombre del método de pago

  // Estados generales
  const [listaMetodos, setListaMetodos] = useState([]);
  const [editarMetodo, setEditarMetodo] = useState(false); // Para controlar si estamos editando o creando

  // Estados de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Un solo campo para búsqueda inteligente

  const {
    loadMetodos,
    buscarMetodos,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataMetodos({
    setListaMetodos,
    terminoBusqueda,
    setIdMetodoPago,
    setMetodo,
    setEditarMetodo,
  });

  const { add, edit, remove } = useOrderActionsMetodos({
    id_metodoPago,
    metodo,
    loadMetodos,
    limpiarCampos,
  });

  // Cargar todos los métodos de pago al inicio
  useEffect(() => {
    loadMetodos();
  }, [loadMetodos]);

  // Efecto para la búsqueda con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Solo buscar si el término de búsqueda tiene valor
      if (terminoBusqueda.trim() !== "") {
        buscarMetodos();
      } else {
        loadMetodos(); // Si el campo de búsqueda está vacío, recarga todos los métodos
      }
    }, 300); // Retraso de 300ms

    return () => clearTimeout(delayDebounce);
  }, [
    terminoBusqueda,
    buscarMetodos,
    loadMetodos,
  ]);

  // Función para llenar el formulario de edición y hacer scroll
  const llenarParaEditarYScroll = (met) => {
    llenarParaEditarHook(met);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">GESTIÓN DE MÉTODOS DE PAGO</div>
        <div className="card-body">
          <MetodoPagoForm
            id_metodoPago={id_metodoPago}
            metodo={metodo}
            setMetodo={setMetodo}
            editarMetodo={editarMetodo}
            handleSubmit={editarMetodo ? edit : add} // Envía la función adecuada según si es edición o adición
            limpiarCampos={limpiarCampos}
          />
        </div>
        <SearchFormMetodos
          terminoBusqueda={terminoBusqueda}
          setTerminoBusqueda={setTerminoBusqueda}
          getAll={loadMetodos} // Función para recargar todos los métodos
        />
      </div>
      <MetodoPagoTable
        listaMetodos={listaMetodos}
        llenarParaEditar={llenarParaEditarYScroll}
        remove={remove}
      />
    </div>
  );
};

export default MetodosPago;
