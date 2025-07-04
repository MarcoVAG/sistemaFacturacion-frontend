// src/hooks/categorias/useOrderActionsCategoria.js
import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateCategoriaForm } from "../../validations/categoriaValidation"; // Importa la función de validación (la crearemos después)
import {
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../services/categoriaService"; // Importa las funciones del servicio de categorías
import { createError } from "../../services/errorService"; // Importa el servicio de errores

const noti = withReactContent(Swal);

export const useOrderActionsCategoria = ({
  id_categoria, // Se usa para la edición
  categoria, // Nombre de la categoría
  loadCategorias, // Función para recargar la lista de categorías
  limpiarCampos, // Función para limpiar el formulario
}) => {
  /**
   * Añade una nueva categoría a la base de datos.
   */
  const add = useCallback(async () => {
    if (!validateCategoriaForm(categoria)) return;

    const newCategoria = {
      categoria,
    };

    try {
      await createCategoria(newCategoria);
      loadCategorias(); // Recarga la lista de categorías
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Registro exitoso!</strong>,
        html: <i>La categoría <strong>{categoria}</strong> fue registrada con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      noti.fire({ icon: "error", title: "Ups...", text: error.message });
      // *** CAPTURA Y REPORTE DE ERROR ***
      createError({
        mensajeError: "Error al añadir categoría",
        detalleError: error.message,
        pantallaOrigen: "Gestión de Categorías",
        eventoOrigen: "addCategoria"
      });
    }
  }, [categoria, loadCategorias, limpiarCampos]);

  /**
   * Edita una categoría existente en la base de datos.
   */
  const edit = useCallback(async () => {
    if (!validateCategoriaForm(categoria)) return;

    const updatedCategoria = {
      categoria,
    };

    try {
      await updateCategoria(id_categoria, updatedCategoria); // Envía el ID y los datos actualizados
      loadCategorias(); // Recarga la lista de categorías
      limpiarCampos(); // Limpia los campos del formulario
      noti.fire({
        title: <strong>Actualización exitosa!</strong>,
        html: <i>La categoría <strong>{categoria}</strong> fue actualizada con éxito.</i>,
        icon: "success",
      });
    } catch (error) {
      noti.fire({ icon: "error", title: "Ups...", text: error.message });
      // *** CAPTURA Y REPORTE DE ERROR ***
      createError({
        mensajeError: "Error al editar categoría",
        detalleError: error.message,
        pantallaOrigen: "Gestión de Categorías",
        eventoOrigen: "editCategoria"
      });
    }
  }, [id_categoria, categoria, loadCategorias, limpiarCampos]);

  /**
   * Elimina una categoría de la base de datos previa confirmación del usuario.
   * @param {number} categoriaId - El ID de la categoría a eliminar.
   */
  const remove = useCallback(async (categoriaId) => {
    const result = await noti.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategoria(categoriaId);
        loadCategorias(); // Recarga la lista de categorías
        limpiarCampos(); // Limpia los campos por si la categoría eliminada era la que se estaba editando
        noti.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
      } catch (error) {
        noti.fire({ icon: "error", title: "Ups...", text: error.message });
        // *** CAPTURA Y REPORTE DE ERROR ***
        createError({
          mensajeError: `Error al eliminar categoría con ID ${categoriaId}`,
          detalleError: error.message,
          pantallaOrigen: "Gestión de Categorías",
          eventoOrigen: "removeCategoria"
        });
      }
    }
  }, [loadCategorias, limpiarCampos]);

  return { add, edit, remove };
};
