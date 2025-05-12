import React, { useState } from "react";
import "./Hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Hotel El Bosque",
      city: "Medellín",
      address: "Cra 45 #34-21",
      image: "../assets/Newyork.jpg",
      stars: 4,
      description: "Un hermoso hotel rodeado de naturaleza.",
      checkIn: "14:00",
      checkOut: "11:00",
      email: "bosque@hotel.com",
      phone: "3011234567",
    },
    {
      id: 2,
      name: "Hotel Mar Azul",
      city: "Cartagena",
      address: "Av. Playa #10-20",
      image: "../assets/Estambul.jpg",
      stars: 5,
      description: "Vista al mar y servicio todo incluido.",
      checkIn: "15:00",
      checkOut: "12:00",
      email: "marazul@hotel.com",
      phone: "3027654321",
    },
  ]);

  const handleCreate = () => {
    const newHotel = {
      id: hotels.length + 1,
      name: "Nuevo Hotel",
      city: "Ciudad X",
      address: "Dirección Y",
      image: "../assets/Estambul.jpg",
      stars: 3,
      description: "Descripción del nuevo hotel.",
      checkIn: "13:00",
      checkOut: "11:00",
      email: "nuevo@hotel.com",
      phone: "3000000000",
    };
    setHotels([...hotels, newHotel]);
  };

  const handleEdit = (id) => {
    alert(`Editar hotel con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este hotel?")) {
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    }
  };

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="hotels-container">
      <div className="hotels-header">
        <h2 className="hotels-title">Gestión de Hoteles</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear hotel
        </button>
      </div>

      <div className="cards-wrapper">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
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
                <button className="edit-button" onClick={() => handleEdit(hotel.id)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(hotel.id)}>
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

export default Hotels;
