//src/hooks/useLoadDataCli
import { useCallback } from "react";
import { getAllClients, searchClient } from "../../services/clientService";
import { createError } from "../../services/errorService"; // Importa el servicio de errores
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const noti = withReactContent(Swal);

export const useLoadDataCli = ({
  setListaClientes,
  setCedula,
  setNombre1,
  setNombre2,
  setApellido1,
  setApellido2,
  setTelefono,
  setDireccion,
  setCedulaBusqueda,
  setNombre1Busqueda,
  setNombre2Busqueda,
  setApellido1Busqueda,
  setApellido2Busqueda,
  setTelefonoBusqueda,
  setDireccionBusqueda,
  setEditarCliente,
}) => {
  const showError = useCallback((error, eventOrigin = "Desconocido") => {
    noti.fire({
      icon: "error",
      title: "Ups...",
      text: error.message,
    });
    // *** CAPTURA Y REPORTE DE ERROR ***
    createError({
      mensajeError: error.message,
      detalleError: error.stack,
      pantallaOrigen: "Gestión de Clientes",
      eventoOrigen: eventOrigin
    });
  }, []);

  const loadClients = useCallback(async () => {
    try {
      const clientes = await getAllClients();
      setListaClientes(clientes);
    } catch (error) {
      showError(error, "loadClients");
    }
  }, [setListaClientes, showError]);

  const buscarClientes = useCallback(
    async (params) => {
      const hayDatos = Object.values(params).some(
        (v) => v && v.trim() !== ""
      );

      if (!hayDatos) {
        noti.fire({
          icon: "warning",
          title: "Campo vacío",
          text: "Ingrese al menos un campo para buscar.",
        });
        return;
      }

      try {
        const clientes = await searchClient(params);
        if (clientes.length === 0) {
          noti.fire({
            icon: "info",
            title: "Sin resultados",
            text: "No se encontró ningún cliente.",
          });
        } else {
          setListaClientes(clientes);
        }
      } catch (error) {
        showError(error, "buscarClientes");
      }
    },
    [setListaClientes, showError]
  );

  const limpiarCampos = useCallback(() => {
    setCedula("");
    setNombre1("");
    setNombre2("");
    setApellido1("");
    setApellido2("");
    setTelefono("");
    setDireccion("");

    setCedulaBusqueda("");
    setNombre1Busqueda("");
    setNombre2Busqueda("");
    setApellido1Busqueda("");
    setApellido2Busqueda("");
    setTelefonoBusqueda("");
    setDireccionBusqueda("");

    setEditarCliente(false);
  }, [
    setCedula,
    setNombre1,
    setNombre2,
    setApellido1,
    setApellido2,
    setTelefono,
    setDireccion,
    setCedulaBusqueda,
    setNombre1Busqueda,
    setNombre2Busqueda,
    setApellido1Busqueda,
    setApellido2Busqueda,
    setTelefonoBusqueda,
    setDireccionBusqueda,
    setEditarCliente,
  ]);

  const llenarParaEditar = useCallback(
    (cliente) => {
      setEditarCliente(true);
      setCedula(cliente.cedula);
      setNombre1(cliente.nombre1);
      setNombre2(cliente.nombre2);
      setApellido1(cliente.apellido1);
      setApellido2(cliente.apellido2);
      setTelefono(cliente.telefono);
      setDireccion(cliente.direccion);
    },
    [
      setCedula,
      setNombre1,
      setNombre2,
      setApellido1,
      setApellido2,
      setTelefono,
      setDireccion,
      setEditarCliente,
    ]
  );

  return {
    loadClients,
    buscarClientes,
    limpiarCampos,
    llenarParaEditar,
  };
};
