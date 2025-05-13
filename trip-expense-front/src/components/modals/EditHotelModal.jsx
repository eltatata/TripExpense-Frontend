import React, { useState, useEffect } from 'react';
import './EditHotelModal.css';
import api from '../../services/api';

const amenitiesList = ['Wi-Fi', 'Piscina', 'Gimnasio', 'Desayuno', 'Aire acondicionado', 'Spa', 'Estacionamiento', 'Restaurante', 'Bar'];

const EditHotelModal = ({ isOpen, onClose, onUpdate, hotelToEdit }) => {
  const [hotel, setHotel] = useState({
    name: '',
    city: '',
    address: '',
    image: '',
    stars: '',
    description: '',
    amenities: [],
    checkInTime: '',
    checkOutTime: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hotelToEdit) setHotel(hotelToEdit);
  }, [hotelToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setHotel((prev) => {
      const updatedAmenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value);
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotel((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!hotel.name) errs.name = 'Nombre obligatorio';
    if (!hotel.city) errs.city = 'Ciudad obligatoria';
    if (!hotel.address) errs.address = 'Dirección obligatoria';
    if (!hotel.stars) errs.stars = 'Estrellas obligatorias';
    if (!hotel.checkInTime) errs.checkInTime = 'Hora de check-in obligatoria';
    if (!hotel.checkOutTime) errs.checkOutTime = 'Hora de check-out obligatoria';
    if (!hotel.email) errs.email = 'Email obligatorio';
    if (!hotel.phone) errs.phone = 'Teléfono obligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.put(`/hotels/${hotel.hotelId}`, hotel);
      onUpdate(response.data);
      onClose();
    } catch (err) {
      console.error('Error al actualizar hotel:', err);
    }
  };

  return (
    isOpen && (
      <div className="edit-hotel-modal-overlay">
        <div className="edit-hotel-modal-container">
          <h2>Editar Hotel</h2>
          <form onSubmit={handleSubmit} className="edit-hotel-modal-form">
            <div className="form-group">
              <label>Nombre:</label>
              <input name="name" value={hotel.name} onChange={handleChange} />
              {errors.name && <span className="edit-hotel-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Ciudad:</label>
              <input name="city" value={hotel.city} onChange={handleChange} />
              {errors.city && <span className="edit-hotel-error">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>Dirección:</label>
              <input name="address" value={hotel.address} onChange={handleChange} />
              {errors.address && <span className="edit-hotel-error">{errors.address}</span>}
            </div>

            <div className="form-group image-file">
              <label>Imagen:</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <div className="form-group">
              <label>Estrellas:</label>
              <select name="stars" value={hotel.stars} onChange={handleChange}>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s} ⭐</option>)}
              </select>
              {errors.stars && <span className="edit-hotel-error">{errors.stars}</span>}
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea name="description" value={hotel.description} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Amenities:</legend>
                {amenitiesList.map((a) => (
                  <div key={a} className="amenities-option">
                    <input
                      type="checkbox"
                      value={a}
                      checked={hotel.amenities?.includes(a)}
                      onChange={handleAmenitiesChange}
                    />
                    <span>{a}</span>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="form-group">
              <label>Check-In:</label>
              <input type="time" name="checkInTime" value={hotel.checkInTime} onChange={handleChange} />
              {errors.checkInTime && <span className="edit-hotel-error">{errors.checkInTime}</span>}
            </div>

            <div className="form-group">
              <label>Check-Out:</label>
              <input type="time" name="checkOutTime" value={hotel.checkOutTime} onChange={handleChange} />
              {errors.checkOutTime && <span className="edit-hotel-error">{errors.checkOutTime}</span>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input name="email" type="email" value={hotel.email} onChange={handleChange} />
              {errors.email && <span className="edit-hotel-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Teléfono:</label>
              <input name="phone" value={hotel.phone} onChange={handleChange} />
              {errors.phone && <span className="edit-hotel-error">{errors.phone}</span>}
            </div>

            <div className="modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditHotelModal;
