import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

const images = [image1, image2, image3];

const SignUpPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="su-page">
            <div className="su-container">
                <div className="su-images">
                    <img src={images[currentIndex]} alt="Fondo" />
                    <div className="su-dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={index === currentIndex ? "su-dot su-active" : "su-dot"}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>

                <div className="su-form-container">
                    <h2>Regístrate</h2>
                    <p>Completa el formulario para crear tu cuenta.</p>
                    <form>
                        <div className="su-input-group">
                            <input type="text" name="nombre" placeholder="Nombre" />
                        </div>
                        <div className="su-input-group">
                            <input type="text" name="apellido" placeholder="Apellido" />
                        </div>
                        <div className="su-input-group">
                            <input type="email" name="email" placeholder="Correo electrónico" />
                        </div>
                        <div className="su-input-group">
                            <input type="password" name="password" placeholder="Contraseña" />
                        </div>
                        <div className="su-input-group">
                            <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" />
                        </div>
                        <button type="submit" className="su-button">Crear cuenta</button>
                        <p className="su-login-text">
                            ¿Ya tienes una cuenta? <a href="/login" className="su-login-link">Iniciar sesión</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
