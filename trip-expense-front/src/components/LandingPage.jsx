import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SearchForm from "./SearchForm";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing__page">
            <Navbar />
            <HeroSection />
            <div className="search__div">
                <SearchForm />
            </div>
        </div>
    );
};

export default LandingPage;