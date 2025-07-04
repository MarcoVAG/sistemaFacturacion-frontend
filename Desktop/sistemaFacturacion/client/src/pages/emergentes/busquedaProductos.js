import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SearchForm from "../../components/productos/searchForm";
import ProductTable from "../../components/productos/productTable";
import {
  getAllCategories,
  searchProducts,
  getAllProductsWithStock,
} from "../../services/productService";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ¡IMPORTANTE!

const noti = withReactContent(Swal);

// Componente que contiene toda la lógica y la UI de la búsqueda de productos
// Lo renombramos para poder envolverlo en el Router de esta ventana.
const BusquedaProductosContent = () => {
  const [id_categoria_producto, setIdCategoria] = useState("");
  const [listaProductos, setListaProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [categoriaBusqueda, setCategoriaBusqueda] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (codigoBusqueda.trim() !== "" || categoriaBusqueda !== "") {
        buscarProductos();
      } else {
        loadProducts(); // Si no hay nada en los campos, carga todo
      }
    }, 300); // Pequeño retardo para evitar llamadas constantes

    return () => clearTimeout(delayDebounce);
  }, [codigoBusqueda, categoriaBusqueda]);


  const loadProducts = async () => {
    try {
      const productos = await getAllProductsWithStock();
      setListaProductos(productos);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  const loadCategories = async () => {
    try {
      const categorias = await getAllCategories();
      setListaCategorias(categorias);
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  const buscarProductos = async () => {
    if (!codigoBusqueda && !categoriaBusqueda) {
      // No mostramos advertencia en popup, solo si es necesario para la UX
      // noti.fire({
      //   icon: "warning",
      //   title: "Campos vacíos",
      //   text: "Por favor, ingrese un código o una categoría para buscar.",
      // });
      return;
    }

    const params = {
      ...(codigoBusqueda && { codigo: codigoBusqueda }),
      ...(categoriaBusqueda && { id_categoria_producto: categoriaBusqueda }),
    };

    try {
      const productos = await searchProducts(params);
      if (productos.length === 0) {
        setListaProductos([]); // Limpiar la lista si no hay resultados
      } else {
        setListaProductos(productos);
      }
    } catch (error) {
      noti.fire({
        icon: "error",
        title: "Ups...",
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">BÚSQUEDA DE PRODUCTOS</div>
        <SearchForm
          codigoBusqueda={codigoBusqueda} setCodigoBusqueda={setCodigoBusqueda}
          categoriaBusqueda={categoriaBusqueda} setCategoriaBusqueda={setCategoriaBusqueda}
          buscarProductos={buscarProductos} getAll={loadProducts}
          listaCategorias={listaCategorias}
          id_categoria_producto={id_categoria_producto} setIdCategoria={setIdCategoria}
        />
      </div>
      <ProductTable
        listaProductos={listaProductos} listaCategorias={listaCategorias}
      />
    </div>
  );
};

// Componente principal exportado para la ventana emergente
const VentanaProductos = () => {
  return (
    <Router> {/* Envuelve el contenido en un BrowserRouter */}
      <Routes>
        {/*
          Define la ruta para este componente dentro de su propio router.
          La ruta principal que se abrirá es '/busquedaProductos'.
          También agregamos una ruta para la raíz '/' por si acaso.
        */}
        <Route path="/busquedaProductos" element={<BusquedaProductosContent />} />
        <Route path="/" element={<BusquedaProductosContent />} />
      </Routes>
    </Router>
  );
};

export default VentanaProductos;