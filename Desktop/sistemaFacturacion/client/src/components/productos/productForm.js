// src/components/productos/productForm.js

import React, { useState, useEffect } from "react"; // Add useEffect

const ProductForm = ({
    codigo,
    setCodigo,
    producto,
    setProducto,
    precioUnitario,
    setPrecioUnitario,
    stock,
    setStock,
    id_categoria_producto,
    setIdCategoria,
    imagenUrl, // This is the URL from the DB / after backend upload
    setImagenUrl, // This setter updates the DB-ready URL
    setFileToUpload, // This setter passes the actual File object to the parent
    editarProducto,
    limpiarCampos: parentLimpiarCampos, // Rename to avoid conflict
    handleSubmit: parentHandleSubmit,
    listaCategorias,
}) => {
    // State to hold the currently selected file object from the input type="file"
    const [localSelectedFile, setLocalSelectedFile] = useState(null);
    // State to hold the URL for client-side preview (can be blob: or the actual image URL)
    const [previewImageUrl, setPreviewImageUrl] = useState('');


    // When the component receives a new imagenUrl from props (e.g., on edit)
    // or when the component mounts with an initial imagenUrl
    useEffect(() => {
        setPreviewImageUrl(imagenUrl); // Initialize preview with the prop imagenUrl
    }, [imagenUrl]); // Rerun when imagenUrl prop changes


    const handlePrecioChange = (event) => {
        const valor = event.target.value;
        const regex = /^[0-9.,]*$/;
        if (regex.test(valor) || valor === "") {
            setPrecioUnitario(valor);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setLocalSelectedFile(file); // Store the actual file object
        setFileToUpload(file); // Pass the file object to the parent (gui_productos)

        if (file) {
            // Create a blob URL for immediate client-side preview
            const blobUrl = URL.createObjectURL(file);
            setPreviewImageUrl(blobUrl); // Set the preview URL to the blob
        } else {
            // If no file is selected, clear local file and preview.
            // Do NOT clear imagenUrl (which is from DB) here directly.
            setPreviewImageUrl(imagenUrl); // Revert to the original imagenUrl if available
        }
    };

    // Override the parent handleSubmit to first handle file state
    const onSubmit = () => {
        // The actual file upload logic will be in useOrderActionsProd
        // ProductForm's job is just to pass the file selected by the user.
        parentHandleSubmit(); // Call the parent's handleSubmit (which is add/edit from useOrderActionsProd)
    };

    const limpiarCampos = () => {
        parentLimpiarCampos(); // Call the original clear function
        setLocalSelectedFile(null); // Clear the local file state
        setPreviewImageUrl(''); // Clear the preview image
    };


    return (
        <div>
            {/* ... (Existing input fields for codigo, producto, precioUnitario, stock, id_categoria_producto) ... */}

            <div className="input-group mb-3">
                <span className="input-group-text">Código:</span>
                <input
                    type="text"
                    onChange={(event) => setCodigo(event.target.value)}
                    className="form-control"
                    value={codigo}
                    placeholder="Ingrese el código del producto"
                    disabled={editarProducto}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Producto:</span>
                <input
                    type="text"
                    onChange={(event) => setProducto(event.target.value)}
                    className="form-control"
                    value={producto}
                    placeholder="Ingrese el producto"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Precio Unitario:</span>
                <input
                    type="text"
                    onChange={handlePrecioChange}
                    className="form-control"
                    value={precioUnitario}
                    placeholder="Ingrese el precio del producto"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Stock:</span>
                <input
                    type="number"
                    onChange={(event) => setStock(event.target.value)}
                    className="form-control"
                    value={stock}
                    placeholder="Ingrese el número de unidades del producto"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Categoría:</span>
                <select
                    onChange={(event) => setIdCategoria(event.target.value)}
                    className="form-control"
                    value={id_categoria_producto}
                >
                    <option value="">Seleccione una categoría...</option>
                    {listaCategorias.map((cat) => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.categoria}
                        </option>
                    ))}
                </select>
            </div>

            {/* Input para seleccionar archivo */}
            <div className="input-group mb-3">
                <span className="input-group-text">Subir Imagen:</span>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            {/* Optional: Input for direct URL if no file is selected for upload */}
            {/* This is useful if you want to allow users to link to external images too */}
            {!localSelectedFile && (
                <div className="input-group mb-3">
                    <span className="input-group-text">URL Imagen (manual):</span>
                    <input
                        type="text"
                        onChange={(event) => setImagenUrl(event.target.value)} // Directamente actualiza la URL para el DB
                        className="form-control"
                        value={imagenUrl} // Displays the actual imagenUrl from prop
                        placeholder="O pegue la URL de una imagen existente"
                    />
                </div>
            )}


            {/* Previsualización de la imagen (usa previewImageUrl) */}
            {(previewImageUrl || imagenUrl) && ( // Show preview if either is available
                <div className="mb-3 text-center">
                    <img
                        src={previewImageUrl || imagenUrl} // Prioritize local preview, then actual image URL
                        alt="Previsualización del producto"
                        style={{ maxWidth: "150px", maxHeight: "150px", border: "1px solid #ddd", padding: "5px" }}
                    />
                </div>
            )}

            <div className="d-flex justify-content-center">
                <button className="btn btn-success me-2" onClick={onSubmit}>
                    {editarProducto ? "Actualizar" : "Registrar"}
                </button>
                <button className="btn btn-danger" onClick={limpiarCampos}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ProductForm;