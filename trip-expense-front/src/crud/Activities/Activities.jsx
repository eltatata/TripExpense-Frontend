import React, { useState } from "react";
import "./Activities.css";

const Activities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      city: "Medellín",
      name: "Tour Comuna 13",
      description: "Recorrido cultural por el arte urbano y la historia de la Comuna 13.",
      image: "../assets/Newyork.jpg",
      category: "Cultural",
      duration: "2 horas",
      location: "Comuna 13",
      difficulty: "Fácil",
    },
    {
      id: 2,
      city: "Cartagena",
      name: "Tour en barco a las Islas",
      description: "Paseo en barco para visitar las islas del Rosario.",
      image: "../assets/Newyork.jpg",
      category: "Aventura",
      duration: "4 horas",
      location: "Muelle La Bodeguita",
      difficulty: "Media",
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCreate = () => {
    const newActivity = {
      id: activities.length + 1,
      city: "Ciudad X",
      name: "Nueva Actividad",
      description: "Descripción de la actividad.",
      image: "../assets/Newyork.jpg",
      category: "Categoría",
      duration: "1 hora",
      location: "Lugar",
      difficulty: "Fácil",
    };
    setActivities([...activities, newActivity]);
  };

  const handleEdit = (id) => {
    alert(`Editar actividad con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta actividad?")) {
      setActivities(activities.filter((activity) => activity.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="activities-container">
      <div className="activities-header">
        <h2 className="activities-title">Gestión de Actividades</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear actividad
        </button>
      </div>

      <div className="cards-wrapper">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <img src={activity.image} alt={activity.name} className="activity-image" />
            <div className="activity-info">
              <h3>{activity.name}</h3>
              <p><strong>Ciudad:</strong> {activity.city}</p>
              <p><strong>Categoría:</strong> {activity.category}</p>

              {expandedCard === activity.id && (
                <div className="extra-info">
                  <p><strong>Descripción:</strong> {activity.description}</p>
                  <p><strong>Duración:</strong> {activity.duration}</p>
                  <p><strong>Ubicación:</strong> {activity.location}</p>
                  <p><strong>Dificultad:</strong> {activity.difficulty}</p>
                </div>
              )}

              <div className="action-buttons">
                <button className="toggle-button" onClick={() => toggleExpand(activity.id)}>
                  {expandedCard === activity.id ? "Ocultar" : "Ver más"}
                </button>
                <button className="edit-button" onClick={() => handleEdit(activity.id)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(activity.id)}>
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

export default Activities;
