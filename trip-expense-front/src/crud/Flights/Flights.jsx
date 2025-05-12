import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Flights.css";
import CreateFlightModal from "../../components/modals/CreateFlightModal";
import EditFlightModal from "../../components/modals/EditFlightModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);
  const [flightToEdit, setFlightToEdit] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get("/flights");
        const flightsArray = Array.isArray(res.data) ? res.data : res.data.data;
        setFlights(flightsArray || []);
      } catch (error) {
        console.error("Error al obtener vuelos:", error);
        setFlights([]);
      }
    };

    fetchFlights();
  }, []);

  const handleCreate = (newFlight) => {
    setFlights([...flights, newFlight]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedFlight) => {
    const updatedFlights = flights.map((flight) =>
      flight.flightId === updatedFlight.flightId ? updatedFlight : flight
    );
    setFlights(updatedFlights);
    setEditModalOpen(false);
    setFlightToEdit(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/flights/${flightToDelete}`);
      setFlights(flights.filter((flight) => flight.flightId !== flightToDelete));
      setDeleteModalOpen(false);
      setFlightToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el vuelo:", error);
    }
  };

  const toggleExpand = (flightId) => {
    setExpandedCard(expandedCard === flightId ? null : flightId);
  };

  return (
    <div className="flights-container">
      <div className="flights-header">
        <h2 className="flights-title">Gestión de Vuelos</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear vuelo
        </button>
      </div>

      <div className="cards-wrapper">
        {flights.length === 0 ? (
          <p className="no-flights-message">No hay vuelos disponibles</p>
        ) : (
          flights.map((flight) => (
            <div className="flight-card" key={flight.flightId}>
              <img
                src={flight.logo || "https://via.placeholder.com/300"}
                alt={`${flight.airline} logo`}
                className="flight-logo"
              />
              <div className="flight-info">
                <h3>{flight.airline}</h3>
                <p><strong>Vuelo:</strong> {flight.flightNumber}</p>
                <p><strong>Origen:</strong> {flight.origin}</p>
                <p><strong>Destino:</strong> {flight.destination}</p>

                {expandedCard === flight.flightId && (
                  <div className="extra-info">
                    <p><strong>Salida:</strong> {flight.departure}</p>
                    <p><strong>Llegada:</strong> {flight.arrival}</p>
                    <p><strong>Duración:</strong> {flight.duration} min</p>
                  </div>
                )}

                <div className="action-buttons">
                  <button className="toggle-button" onClick={() => toggleExpand(flight.flightId)}>
                    {expandedCard === flight.flightId ? "Ocultar" : "Ver más"}
                  </button>
                  <button className="edit-button" onClick={() => {
                    setFlightToEdit(flight);
                    setEditModalOpen(true);
                  }}>Editar</button>
                  <button className="delete-button" onClick={() => {
                    setFlightToDelete(flight.flightId);
                    setDeleteModalOpen(true);
                  }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateFlightModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditFlightModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        flightToEdit={flightToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar vuelo?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este vuelo?"
      />
    </div>
  );
};

export default Flights;
