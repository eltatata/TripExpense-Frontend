import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SearchForm from "./SearchForm";
import "./LandingPage.css";
import Destinations from "./Destinations";

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
        </div>
    );
};

export default LandingPage;