// src/components/empleados/searchFormEmp.js
import React from "react";

const SearchFormEmp = ({
    cedulaBusqueda,
    setCedulaBusqueda,
    nombre1Busqueda,
    setNombre1Busqueda,
    nombre2Busqueda, // NEW PROP
    setNombre2Busqueda, // NEW PROP
    apellido1Busqueda,
    setApellido1Busqueda,
    apellido2Busqueda, // NEW PROP
    setApellido2Busqueda, // NEW PROP
    telefonoBusqueda, // NEW PROP
    setTelefonoBusqueda, // NEW PROP
    direccionBusqueda, // NEW PROP
    setDireccionBusqueda, // NEW PROP
    getAll,
}) => {
    return (
        <div className="mb-4">
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Buscar por Cédula</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cedulaBusqueda}
                        onChange={(e) => setCedulaBusqueda(e.target.value)}
                        placeholder="Ingrese la cédula"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Buscar por Primer Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre1Busqueda}
                        onChange={(e) => setNombre1Busqueda(e.target.value)}
                        placeholder="Ingrese primer nombre"
                    />
                </div>

                {/* NEW SEARCH FIELDS */}
                <div className="col-md-4">
                    <label className="form-label">Buscar por Segundo Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre2Busqueda}
                        onChange={(e) => setNombre2Busqueda(e.target.value)}
                        placeholder="Ingrese segundo nombre"
                    />
                </div>
                {/* END NEW SEARCH FIELDS */}

                <div className="col-md-4">
                    <label className="form-label">Buscar por Primer Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido1Busqueda}
                        onChange={(e) => setApellido1Busqueda(e.target.value)}
                        placeholder="Ingrese primer apellido"
                    />
                </div>

                {/* NEW SEARCH FIELDS */}
                <div className="col-md-4">
                    <label className="form-label">Buscar por Segundo Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido2Busqueda}
                        onChange={(e) => setApellido2Busqueda(e.target.value)}
                        placeholder="Ingrese segundo apellido"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Buscar por Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        value={telefonoBusqueda}
                        onChange={(e) => setTelefonoBusqueda(e.target.value)}
                        placeholder="Ingrese el teléfono"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Buscar por Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={direccionBusqueda}
                        onChange={(e) => setDireccionBusqueda(e.target.value)}
                        placeholder="Ingrese la dirección"
                    />
                </div>
                {/* END NEW SEARCH FIELDS */}

                <div className="col-md-4 d-flex align-items-end justify-content-center">
                    <button className="btn btn-primary w-100" onClick={getAll}>
                        Mostrar Todos los Empleados
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFormEmp;