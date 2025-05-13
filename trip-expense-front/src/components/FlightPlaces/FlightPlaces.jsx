import React from "react";
import PlacesCard from "../FlightPlacesCards/FlightPlacesCards";
import { useNavigate } from "react-router-dom";
import "./FlightPlaces.css";

const places = [
    { city: "Nueva York, USA", img: "../assets/Newyork.jpg", price: 650},
    { city: "Londres, Reino Unido", img: "../assets/London.jpg" ,price: 730},
    { city: "Tokio, Japón", img: "../assets/Tokyo.jpg", price: 890 },
    { city: "Dubái (EAU)", img: "../assets/Dubai.jpg", price: 999 }
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