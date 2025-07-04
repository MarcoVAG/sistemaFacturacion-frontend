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
import "./../styles/gui_producto.css";

const noti = withReactContent(Swal);

const Productos = () => {
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
      noti.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, ingrese un código o una categoría para buscar.",
      });
      return; 
    }

    const params = {
      ...(codigoBusqueda && { codigo: codigoBusqueda }),
      ...(categoriaBusqueda && { id_categoria_producto: categoriaBusqueda }),
    };

    try {
      const productos = await searchProducts(params);
      if (productos.length === 0) {
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
          listaCategorias = {listaCategorias}
          id_categoria_producto={id_categoria_producto} setIdCategoria={setIdCategoria}
        />
      </div>
      <ProductTable
        listaProductos={listaProductos} listaCategorias={listaCategorias}
      />
    </div>
  );
};

export default Productos;