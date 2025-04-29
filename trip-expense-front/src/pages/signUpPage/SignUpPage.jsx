import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const images = [image1, image2, image3];

const SignUpPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        try {
          const response = await api.post("/signup", {
            firstName,
            lastName,
            phone,
            email,
            password,
          });
    
          if (response.status === 200) {
            navigate("/login");
          }
        } catch (error) {
            console.error('Error al registrarse: ', error)
        }
      };


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
                            <input type="text" name="nombre" placeholder ="Nombre"value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="su-input-group">
                            <input type="text" name="apellido" placeholder="Apellido" value={lastName}
                           onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="su-input-group">
                            <input type="text" name="phone" placeholder="Celular" value={phone}
                           onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="su-input-group">
                            <input type="email" name="email" placeholder="Correo electrónico" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="su-input-group">
                            <input type="password" name="password" placeholder="Contraseña" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
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
