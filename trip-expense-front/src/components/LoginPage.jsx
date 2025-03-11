// LoginPage.jsx
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Sección de Imagen */}
        <div className="login-image"></div>
        
        {/* Sección de Formulario */}
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder.</p>
          
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button className="login-button">Iniciar Sesión</button>
          
          <p className="register-text">
            ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;