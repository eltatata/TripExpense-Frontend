import React from "react";
import HotelsNavbar from "../../components/HotelsNavbar/HotelsNavbar";
import HotelsHero from "../../components/HotelsHero/HotelsHero";
import HotelsSearch from "../../components/HotelsSearch/HotelsSearch";
import "./HotelsPage.css"

const HotelsPage = () => {
    return (
        <div className="hp-page">
            <HotelsNavbar className="hp-navbar" />
            <HotelsHero className="hero">
                <HotelsSearch className="search-form" />
            </HotelsHero>
        </div>
    );
};

export default HotelsPage;