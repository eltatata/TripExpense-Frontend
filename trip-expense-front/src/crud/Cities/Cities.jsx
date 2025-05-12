import React, { useState } from "react";
import "./Cities.css";

const Cities = () => {
  const [cities, setCities] = useState([
    {
      id: 1,
      name: "París",
      country: "Francia",
      description: "La ciudad del amor, famosa por la Torre Eiffel.",
      image: "../assets/Newyork.jpg",
      language: "Francés",
      currency: "Euro",
      weather: "Templado",
      bestTimeToVisit: "Abril a junio y septiembre a octubre",
    },
    {
      id: 2,
      name: "Tokio",
      country: "Japón",
      description: "Una ciudad vibrante que combina lo moderno y lo tradicional.",
      image: "../assets/Newyork.jpg",
      language: "Japonés",
      currency: "Yen",
      weather: "Húmedo subtropical",
      bestTimeToVisit: "Marzo a mayo y octubre a noviembre",
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCreate = () => {
    const newCity = {
      id: cities.length + 1,
      name: "Nueva Ciudad",
      country: "País X",
      description: "Descripción de ejemplo.",
      image: "../assets/Newyork.jpg",
      language: "Idioma X",
      currency: "Moneda X",
      weather: "Clima X",
      bestTimeToVisit: "Época ideal",
    };
    setCities([...cities, newCity]);
  };

  const handleEdit = (id) => {
    alert(`Editar ciudad con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta ciudad?")) {
      setCities(cities.filter((city) => city.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="cities-container">
      <div className="cities-header">
        <h2 className="cities-title">Gestión de Ciudades</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear ciudad
        </button>
      </div>

      <div className="cards-wrapper">
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <img src={city.image} alt={city.name} className="city-image" />
            <div className="city-info">
              <h3>{city.name}</h3>
              <p><strong>País:</strong> {city.country}</p>
        

              {expandedCard === city.id && (
                <div className="extra-info">
                  <p><strong>Descripción:</strong> {city.description}</p>
                  <p><strong>Idioma:</strong> {city.language}</p>
                  <p><strong>Moneda:</strong> {city.currency}</p>
                  <p><strong>Clima:</strong> {city.weather}</p>
                  <p><strong>Mejor época para visitar:</strong> {city.bestTimeToVisit}</p>
                </div>
              )}

              <div className="action-buttons">
                <button className="toggle-button" onClick={() => toggleExpand(city.id)}>
                  {expandedCard === city.id ? "Ocultar" : "Ver más"}
                </button>
                <button className="edit-button" onClick={() => handleEdit(city.id)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(city.id)}>
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

export default Cities;
