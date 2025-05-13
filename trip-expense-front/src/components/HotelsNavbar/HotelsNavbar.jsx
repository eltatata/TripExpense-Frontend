import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/TripExpenseLogo.png";
import Foto from "../../../public/assets/FotoPerfil1.png";
import "./HotelsNavbar.css";

const HotelsNavbar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleFlightsClick = () => {
        navigate("/flights");
    };

    return (
        <nav className="hnav-container">
            <div className="hnav-flightshotels">
                <button className="hnav-button" onClick={handleFlightsClick}> Encuentra Vuelos </button>
                <button className="hnav-button active"> Encuentra Hoteles </button>
            </div>

            <div className="hnav-logo" onClick={handleLogoClick}>
                <img src={Logo} alt="TripExpense Logo" />
            </div>

            <div className="hnav-user">
                <button className="hnav-button"> Favoritos </button>

                <div className="hnav-profile">
                    <button className="hnav-pbutton">
                        <img src={Foto} alt="User" className="hnav-pimage" />
                        <span className="hnav-pname">Perfil</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default HotelsNavbar;