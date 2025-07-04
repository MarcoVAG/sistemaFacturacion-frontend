// src/pages/gui_estados.js
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
import EstadoForm from "../components/estados/estadoForm.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import SearchFormEstados from "../components/estados/searchFormEstados.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import EstadoTable from "../components/estados/estadoTableCrud.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import { useLoadDataEstado } from "../hooks/estados/useLoadDataEstado";
import { useOrderActionsEstado } from "../hooks/estados/useOrderActionsEstado";
//import "./styles/gui_estados.css"; // Estilos específicos para la GUI de estados (opcional)

const Estados = () => {
  const formRef = useRef(null);

  // Estados del formulario para crear/editar estado
  const [id_estado, setIdEstado] = useState(""); // Solo para edición
  const [estado, setEstado] = useState(""); // Nombre del estado

  // Estados generales
  const [listaEstados, setListaEstados] = useState([]);
  const [editarEstado, setEditarEstado] = useState(false); // Para controlar si estamos editando o creando

  // Estados de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Un solo campo para búsqueda inteligente

  const {
    loadEstados,
    buscarEstados,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataEstado({
    setListaEstados,
    terminoBusqueda,
    setIdEstado,
    setEstado,
    setEditarEstado,
  });

  const { add, edit, remove } = useOrderActionsEstado({
    id_estado,
    estado,
    loadEstados,
    limpiarCampos,
  });

  // Cargar todos los estados al inicio
  useEffect(() => {
    loadEstados();
  }, [loadEstados]);

  // Efecto para la búsqueda con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Solo buscar si el término de búsqueda tiene valor
      if (terminoBusqueda.trim() !== "") {
        buscarEstados();
      } else {
        loadEstados(); // Si el campo de búsqueda está vacío, recarga todos los estados
      }
    }, 300); // Retraso de 300ms

    return () => clearTimeout(delayDebounce);
  }, [
    terminoBusqueda,
    buscarEstados,
    loadEstados,
  ]);

  // Función para llenar el formulario de edición y hacer scroll
  const llenarParaEditarYScroll = (est) => {
    llenarParaEditarHook(est);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">GESTIÓN DE ESTADOS DE FACTURA</div>
        <div className="card-body">
          <EstadoForm
            id_estado={id_estado}
            estado={estado}
            setEstado={setEstado}
            editarEstado={editarEstado}
            handleSubmit={editarEstado ? edit : add} // Envía la función adecuada según si es edición o adición
            limpiarCampos={limpiarCampos}
          />
        </div>
        <SearchFormEstados
          terminoBusqueda={terminoBusqueda}
          setTerminoBusqueda={setTerminoBusqueda}
          getAll={loadEstados} // Función para recargar todos los estados
        />
      </div>
      <EstadoTable
        listaEstados={listaEstados}
        llenarParaEditar={llenarParaEditarYScroll}
        remove={remove}
      />
    </div>
  );
};

export default Estados;
