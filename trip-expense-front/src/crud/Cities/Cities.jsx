import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Cities.css";
import CreateCityModal from "../../components/modals/CreateCityModal";
import EditCityModal from "../../components/modals/EditCityModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [cityToEdit, setCityToEdit] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities");
        const citiesArray = Array.isArray(res.data) ? res.data : res.data.data; 
        setCities(citiesArray || []);
      } catch (error) {
        console.error("Error al obtener ciudades:", error);
        setCities([]); 
      }
    };

    fetchCities();
  }, []);

  const handleCreate = (newCity) => {
    setCities([...cities, newCity]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedCity) => {
    const updatedCities = cities.map((city) =>
      city.cityId === updatedCity.cityId ? updatedCity : city
    );
    setCities(updatedCities);
    setEditModalOpen(false);
    setCityToEdit(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cities/${cityToDelete}`);
      setCities(cities.filter((city) => city.cityId !== cityToDelete));
      setDeleteModalOpen(false);
      setCityToDelete(null);
    } catch (error) {
      console.error("Error al eliminar la ciudad:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="cities-container">
      <div className="cities-header">
        <h2 className="cities-title">Gestión de Ciudades</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear ciudad
        </button>
      </div>

      <div className="cards-wrapper">
        {cities.length === 0 ? (
          <p className="no-cities-message">No hay ciudades disponibles</p>
        ) : (
          cities.map((city) => (
            <div key={city.cityId} className="city-card">
              <img src={city.image || "https://via.placeholder.com/300"} alt={city.name} className="city-image" />
              <div className="city-info">
                <h3>{city.name}</h3>
                <p><strong>País:</strong> {city.country}</p>

                {expandedCard === city.cityId && (
                  <div className="extra-info">
                    <p><strong>Descripción:</strong> {city.description}</p>
                    <p><strong>Idioma:</strong> {city.language}</p>
                    <p><strong>Moneda:</strong> {city.currency}</p>
                    <p><strong>Clima:</strong> {city.weather}</p>
                    <p><strong>Mejor época para visitar:</strong> {city.bestTimeToVisit}</p>
                  </div>
                )}

                <div className="action-buttons">
                  <button className="toggle-button" onClick={() => toggleExpand(city.cityId)}>
                    {expandedCard === city.cityId ? "Ocultar" : "Ver más"}
                  </button>
                  <button className="edit-button" onClick={() => {
                    setCityToEdit(city);
                    setEditModalOpen(true);
                  }}>Editar</button>
                  <button className="delete-button" onClick={() => {
                    setCityToDelete(city.cityId); 
                    setDeleteModalOpen(true);
                  }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateCityModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditCityModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        cityToEdit={cityToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar ciudad?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar esta ciudad?"
      />
    </div>
  );
};

export default Cities;
