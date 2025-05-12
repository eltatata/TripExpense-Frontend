import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Hotels.css";
import CreateHotelModal from "../../components/modals/CreateHotelModal";
import EditHotelModal from "../../components/modals/EditHotelModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [hotelToEdit, setHotelToEdit] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/hotels");
        const hotelsArray = Array.isArray(res.data) ? res.data : res.data.data;
        setHotels(hotelsArray || []);
      } catch (error) {
        console.error("Error al obtener hoteles:", error);
        setHotels([]);
      }
    };

    fetchHotels();
  }, []);

  const handleCreate = (newHotel) => {
    setHotels([...hotels, newHotel]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedHotel) => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === updatedHotel.id ? updatedHotel : hotel
    );
    setHotels(updatedHotels);
    setEditModalOpen(false);
    setHotelToEdit(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/hotels/${hotelToDelete}`);
      setHotels(hotels.filter((hotel) => hotel.id !== hotelToDelete));
      setDeleteModalOpen(false);
      setHotelToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el hotel:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="hotels-container">
      <div className="hotels-header">
        <h2 className="hotels-title">Gestión de Hoteles</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear hotel
        </button>
      </div>

      <div className="cards-wrapper">
        {hotels.length === 0 ? (
          <p className="no-users-message">No hay hoteles disponibles</p>
        ) : (
          hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <img src={hotel.image || "https://via.placeholder.com/300"} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p><strong>Ciudad:</strong> {hotel.city}</p>
                <p><strong>Estrellas:</strong> {hotel.stars}</p>

                {expandedCard === hotel.id && (
                  <div className="extra-info">
                    <p><strong>Dirección:</strong> {hotel.address}</p>
                    <p><strong>Descripción:</strong> {hotel.description}</p>
                    <p><strong>Check-in:</strong> {hotel.checkIn}</p>
                    <p><strong>Check-out:</strong> {hotel.checkOut}</p>
                    <p><strong>Email:</strong> {hotel.email}</p>
                    <p><strong>Teléfono:</strong> {hotel.phone}</p>
                  </div>
                )}

                <div className="action-buttons">
                  <button className="toggle-button" onClick={() => toggleExpand(hotel.id)}>
                    {expandedCard === hotel.id ? "Ocultar" : "Ver más"}
                  </button>
                  <button className="edit-button" onClick={() => {
                    setHotelToEdit(hotel);
                    setEditModalOpen(true);
                  }}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => {
                    setHotelToDelete(hotel.id);
                    setDeleteModalOpen(true);
                  }}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateHotelModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditHotelModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        hotelToEdit={hotelToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar hotel?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este hotel?"
      />
    </div>
  );
};

export default Hotels;
