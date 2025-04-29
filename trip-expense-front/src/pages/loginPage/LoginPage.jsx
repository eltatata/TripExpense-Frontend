import React, { useState, useEffect } from "react";
import "./LoginPage.css"
import image1 from "../../assets/image1.jpg"
import image2 from "../../assets/image2.jpg"
import image3 from "../../assets/image3.jpg"

const images = [image1, image2, image3];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lp-page">
      <div className="lp-container">
        <div className="lp-images">
          <img src={images[currentIndex]} alt="Fondo" />
          <div className="lp-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? "lp-dot lp-active" : "lp-dot"}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="lp-form-container">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus datos para acceder.</p>
          <form>
            <div className="lp-input-group">
              <input type="email" name="email" placeholder="Correo electrónico" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="lp-input-group">
              <input type="password" name="password" placeholder="Contraseña" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="lp-button">Iniciar Sesión</button>

            <p className="lp-register-text">
              ¿No tienes cuenta? <a href="/signup" className="lp-register-link">Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
