import React from "react";
import "./HotelsHero.css";

const HotelsHero = ({ children }) => {
    return (
        <div className="h-hero">
            <div className="h-overlay"></div>
            <div className="h-content">
                <h1 className="h-title">Crea tu lista de viaje, nosotros nos encargamos del resto</h1>
                <p className="h-text">Ofertas especiales que se adaptan a tu plan</p>
            </div>
            {children}
        </div>
    );
};

export default HotelsHero;