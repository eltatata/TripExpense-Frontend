import React from "react";
import FlightsNavbar from "../../components/FlightsNavBar/FlightsNavbar";
import FlightsHero from "../../components/FlightsHero/FlightsHero";
import FlightsSearch from "../../components/FlightsSearch/FlightsSearch";
import FlightsPlaces from "../../components/FlightPlaces/FlightPlaces";
import Flights from "../../components/Flights/Flights"
import "./FlightsPage.css"

const FlightsPage = () => {
    return (
        <div className="fp-page">
            <FlightsNavbar className="fp-navbar" />
            <FlightsHero className="-fp-hero">
                <FlightsSearch className="fp-form" />
            </FlightsHero>
            <div className="fp-places">
                <FlightsPlaces />
            </div>
            <div className="fp-flights">
                <Flights/>
            </div>
        </div>
    );
};

export default FlightsPage;