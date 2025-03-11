import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

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
        <div className="signup-container">
            <div className="images">
                <img src={images[currentIndex]} alt="Fondo" />
                <div className="dots">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={index === currentIndex ? "dot active" : "dot"}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>

            {/* Formulario de Registro */}
            <div className="form-container">
                <h2>Regístrate</h2>
                <p>Completa el formulario para crear tu cuenta.</p>
                <form>
                    <div className="input-group">
                        <input type="text" name="nombre" placeholder="Nombre" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="apellido" placeholder="Apellido" />
                    </div>
                    <div className="input-group">
                        <input type="email" name="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" placeholder="Contraseña" />
                    </div>
                    <div className="input-group">
                        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" />
                    </div>
                    <button type="submit">Crear cuenta</button>
                    <p className="form__login">¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
