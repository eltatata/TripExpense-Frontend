import React, { useState, useEffect } from "react";
import api from "../../services/api"; 
import "./Activities.css";
import CreateActivityModal from "../../components/modals/CreateActivityModal"; 
import EditActivityModal from "../../components/modals/EditActivityModal"; 
import ConfirmModal from "../../components/modals/ConfirmModal"; 

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [activityToEdit, setActivityToEdit] = useState(null); 

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get("/activities"); 
        const activitiesArray = Array.isArray(res.data) ? res.data : res.data.data;  
        setActivities(activitiesArray || []);  
      } catch (error) {
        console.error("Error al obtener actividades:", error);
        setActivities([]); 
      }
    };

    fetchActivities();
  }, []);

  const handleCreate = (newActivity) => {
    setActivities([...activities, newActivity]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedActivity) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(updatedActivities);
    setEditModalOpen(false); 
    setActivityToEdit(null); 
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/activities/${activityToDelete}`);
      setActivities(activities.filter((activity) => activity.id !== activityToDelete));
      setDeleteModalOpen(false); 
      setActivityToDelete(null);
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="activities-container">
      <div className="activities-header">
        <h2 className="activities-title">Gestión de Actividades</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear actividad
        </button>
      </div>

      <div className="cards-wrapper">
        {activities.length === 0 ? (
          <p className="no-activities-message">No hay actividades disponibles</p> 
        ) : (
          activities.map((activity) => (
            <div className="activity-card" key={activity.id}>
              <img src={activity.image || "https://via.placeholder.com/300"} alt={activity.name} className="activity-image" />
              <div className="activity-info">
                <h3>{activity.name}</h3>
                <p><strong>Ciudad:</strong> {activity.city}</p>

                {expandedCard === activity.id && (
                  <div className="extra-info">
                    <p><strong>Categoría:</strong> {activity.category}</p>
                    <p><strong>Descripción:</strong> {activity.description}</p>
                    <p><strong>Duración:</strong> {activity.duration}</p>
                    <p><strong>Ubicación:</strong> {activity.location}</p>
                    <p><strong>Dificultad:</strong> {activity.difficulty}</p>
                    <p><strong>Precio:</strong> {activity.price}</p>
                  </div>
                )}

                <div className="action-buttons">
                  <button className="toggle-button" onClick={() => toggleExpand(activity.id)}>
                    {expandedCard === activity.id ? "Ocultar" : "Ver más"}
                  </button>
                  <button className="edit-button" onClick={() => {
                    setActivityToEdit(activity); 
                    setEditModalOpen(true);
                  }}>Editar</button>
                  <button className="delete-button" onClick={() => {
                    setActivityToDelete(activity.id); 
                    setDeleteModalOpen(true);
                  }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateActivityModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditActivityModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        activityToEdit={activityToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar actividad?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar esta actividad?"
      />
    </div>
  );
};

export default Activities;
