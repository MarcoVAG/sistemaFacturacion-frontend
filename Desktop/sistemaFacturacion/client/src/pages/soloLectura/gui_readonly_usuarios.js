// src/pages/gui_usuarios.js
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANTE: DEBES CREAR ESTOS COMPONENTES EN LAS RUTAS ESPECIFICADAS
// Si no existen, el código fallará.
import SearchForm from "../../components/usuarios/searchForm.js"; // *** DEBES CREAR ESTE COMPONENTE ***
import UserTable from "../../components/soloLectura/userTable.js"; // *** VERIFICA LA RUTA SI ES 'crud/userTableCrud.js' o 'userTableCrud.js' ***
import { useLoadDataUser } from "../../hooks/usuarios/useLoadDataUser";
import { useOrderActionsUser } from "../../hooks/usuarios/useOrderActionsUser";
//import "./styles/gui_usuarios.css"; // Estilos específicos para la GUI de usuarios (opcional)

const Usuarios = () => {
  const formRef = useRef(null);

  // Estados del formulario para crear/editar usuario
  const [id_usuario, setIdUsuario] = useState(""); // Solo para edición
  const [correo_electronico, setCorreoElectronico] = useState("");
  const [password_hash, setPasswordHash] = useState(""); // Para creación o cambio de contraseña
  const [habilitado, setHabilitado] = useState(true);
  const [failed_login_attempts, setFailedLoginAttempts] = useState(0); // Gestionado por el backend/auth
  const [id_rol, setIdRol] = useState(""); // ID del rol seleccionado

  // Estados generales
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaRoles, setListaRoles] = useState([]); // Para el dropdown de roles
  const [editarUsuario, setEditarUsuario] = useState(false); // Para controlar si estamos editando o creando

  // Estados de búsqueda
  const [idUsuarioBusqueda, setIdUsuarioBusqueda] = useState("");
  const [correoElectronicoBusqueda, setCorreoElectronicoBusqueda] = useState("");
  const [habilitadoBusqueda, setHabilitadoBusqueda] = useState(""); // true, false, o '' para todos
  const [rolBusqueda, setRolBusqueda] = useState(""); // id_rol para búsqueda
  // --- NUEVOS ESTADOS DE BÚSQUEDA ---
  const [failedLoginAttemptsBusqueda, setFailedLoginAttemptsBusqueda] = useState("");
  const [fechaCreacionBusqueda, setFechaCreacionBusqueda] = useState("");
  // ----------------------------------

  const {
    loadUsers,
    loadRoles,
    buscarUsuarios,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataUser({
    setListaUsuarios,
    setListaRoles,
    idUsuarioBusqueda,
    correoElectronicoBusqueda,
    habilitadoBusqueda,
    rolBusqueda,
    // --- PASANDO NUEVOS ESTADOS AL HOOK ---
    failedLoginAttemptsBusqueda,
    fechaCreacionBusqueda,
    // ------------------------------------
    setIdUsuario,
    setCorreoElectronico,
    // setPasswordHash no se llena directamente aquí por seguridad
    setHabilitado,
    setFailedLoginAttempts,
    setIdRol,
    setEditarUsuario,
  });

  const { add, edit, remove, updatePassword, toggleStatus } = useOrderActionsUser({
    id_usuario,
    correo_electronico,
    password_hash,
    habilitado,
    failed_login_attempts,
    id_rol,
    loadUsers,
    limpiarCampos,
  });

  // Cargar todos los usuarios y roles al inicio
  useEffect(() => {
    loadUsers();
    loadRoles();
  }, [loadUsers, loadRoles]);

  // Efecto para la búsqueda con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Solo buscar si al menos un campo de búsqueda tiene valor
      if (
        idUsuarioBusqueda !== "" ||
        correoElectronicoBusqueda.trim() !== "" ||
        habilitadoBusqueda !== "" ||
        rolBusqueda !== "" ||
        // --- INCLUYENDO NUEVOS ESTADOS EN LA CONDICIÓN ---
        failedLoginAttemptsBusqueda !== "" ||
        fechaCreacionBusqueda !== ""
        // ------------------------------------------------
      ) {
        buscarUsuarios();
      }
    }, 300); // Retraso de 300ms

    return () => clearTimeout(delayDebounce);
  }, [
    idUsuarioBusqueda,
    correoElectronicoBusqueda,
    habilitadoBusqueda,
    rolBusqueda,
    // --- AÑADIENDO NUEVOS ESTADOS A LAS DEPENDENCIAS ---
    failedLoginAttemptsBusqueda,
    fechaCreacionBusqueda,
    // -------------------------------------------------
    buscarUsuarios,
  ]);

  // Función para llenar el formulario de edición y hacer scroll
  const llenarParaEditarYScroll = (user) => {
    llenarParaEditarHook(user);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">CONSULTA DE USUARIOS</div>
        <SearchForm
          idUsuarioBusqueda={idUsuarioBusqueda}
          setIdUsuarioBusqueda={setIdUsuarioBusqueda}
          correoElectronicoBusqueda={correoElectronicoBusqueda}
          setCorreoElectronicoBusqueda={setCorreoElectronicoBusqueda}
          habilitadoBusqueda={habilitadoBusqueda}
          setHabilitadoBusqueda={setHabilitadoBusqueda}
          rolBusqueda={rolBusqueda}
          setRolBusqueda={setRolBusqueda}
          // --- PASANDO NUEVOS PROPS AL SearchForm ---
          failedLoginAttemptsBusqueda={failedLoginAttemptsBusqueda}
          setFailedLoginAttemptsBusqueda={setFailedLoginAttemptsBusqueda}
          fechaCreacionBusqueda={fechaCreacionBusqueda}
          setFechaCreacionBusqueda={setFechaCreacionBusqueda}
          // ----------------------------------------
          listaRoles={listaRoles} // Pasa la lista de roles al formulario de búsqueda
          getAll={loadUsers} // Función para recargar todos los usuarios
        />
      </div>
      <UserTable
        listaUsuarios={listaUsuarios}
        llenarParaEditar={llenarParaEditarYScroll}
        remove={remove}
        toggleStatus={toggleStatus} // Pasa la función para cambiar el estado de habilitado
      />
    </div>
  );
};

export default Usuarios;