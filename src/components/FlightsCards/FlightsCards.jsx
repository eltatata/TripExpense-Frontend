import React from "react";
import "./FlightsCards.css";
import { useNavigate } from "react-router-dom";

const FlightsCard = ({ city, img }) => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <div className="fc-card">
            <img src={img} alt={city} className="fc-image" />
            <div className="fc-content">
                <h3>{city}</h3>
                <p>Economy • Bussines • First</p>
                <button className="fc-button" onClick={handleSignupClick}><strong>Ver vuelos</strong></button>
            </div>
        </div>
    );
};

export default FlightsCard;