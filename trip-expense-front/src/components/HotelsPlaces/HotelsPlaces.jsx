import React from "react";
import PlacesCard from "../HotelsPlacesCard/HotelsPlacesCard";
import { useNavigate } from "react-router-dom";
import "./HotelsPlaces.css";

const places = [
    { city: "París", img: "../assets/Estambul.jpg" },
    { city: "Londres", img: "../assets/Sidney.jpg" },
    { city: "Nueva York", img: "../assets/Baku.jpg" },
    { city: "Brasil", img: "../assets/Maldives.jpg" }
];

const HotelsPlaces = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <section className="places">
            <div className="places-header">
                <div className="places-text">
                    <h2>Sumérgete en los viajes</h2>
                    <p>¿Vas a algún lugar para celebrar esta temporada? Ya sea que vayas a casa o a algún lugar para recorrer, tenemos las herramientas de viaje para llevarte a tu destino</p>
                </div>
                <button className="places-button" onClick={handleSignupClick}><strong>Ver Todo</strong></button>
            </div>
            <div className="places-cards">
                {places.map((destination, index) => (
                    <PlacesCard key={index} {...destination} />
                ))}
            </div>
        </section>
    );
};

export default HotelsPlaces;