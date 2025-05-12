import React, { useState } from "react";
import "./Packages.css";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Aventura en Cartagena",
      description: "Disfruta de una semana en Cartagena con actividades acuáticas y tours históricos.",
      image: "../assets/Newyork.jpg",
      destination: "Cartagena",
      pricePerPerson: "$1,200",
      durationDays: 7,
      hotel: "Hotel Mar Azul",
      flight: "Vuelo 456 - Avianca",
      activities: ["Tour en barco", "Visita al Castillo", "Snorkeling"],
      type: "Familiar",
    },
    {
      id: 2,
      name: "Explora Medellín",
      description: "Conoce la ciudad de la eterna primavera, su cultura, comida y paisajes.",
      image: "../assets/Newyork.jpg",
      destination: "Medellín",
      pricePerPerson: "$950",
      durationDays: 5,
      hotel: "Hotel El Bosque",
      flight: "Vuelo 123 - LATAM",
      activities: ["Tour Comuna 13", "Metrocable", "Parque Arví"],
      type: "Cultural",
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCreate = () => {
    const newPackage = {
      id: packages.length + 1,
      name: "Nuevo Paquete",
      description: "Descripción del nuevo paquete.",
      image: "../assets/Newyork.jpg",
      destination: "Ciudad X",
      pricePerPerson: "$0",
      durationDays: 1,
      hotel: "Hotel X",
      flight: "Vuelo X",
      activities: [],
      type: "Tipo X",
    };
    setPackages([...packages, newPackage]);
  };

  const handleEdit = (id) => {
    alert(`Editar paquete con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este paquete?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="packages-container">
      <div className="packages-header">
        <h2 className="packages-title">Gestión de Paquetes de Viaje</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear paquete
        </button>
      </div>

      <div className="cards-wrapper">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.name} className="package-image" />
            <div className="package-info">
              <h3>{pkg.name}</h3>
              <p><strong>Destino:</strong> {pkg.destination}</p>
              <p><strong>Precio:</strong> {pkg.pricePerPerson}</p>
              <p><strong>Tipo:</strong> {pkg.type}</p>

              {expandedCard === pkg.id && (
                <div className="extra-info">
                  <p><strong>Descripción:</strong> {pkg.description}</p>
                  <p><strong>Duración:</strong> {pkg.durationDays} días</p>
                  <p><strong>Hotel incluido:</strong> {pkg.hotel}</p>
                  <p><strong>Vuelo incluido:</strong> {pkg.flight}</p>
                  <p><strong>Actividades:</strong></p>
                  <ul className="activities-list">
                    {pkg.activities.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="action-buttons">
                <button className="toggle-button" onClick={() => toggleExpand(pkg.id)}>
                  {expandedCard === pkg.id ? "Ocultar" : "Ver más"}
                </button>
                <button className="edit-button" onClick={() => handleEdit(pkg.id)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(pkg.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
