import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SignUpPage.css";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import api from "../../services/api";

const images = [image1, image2, image3];

const SignUpPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const onSubmit = async () => {
        try {
            const response = await api.post("/auth/signup", {
                firstName,
                lastName,
                phone,
                email,
                password,
            });

            if (response.status === 200 || response.status === 201) {
                setFirstName("");
                setLastName("");
                setPhone("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }
            reset();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("El correo ya está registrado.");
            } else {
                setErrorMessage("Error inesperado. Intenta de nuevo.");
            }
            console.error("Error al registrarse: ", error);
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
                    <p>Completa el formulario para crear tu cuenta</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="su-input-group">
                            <input
                                type="text"
                                value={firstName}
                                {...register("firstName", {
                                    required: "El nombre es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Ingrese como mínimo 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Ingrese como máximo 15 caracteres"
                                    },
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                        message: "Ingrese un nombre valido (Solo letras)"
                                    }
                                })}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFirstName(value);
                                    setValue("firstName", value, { shouldValidate: true });
                                }}
                                placeholder={errors.firstName ? errors.firstName.message : "Nombre"}
                                className={errors.firstName ? "error" : ""}
                            />
                            {errors.firstName && errors.firstName.type !== "required" && (
                                <p className="su-error">{errors.firstName.message}</p>
                            )}
                        </div>


                        <div className="su-input-group">
                            <input
                                type="text"
                                value={lastName}
                                {...register("lastName", {
                                    required: "El apellido es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Ingrese como mínimo 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Ingrese como máximo 15 caracteres"
                                    },
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                        message: "Ingrese un apellido valido (Solo letras)"
                                    }
                                })}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLastName(value);
                                    setValue("lastName", value, { shouldValidate: true });
                                }}
                                placeholder={errors.lastName ? errors.lastName.message : "Apellido"}
                                className={errors.lastName ? "error" : ""}
                            />
                            {errors.lastName && errors.lastName.type !== "required" && (
                                <p className="su-error">{errors.lastName.message}</p>
                            )}
                        </div>

                        <div className="su-input-group">
                            <input
                                type="text"
                                value={phone}
                                {...register("phone", {
                                    required: "El celular es obligatorio",
                                    pattern: {
                                        value: /^[0-9]{7,14}$/,
                                        message: "El número debe tener entre 7 y 14 dígitos",
                                    },
                                })}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPhone(value);
                                    setValue("phone", value, { shouldValidate: true });
                                }}
                                placeholder={errors.phone ? errors.phone.message : "Celular"}
                                className={errors.phone ? "error" : ""}
                            />

                            {errors.phone && errors.phone.type !== "required" && (
                                <p className="su-error">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="su-input-group">
                            <input
                                type="email"
                                value={email}
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Correo no válido",
                                    },
                                })}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEmail(value);
                                    setValue("email", value, { shouldValidate: true });
                                }}
                                placeholder={errors.email ? errors.email.message : "Correo electrónico"}
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && errors.email.type !== "required" && (
                                <p className="su-error">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="su-input-group">
                            <input
                                type="password"
                                value={password}
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: {
                                        value: 6,
                                        message: "Debe tener mínimo 6 caracteres",
                                    },
                                })}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPassword(value);
                                    setValue("password", value, { shouldValidate: true });
                                }}
                                placeholder={errors.password ? errors.password.message : "Contraseña"}
                                className={errors.password ? "error" : ""}
                            />
                            {errors.password && errors.password.type !== "required" && (
                                <p className="su-error">{errors.password.message}</p>
                            )}
                        </div>

                        {errorMessage && <p className="su-error">{errorMessage}</p>}

                        <button type="submit" className="su-button">
                            Crear cuenta
                        </button>
                        <p className="su-login-text">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="su-login-link">
                                Iniciar sesión
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

