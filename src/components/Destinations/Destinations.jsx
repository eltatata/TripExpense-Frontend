import React from "react";
import "./Destinations.css";
import DestinationCard from "../DestinationCard/DestinationCard";
import { useNavigate } from "react-router-dom"; 

const destinations = [
    { city: "Estambul, Turquía", img: "../assets/Estambul.jpg" },
    { city: "Sídney, Australia", img: "../assets/Sidney.jpg" },
    { city: "Bakú, Azerbaiyán", img: "../assets/Baku.jpg" },
    { city: "Malé, Maldivas", img: "../assets/Maldives.jpg" },
    { city: "París, Francia", img: "../assets/Paris2.jpg" },
    { city: "Nueva York, USA", img: "../assets/Newyork.jpg" },
    { city: "Londres, Reino Unido", img: "../assets/London.jpg" },
    { city: "Tokio, Japón", img: "../assets/Tokyo.jpg" },
    { city: "Dubái, Emiratos Árabes Unidos", img: "../assets/Dubai.jpg" }
  ];

const Destinations = () =>{
    const navigate = useNavigate(); 
  
    const handleSignupClick = () => {
      navigate("/signup"); 
    };
    return (
        <section className="destinations">
            <div className="destinations__header">
                <div className="destinations__text">
                    <h2>Descubre nuevos destinos</h2>
                    <p>Explora las mejores opciones para tu próximo viaje</p>
                </div>
                <button className="destinations__button" onClick={handleSignupClick}><strong>Descubre más</strong></button>
            </div>
            <div className="destinations__grid">
                {destinations.map((destination, index) => (
                    <DestinationCard key={index} {...destination}/>
                ))}
            </div>
        </section>
    );
};

export default Destinations;