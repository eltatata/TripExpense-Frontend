import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import SearchForm from "../../components/SearchForm/SearchForm";
import Destinations from "../../components/Destinations/Destinations";
import FlightsHotels from "../../components/FlightsHotels/FlightsHotels";
import "./LandingPage.css";

const flightsOptions = [
    { image: "/assets/Flight2.jpg" },
    { title: "Vuelos", description: "Descubre nuestras mejores opciones de viaje", image: "/assets/Flight.jpg", buttonText: "Ver Vuelos" },
    { image: "/assets/Flight3.jpg" }
];

const hotelsOptions = [
    { image: "/assets/Hotel1.jpg" },
    { title: "Hoteles", description: "Encuentra tu hospedaje ideal", image: "/assets/Hotel.jpg", buttonText: "Ver Hoteles" },
    { image: "/assets/Hotel2.jpg" }
];

const LandingPage = () => {
    return (
        <div className="landing__page">
            <Navbar className="navbar" />
            <HeroSection className="hero">
                <SearchForm className="search-form" />
            </HeroSection>
            <div className="destinations__div">
                <Destinations/>
            </div>
            <div className="flightshotels__div">
                <FlightsHotels options={flightsOptions} />
            </div>
            <div className="flightshotels__div">
                <FlightsHotels options={hotelsOptions} />
            </div>
            <div className="footer__copyright">
                <p>&copy; {new Date().getFullYear()} TripExpense. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default LandingPage;
