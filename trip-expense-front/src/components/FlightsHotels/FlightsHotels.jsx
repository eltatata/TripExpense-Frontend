import React from "react";
import "./FlightsHotels.css";

const options = [
    { 
        title: "Vuelos", 
        description: "Busca vuelos hacia nuestros destinos más populares", 
        image: "/assets/Flight.png",
        buttonText: "Ver Vuelos"    
    },
    { 
        title: "Hoteles", 
        description: "Busca hoteles en nuestros destinos más populares", 
        image: "/assets/Hotel.jpg",
        buttonText: "Ver Hoteles" 
    }
];

const FlightsHotels = () => {
    return (
        <section className="flights-hotels">
            {options.map((option, index) => (
                <div 
                    key={index} 
                    className="flights-hotels__option"
                    style={{ backgroundImage: `url(${option.image})` }}
                >
                    <h2>{option.title}</h2>
                    <p>{option.description}</p>
                    <button className="flights-hotels__button">{option.buttonText}</button>
                </div>
            ))}
        </section>
    );
};

export default FlightsHotels;
