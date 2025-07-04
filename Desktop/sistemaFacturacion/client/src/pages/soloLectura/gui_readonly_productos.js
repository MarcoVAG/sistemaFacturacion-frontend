
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "../../components/productos/searchForm.js";
import ProductTable from "../../components/productos/productTable.js";
import { useLoadDataProd } from "../../hooks/productos/useLoadDataProd.js";
import { useOrderActionsProd } from "../../hooks/productos/useOrderActionsProd.js";
//import "./styles/gui_producto.css";

const Productos = () => {
  const formRef = useRef(null);

  // Estados del formulario
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [stock, setStock] = useState("");
  const [id_categoria_producto, setIdCategoria] = useState("");

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

  const {
    loadProducts,
    loadCategories,
    buscarProductos,
    limpiarCampos,
    llenarParaEditar: llenarParaEditarHook,
  } = useLoadDataProd({
    setListaProductos,
    setListaCategorias,
    codigoBusqueda,
    productoBusqueda,
    precioBusqueda,
    stockBusqueda,
    categoriaBusqueda,
    setCodigo,
    setProducto,
    setPrecioUnitario,
    setStock,
    setIdCategoria,
    setEditarProducto,
  });

  const { add, edit, remove } = useOrderActionsProd({
    codigo,
    producto,
    precioUnitario,
    stock,
    id_categoria_producto,
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
        categoriaBusqueda !== ""
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
    buscarProductos,
  ]);

  const llenarParaEditarYScroll = (prod) => {
    llenarParaEditarHook(prod);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container">
      <div className="card text-center" ref={formRef}>
        <div className="card-header">CONSULTA DE PRODUCTOS</div>
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
