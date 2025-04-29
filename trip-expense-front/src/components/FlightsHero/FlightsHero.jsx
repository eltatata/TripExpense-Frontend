import React from "react";
import "./FlightsHero.css";

const FlightsHero = ({ children }) => {
    return (
        <div className="f-hero">
            <div className="f-overlay"></div>
            <div className="f-content">
                <h1 className="f-title">Crea tu lista de viaje, nosotros nos encargamos del resto</h1>
                <p className="f-text">Ofertas especiales que se adaptan a tu plan</p>
            </div>
            {children}
        </div>
    );
};

export default FlightsHero;