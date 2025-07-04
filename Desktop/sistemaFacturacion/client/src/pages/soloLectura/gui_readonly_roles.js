  // src/pages/gui_roles.js
  import React, { useState, useEffect, useRef } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  // IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
  // Si no existen, el código fallará.
  import SearchForm from "../../components/roles/searchForm.js"; // *** DEBES CREAR ESTE COMPONENTE ***
  import RoleTable from "../../components/soloLectura/roleTable.js"; // *** DEBES CREAR ESTE COMPONENTE ***
  import { useLoadDataRol } from "../../hooks/roles/useLoadDataRol";
  import { useOrderActionsRol } from "../../hooks/roles/useOrderActionsRol";
  //import "./styles/gui_roles.css"; // Estilos específicos para la GUI de roles (opcional)

  const Roles = () => {
    const formRef = useRef(null);

    // Estados del formulario para crear/editar rol
    const [id_rol, setIdRol] = useState(""); // Solo para edición
    const [nombre_rol, setNombreRol] = useState("");
    const [descripcion, setDescripcion] = useState("");

    // Estados generales
    const [listaRoles, setListaRoles] = useState([]);
    const [editarRol, setEditarRol] = useState(false); // Para controlar si estamos editando o creando

    // Estados de búsqueda
    const [idRolBusqueda, setIdRolBusqueda] = useState("");
    const [nombreRolBusqueda, setNombreRolBusqueda] = useState("");
    const [descripcionBusqueda, setDescripcionBusqueda] = useState("");

    const {
      loadRoles,
      buscarRoles,
      limpiarCampos,
      llenarParaEditar: llenarParaEditarHook,
    } = useLoadDataRol({
      setListaRoles,
      idRolBusqueda,
      nombreRolBusqueda,
      descripcionBusqueda,
      setIdRol,
      setNombreRol,
      setDescripcion,
      setEditarRol,
    });

    const { add, edit, remove } = useOrderActionsRol({
      id_rol,
      nombre_rol,
      descripcion,
      loadRoles,
      limpiarCampos,
    });

    // Cargar todos los roles al inicio
    useEffect(() => {
      loadRoles();
    }, [loadRoles]);

    // Efecto para la búsqueda con debounce
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        // Solo buscar si al menos un campo de búsqueda tiene valor
        if (
          idRolBusqueda !== "" ||
          nombreRolBusqueda.trim() !== "" ||
          descripcionBusqueda.trim() !== ""
        ) {
          buscarRoles();
        }
      }, 300); // Retraso de 300ms

      return () => clearTimeout(delayDebounce);
    }, [
      idRolBusqueda,
      nombreRolBusqueda,
      descripcionBusqueda,
      buscarRoles,
    ]);

    // Función para llenar el formulario de edición y hacer scroll
    const llenarParaEditarYScroll = (rol) => {
      llenarParaEditarHook(rol);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    return (
      <div className="container">
        <div className="card text-center" ref={formRef}>
          <div className="card-header">CONSULTA DE ROLES</div>
          <SearchForm
            idRolBusqueda={idRolBusqueda}
            setIdRolBusqueda={setIdRolBusqueda}
            nombreRolBusqueda={nombreRolBusqueda}
            setNombreRolBusqueda={setNombreRolBusqueda}
            descripcionBusqueda={descripcionBusqueda}
            setDescripcionBusqueda={setDescripcionBusqueda}
            getAll={loadRoles} // Función para recargar todos los roles
          />
        </div>
        <RoleTable
          listaRoles={listaRoles}
          llenarParaEditar={llenarParaEditarYScroll}
          remove={remove}
        />
      </div>
    );
  };

  export default Roles;
