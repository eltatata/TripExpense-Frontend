import React, { useState } from "react";
import "../loginPage/LoginPage.css"
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="lp-container">
      <div className="lp-card">
        <div className="lp-image"></div>
        
        <div className="lp-form">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus datos para acceder.</p>
          
          <div className="lp-input-group"> 
            <input 
              placeholder="Correo Electrónico"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="lp-input-field"
            />
          </div>

          <div className="lp-input-group">
            <input 
              placeholder="Contraseña"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="lp-input-field"
            />
          </div>

          <button className="lp-button">Iniciar Sesión</button>
          
          <p className="lp-register-text">
            ¿No tienes cuenta? <a href="/signup" className="lp-register-link">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
