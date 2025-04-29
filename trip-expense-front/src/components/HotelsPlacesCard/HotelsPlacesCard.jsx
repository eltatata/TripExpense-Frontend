import React from "react";
import "./HotelsPlacesCard.css";
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
                <p>Un viaje increíble</p>
                <button className="pc-button" onClick={handleSignupClick}><strong>Reservar un hotel</strong></button>
            </div>
        </div>
    );
};

export default PlacesCard;