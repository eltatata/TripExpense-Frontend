import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
    return(
        <div className="hero">
            <div className="hero__overlay"></div>
            <div className="hero__content">
            <h2 className="hero__subtitle">Explora el mundo a tu manera</h2>
            <h1 className="hero__title">Viajar nunca fue tan fácil</h1>
            <p className="hero__text">Encuentra destinos increíbles y ajusta tu viaje a tu presupuesto</p>

            </div>
        </div>
    );
};

export default HeroSection;