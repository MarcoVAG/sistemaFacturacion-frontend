// src/components/LoginForm.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté accesible
import './styles/login.css'; // Asegúrate de que tus estilos personalizados estén accesibles

const LoginForm = ({
  email,
  password,
  loading,
  error,
  setEmail,
  setPassword,
  handleSubmit
}) => {
  return (
    <div className="container mt-5">
      <div className="card text-center shadow login-card">
        <div className="card-header bg-primary text-white">
          <h4 className="m-0">INICIAR SESIÓN</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">Correo electrónico:</span>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña:</span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
          <div className="mt-3">
            <a href="#" className="text-primary">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;