import React, { useState } from "react";
import "./Flights.css";

const Flights = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: "Avianca",
      logo: "../assets/Newyork.jpg", 
      flightNumber: "AV123",
      origin: "Bogotá",
      destination: "Medellín",
      departure: "08:00",
      arrival: "09:00",
      duration: 60,
    },
    {
      id: 2,
      airline: "LATAM",
      logo: "../assets/Newyork.jpg",
      flightNumber: "AV123",
      origin: "Cartagena",
      destination: "Cali",
      departure: "14:00",
      arrival: "16:00",
      duration: 120,
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCreate = () => {
    const newFlight = {
      id: flights.length + 1,
      airline: "Nueva Aerolínea",
      logo: "",
      flightNumber: "XX999",
      origin: "Ciudad A",
      destination: "Ciudad B",
      departure: "00:00",
      arrival: "01:00",
      duration: 60,
    };
    setFlights([...flights, newFlight]);
  };

  const handleEdit = (id) => {
    alert(`Editar vuelo con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este vuelo?")) {
      setFlights(flights.filter((flight) => flight.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flights-container">
      <div className="flights-header">
        <h2 className="flights-title">Gestión de Vuelos</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear vuelo
        </button>
      </div>

      <div className="cards-wrapper">
        {flights.map((flight) => (
          <div className="flight-card" key={flight.id}>
            <img
              src={flight.logo}
              alt={`${flight.airline} logo`}
              className="flight-logo"
            />
            <div className="flight-info">
              <h3>{flight.airline}</h3>
              <p><strong>Número de vuelo:</strong> {flight.flightNumber}</p>
              <p><strong>Origen:</strong> {flight.origin}</p>
              <p><strong>Destino:</strong> {flight.destination}</p>

              {expandedCard === flight.id && (
                <div className="extra-info">
                  <p><strong>Hora de salida:</strong> {flight.departure}</p>
                  <p><strong>Hora de llegada:</strong> {flight.arrival}</p>
                  <p><strong>Duración:</strong> {flight.duration} min</p>
                </div>
              )}

              <div className="action-buttons">
                <button
                  className="toggle-button"
                  onClick={() => toggleExpand(flight.id)}
                >
                  {expandedCard === flight.id ? "Ocultar" : "Ver más"}
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(flight.id)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(flight.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flights;
