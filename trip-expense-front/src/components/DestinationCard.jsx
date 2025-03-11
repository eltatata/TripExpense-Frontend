import React from "react";
import "./DestinationCard.css";

const DestinationCard = ({city, img}) => {
    return (
        <div className="destination-card">
            <img src={img} alt={city} className="destination-card__image"/>
            <div className="destination-card__content">
                <h3>{city}</h3>
                <p>Vuelos • Hoteles • Resorts</p>
            </div>
        </div>
    );
};

export default DestinationCard;