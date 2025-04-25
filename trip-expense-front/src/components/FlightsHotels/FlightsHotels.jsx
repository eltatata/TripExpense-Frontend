// FlightsHotels.js
import React from "react";
import "./FlightsHotels.css";
import { useNavigate } from "react-router-dom"; 

const FlightsHotels = ({ options }) => {
    const navigate = useNavigate(); 
  
    const handleSignupClick = () => {
      navigate("/signup"); 
    };

    return (
        <section className="flights-hotels">
            {options.map((option, index) => (
                <div 
                    key={index} 
                    className={`flights-hotels__option ${index === 1 ? 'center-option' : ''}`}
                    style={{ backgroundImage: `url(${option.image})` }}
                >
                    {index === 1 && option.title && ( 
                        <>
                            <h2>{option.title}</h2>
                            <p>{option.description}</p>
                            <button className="flights-hotels__button" onClick={handleSignupClick}>{option.buttonText}</button>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

export default FlightsHotels;
