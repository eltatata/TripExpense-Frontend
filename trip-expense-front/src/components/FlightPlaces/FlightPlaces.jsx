import React from "react";
import PlacesCard from "../FlightPlacesCards/FlightPlacesCards";
import { useNavigate } from "react-router-dom";
import "./FlightPlaces.css";

const places = [
    { city: "Nueva York, USA", img: "../assets/Newyork.jpg" },
    { city: "Londres, Reino Unido", img: "../assets/London.jpg" },
    { city: "Tokio, Japón", img: "../assets/Tokyo.jpg" },
    { city: "Dubái, Emiratos Árabes Unidos", img: "../assets/Dubai.jpg" }
];

const FlightsPlaces = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <section className="places">
            <div className="places-header">
                <div className="places-text">
                    <h2>Ciudades que inspiran viajes</h2>
                    <p>¿Viajas esta temporada? Te ayudamos a encontrar a tu próximo destino.</p>
                </div>
                <button className="places-button" onClick={handleSignupClick}><strong>Descubre más</strong></button>
            </div>
            <div className="places-cards">
                {places.map((destination, index) => (
                    <PlacesCard key={index} {...destination} />
                ))}
            </div>
        </section>
    );
};

export default FlightsPlaces;