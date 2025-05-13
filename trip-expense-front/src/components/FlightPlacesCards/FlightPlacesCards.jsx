import React from "react";
import "./FlightPlacesCards.css";

const PlacesCard = ({ city, img, price }) => {
    return (
        <div className="pc-card">
            <img src={img} alt={city} className="pc-image" />
            <div className="pc-content">
                <h3>{city}</h3>
            </div>
            <p className="pc-price"><strong>From: ${price}</strong></p>
        </div>
    );
};

export default PlacesCard;
