import React from "react";
import FlightsCards from "../FlightsCards/FlightsCards.jsx";
import { useNavigate } from "react-router-dom";
import "./Flights.css";

const flights = [
    { city: "Sídney, Australia", img: "../assets/Sidney.jpg" },
    { city: "Bakú, Azerbaiyán", img: "../assets/Baku.jpg" },
    { city: "Malé, Maldivas", img: "../assets/Maldives.jpg" },
    { city: "París, Francia", img: "../assets/Paris2.jpg" }
    
];

const Flights = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <section className="flights">
            <div className="flights-header">
                <div className="flights-text">
                    <h2>Vuelos</h2>
                    <p>Tu próxima aventura empieza con el vuelo perfecto.</p>
                </div>
                <button className="flights-button" onClick={handleSignupClick}><strong>Descubre más</strong></button>
            </div>
            <div className="flights-cards">
                {flights.map((destination, index) => (
                    <FlightsCards key={index} {...destination} />
                ))}
            </div>
        </section>
    );
};

export default Flights;