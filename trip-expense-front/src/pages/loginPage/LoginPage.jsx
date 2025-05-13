import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const images = [image1, image2, image3];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("* El correo es obligatorio");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("* El correo no es válido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("* La contraseña es obligatoria");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("* La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data.userDTO;
        localStorage.setItem("user", JSON.stringify(user));
        user.role === "ADMIN" ? navigate("/admin") : navigate("/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
        navigate("/home");
      }
    } 
  };

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

          <form onSubmit={handleLogin}>

            <div className="lp-input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? "error" : ""}
              />
            </div>
            {emailError && <p className="lp-error-message">{emailError}</p>}

            <div className="lp-input-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passwordError ? "error" : ""}
              />
            </div>
            {passwordError && <p className="lp-error-message">{passwordError}</p>}

            <button type="submit" className="lp-button">
              Iniciar Sesión
            </button>

            <p className="lp-register-text">
              ¿No tienes cuenta?{" "}
              <a href="/signup" className="lp-register-link">
                Regístrate
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
