import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnauthorizedPage.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-title"><span className="title-number">403 -</span> Acceso Denegado</h1>
      <p className="unauthorized-message">
        No tienes permiso para acceder a esta página. 
        Por favor, inicia sesión como administrador o vuelve al inicio.
      </p>
      <div className="unauthorized-buttons">
        <button onClick={() => navigate("/")} className="unauthorized-btn">
          Ir a la Página Principal
        </button>
        <button onClick={() => navigate("/login")} className="unauthorized-btn">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
