import React from "react";
import HotelsNavbar from "../../components/HotelsNavbar/HotelsNavbar";
import HotelsHero from "../../components/HotelsHero/HotelsHero";
import HotelsSearch from "../../components/HotelsSearch/HotelsSearch";
import HotelsPlaces from "../../components/HotelsPlaces/HotelsPlaces";
import Hotels from "../../components/Hotels/Hotels"
import "./HotelsPage.css"

const HotelsPage = () => {
    return (
        <div className="hp-page">
            <HotelsNavbar className="hp-navbar" />
            <HotelsHero className="-hp-hero">
                <HotelsSearch className="hp-form" />
            </HotelsHero>
            <div className="hp-places">
                <HotelsPlaces />
            </div>
            <div className="hp-hotels">
                <Hotels/>
            </div>
        </div>
    );
};

export default HotelsPage;