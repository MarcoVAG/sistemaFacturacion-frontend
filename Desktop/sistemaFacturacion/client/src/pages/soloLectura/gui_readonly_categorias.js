// src/pages/gui_categorias.js
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
import SearchFormCategorias from "../../components/categorias/searchFormCategorias.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import CategoriaTable from "../../components/soloLectura/categoriaTable.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import { useLoadDataCategoria } from "../../hooks/categorias/useLoadDataCategorias.js";
import { useOrderActionsCategoria } from "../../hooks/categorias/useOrderActionsCategorias.js";
//import "./styles/gui_categorias.css"; // Estilos específicos para la GUI de categorías (opcional)

const Categorias = () => {
  const formRef = useRef(null);

  // Estados del formulario para crear/editar categoría
  const [id_categoria, setIdCategoria] = useState(""); // Solo para edición
  const [categoria, setCategoria] = useState(""); // Nombre de la categoría

  // Estados generales
  const [listaCategorias, setListaCategorias] = useState([]);
  const [editarCategoria, setEditarCategoria] = useState(false); // Para controlar si estamos editando o creando

  // Estados de búsqueda
  const [idCategoriaBusqueda, setIdCategoriaBusqueda] = useState("");
  const [nombreCategoriaBusqueda, setNombreCategoriaBusqueda] = useState("");

  const {
    loadCategorias,
    buscarCategorias,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataCategoria({
    setListaCategorias,
    idCategoriaBusqueda,
    nombreCategoriaBusqueda,
    setIdCategoria,
    setCategoria,
    setEditarCategoria,
  });

  const { add, edit, remove } = useOrderActionsCategoria({
    id_categoria,
    categoria,
    loadCategorias,
    limpiarCampos,
  });

  // Cargar todas las categorías al inicio
  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  // Efecto para la búsqueda con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Solo buscar si al menos un campo de búsqueda tiene valor
      if (
        idCategoriaBusqueda !== "" ||
        nombreCategoriaBusqueda.trim() !== ""
      ) {
        buscarCategorias();
      }
    }, 300); // Retraso de 300ms

    return () => clearTimeout(delayDebounce);
  }, [
    idCategoriaBusqueda,
    nombreCategoriaBusqueda,
    buscarCategorias,
  ]);

  // Función para llenar el formulario de edición y hacer scroll
  const llenarParaEditarYScroll = (cat) => {
    llenarParaEditarHook(cat);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">CONSULTA DE CATEGORÍAS</div>
        <SearchFormCategorias
          idCategoriaBusqueda={idCategoriaBusqueda}
          setIdCategoriaBusqueda={setIdCategoriaBusqueda}
          nombreCategoriaBusqueda={nombreCategoriaBusqueda}
          setNombreCategoriaBusqueda={setNombreCategoriaBusqueda}
          getAll={loadCategorias} // Función para recargar todas las categorías
        />
      </div>
      <CategoriaTable
        listaCategorias={listaCategorias}
        llenarParaEditar={llenarParaEditarYScroll}
        remove={remove}
      />
    </div>
  );
};

export default Categorias;