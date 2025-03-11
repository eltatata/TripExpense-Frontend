import React, { useState, useEffect } from "react";
import "./SignUpPage.css";

const images = [
    "/assets/image1.jpg", // Cambia estos nombres por las imágenes reales
    "/assets/image2.jpg",
    "/assets/image3.jpg",
];

const SignUpPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambiar la imagen cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="registro-container">

            <div className="imagen-lateral">
                <img src={images[currentIndex]} alt="Fondo de registro" />
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


            <div className="formulario-container">
                <h2>Regístrate</h2>
                <p>Completa el formulario para crear tu cuenta.</p>
                <form>
                    <div className="input-group">
                        <input type="text" name="nombre" placeholder="Nombre" />
                        <input type="text" name="apellido" placeholder="Apellido" />
                    </div>
                    <div className="input-group">
                        <input type="email" name="email" placeholder="Correo electrónico" />
                        <input type="text" name="telefono" placeholder="Teléfono" />
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" placeholder="Contraseña" />
                        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" />
                    </div>
                    <button type="submit">Crear cuenta</button>
                    <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;