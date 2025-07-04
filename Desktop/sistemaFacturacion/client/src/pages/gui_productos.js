// src/pages/gui_productos.js

import React, { useState, useEffect, useRef, useCallback } from "react"; // Asegúrate de importar useCallback
import "bootstrap/dist/css/bootstrap.min.css";
import ProductForm from "../components/productos/productForm.js";
import SearchForm from "../components/productos/searchForm.js";
import ProductTable from "../components/productos/crud/productTableCrud.js";
import { useLoadDataProd } from "../hooks/productos/useLoadDataProd";
import { useOrderActionsProd } from "../hooks/productos/useOrderActionsProd";
import "./styles/gui_producto.css";

const Productos = () => {
  const formRef = useRef(null);

  // Estados del formulario
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [stock, setStock] = useState("");
  const [id_categoria_producto, setIdCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  // --- NUEVO ESTADO: para el archivo de imagen que se va a subir ---
  const [fileToUpload, setFileToUpload] = useState(null);

  // Estados generales
  const [listaProductos, setListaProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [editarProducto, setEditarProducto] = useState(false);

  // Estados de búsqueda
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [productoBusqueda, setProductoBusqueda] = useState("");
  const [precioBusqueda, setPrecioBusqueda] = useState("");
  const [stockBusqueda, setStockBusqueda] = useState("");
  const [categoriaBusqueda, setCategoriaBusqueda] = useState("");
  const [imagenUrlBusqueda, setImagenUrlBusqueda] = useState("");

  const {
    loadProducts,
    loadCategories,
    buscarProductos,
    limpiarCampos: limpiarCamposHook, // Renombramos el limpiador del hook
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataProd({
    setListaProductos,
    setListaCategorias,
    codigoBusqueda,
    productoBusqueda,
    precioBusqueda,
    stockBusqueda,
    categoriaBusqueda,
    imagenUrlBusqueda,
    setCodigo,
    setProducto,
    setPrecioUnitario,
    setStock,
    setIdCategoria,
    setImagenUrl,
    setEditarProducto,
  });

  // --- SOBREESCRIBIMOS limpiarCampos para que también limpie el archivo a subir ---
  const limpiarCampos = useCallback(() => {
    limpiarCamposHook(); // Llama al limpiador original del hook
    setFileToUpload(null); // Limpia el archivo seleccionado
  }, [limpiarCamposHook]);


  const { add, edit, remove } = useOrderActionsProd({
    codigo,
    producto,
    precioUnitario,
    stock,
    id_categoria_producto,
    imagenUrl,
    fileToUpload, // --- PASAMOS EL ARCHIVO A SUBIR AL HOOK DE ACCIONES ---
    setImagenUrl, // <-- IMPORTANTE: PASAR EL SETTER A useOrderActionsProd
    loadProducts,
    limpiarCampos,
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (
        codigoBusqueda.trim() !== "" ||
        productoBusqueda.trim() !== "" ||
        precioBusqueda.trim() !== "" ||
        stockBusqueda.trim() !== "" ||
        categoriaBusqueda !== "" ||
        imagenUrlBusqueda.trim() !== ""
      ) {
        buscarProductos();
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [
    codigoBusqueda,
    productoBusqueda,
    precioBusqueda,
    stockBusqueda,
    categoriaBusqueda,
    imagenUrlBusqueda,
    buscarProductos,
  ]);

  const llenarParaEditarYScroll = (prod) => {
    llenarParaEditarHook(prod);
    // Cuando editamos, no hay un archivo seleccionado para subir inicialmente
    setFileToUpload(null); // Asegurarse de que no hay un archivo pendiente de subida al editar
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileChangeInForm = useCallback((file) => {
    setFileToUpload(file);
  }, []);


  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">GESTIÓN DE PRODUCTOS</div>
        <div className="card-body">
          <ProductForm
            codigo={codigo}
            setCodigo={setCodigo}
            producto={producto}
            setProducto={setProducto}
            precioUnitario={precioUnitario}
            setPrecioUnitario={setPrecioUnitario}
            stock={stock}
            setStock={setStock}
            id_categoria_producto={id_categoria_producto}
            setIdCategoria={setIdCategoria}
            imagenUrl={imagenUrl}
            setImagenUrl={setImagenUrl}
            setFileToUpload={handleFileChangeInForm} // --- PASAMOS LA FUNCIÓN PARA ACTUALIZAR EL ARCHIVO ---
            editarProducto={editarProducto}
            handleSubmit={editarProducto ? edit : add}
            limpiarCampos={limpiarCampos}
            listaCategorias={listaCategorias}
          />
        </div>
        <SearchForm
          codigoBusqueda={codigoBusqueda}
          setCodigoBusqueda={setCodigoBusqueda}
          productoBusqueda={productoBusqueda}
          setProductoBusqueda={setProductoBusqueda}
          precioBusqueda={precioBusqueda}
          setPrecioBusqueda={setPrecioBusqueda}
          stockBusqueda={stockBusqueda}
          setStockBusqueda={setStockBusqueda}
          categoriaBusqueda={categoriaBusqueda}
          setCategoriaBusqueda={setCategoriaBusqueda}
          imagenUrlBusqueda={imagenUrlBusqueda}
          setImagenUrlBusqueda={setImagenUrlBusqueda}
          getAll={loadProducts}
          listaCategorias={listaCategorias}
        />
      </div>
      <ProductTable
        listaProductos={listaProductos}
        listaCategorias={listaCategorias}
        llenarParaEditar={llenarParaEditarYScroll}
        remove={remove}
      />
    </div>
  );
};

export default Productos;