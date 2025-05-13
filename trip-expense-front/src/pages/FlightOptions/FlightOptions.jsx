import React, { useState } from "react";
import "./FlightOptions.css";
import FiltersSidebar from '../../components/FiltersSidebar/FiltersSidebar';
import FlightsCardOpt from "../../components/FlightCardOpt/FlightsCardOpt";
import Navbar from "../../components/Navbar/Navbar";

const FlightOptions = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: "Emirates",
      rating: 4.2,
      reviews: 54,
      price: 104,
      time: "12:00 pm - 01:28 pm",
      duration: "2h 28m",
      route: "EWR - BNA",
    },
    {
      id: 2,
      airline: "Fly Dubai",
      rating: 4.2,
      reviews: 54,
      price: 104,
      time: "12:00 pm - 01:28 pm",
      duration: "2h 28m",
      route: "EWR - BNA",
    },
    {
      id: 3,
      airline: "Qatar",
      rating: 4.2,
      reviews: 54,
      price: 104,
      time: "12:00 pm - 01:28 pm",
      duration: "2h 28m",
      route: "EWR - BNA",
    },
    {
      id: 4,
      airline: "Etihad",
      rating: 4.2,
      reviews: 54,
      price: 104,
      time: "12:00 pm - 01:28 pm",
      duration: "2h 28m",
      route: "EWR - BNA",
    },
  ]);

  return (
    <div className="flight-options-container">
      <div className="flight-options-navbar">
        <Navbar />
      </div>
      <div className="flight-options-content">
          <FiltersSidebar />
        <div className="flight-options-results">
         
          {flights.map((flight) => (
            <FlightsCardOpt key={flight.id} flight={flight} />
          ))}
          <button className="flight-options-show-more">Show more results</button>
        </div>
      </div>
    </div>
  );
};

export default FlightOptions;
