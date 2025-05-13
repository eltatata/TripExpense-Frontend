import React from "react";
import "./FlightsHero.css";

const FlightsHero = ({ children }) => {
    return (
        <div className="f-hero">
            <div className="f-overlay"></div>
            <div className="f-content">
                <h1 className="f-title">Vuela sin complicaciones, disfruta sin límites</h1>
                <p className="f-text">Encuentra las mejores rutas y precios para tu próximo destino</p>
                </div>
            {children}
        </div>
    );
};

export default FlightsHero;