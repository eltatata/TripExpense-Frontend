import React from "react";
import "./FlightPlacesCards.css";
import { useNavigate } from "react-router-dom";

const PlacesCard = ({ city, img }) => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <div className="pc-card">
            <img src={img} alt={city} className="pc-image" />
            <div className="pc-content">
                <h3>{city}</h3>
                <button className="pc-button" onClick={handleSignupClick}><strong>Explorar vuelos</strong></button>
            </div>
        </div>
    );
};

export default PlacesCard;