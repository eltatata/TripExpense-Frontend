import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./LandingPage.css";
import Destinations from "../../components/Destinations/Destinations";
import FlightsHotels from "../../components/FlightsHotels/FlightsHotels";

const LandingPage = () => {
    return (
        <div className="landing__page">
            <Navbar className="navbar" />
            <HeroSection className="hero" />
            <div className="search__div">
                <SearchForm />
            </div>
            <div className="destinations__div">
                <Destinations/>
            </div>
            <div className="flightshotels__div">
                <FlightsHotels/>
            </div>
            <div className="footer__copyright">
                <p>&copy; {new Date().getFullYear()} TripExpense. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default LandingPage;