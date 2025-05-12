import React, { useState } from 'react';
import './CreateHotelModal.css';
import api from '../../services/api';

const amenitiesList = ['Wi-Fi', 'Piscina', 'Gimnasio', 'Desayuno', 'Aire acondicionado', 'Spa', 'Estacionamiento', 'Restaurante', 'Bar'];

const CreateHotelModal = ({ isOpen, onClose, onCreate }) => {
  const [newHotel, setNewHotel] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setNewHotel((prev) => {
      const updatedAmenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value);
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewHotel((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!newHotel.name) errs.name = 'Nombre obligatorio';
    if (!newHotel.city) errs.city = 'Ciudad obligatoria';
    if (!newHotel.address) errs.address = 'Dirección obligatoria';
    if (!newHotel.stars) errs.stars = 'Estrellas obligatorias';
    if (!newHotel.checkInTime) errs.checkInTime = 'Hora de check-in obligatoria';
    if (!newHotel.checkOutTime) errs.checkOutTime = 'Hora de check-out obligatoria';
    if (!newHotel.email) errs.email = 'Email obligatorio';
    if (!newHotel.phone) errs.phone = 'Teléfono obligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post('/hotels', newHotel);
      onCreate(response.data);
      setNewHotel({ name: '', city: '', address: '', image: '', stars: '', description: '', amenities: [], checkInTime: '', checkOutTime: '', email: '', phone: '' });
      onClose();
    } catch (err) {
      console.error('Error al crear hotel:', err);
    }
  };

  return (
    isOpen && (
      <div className="create-hotel-modal-overlay">
        <div className="create-hotel-modal-container">
          <h2>Crear Hotel</h2>
          <form onSubmit={handleSubmit} className="create-hotel-modal-form">
            <div className="form-group">
              <label>Nombre:</label>
              <input name="name" value={newHotel.name} onChange={handleChange} />
              {errors.name && <span className="create-hotel-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Ciudad:</label>
              <input name="city" value={newHotel.city} onChange={handleChange} />
              {errors.city && <span className="create-hotel-error">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>Dirección:</label>
              <input name="address" value={newHotel.address} onChange={handleChange} />
              {errors.address && <span className="create-hotel-error">{errors.address}</span>}
            </div>

            <div className="form-group image-file">
              <label>Imagen:</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <div className="form-group">
              <label>Estrellas:</label>
              <select name="stars" value={newHotel.stars} onChange={handleChange}>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s} ⭐</option>)}
              </select>
              {errors.stars && <span className="create-hotel-error">{errors.stars}</span>}
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea name="description" value={newHotel.description} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Amenities:</legend>
                {amenitiesList.map((a) => (
                  <div key={a} className="amenities-option">
                    <input
                      type="checkbox"
                      value={a}
                      checked={newHotel.amenities.includes(a)}
                      onChange={handleAmenitiesChange}
                    />
                    <span>{a}</span>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="form-group">
              <label>Check-In:</label>
              <input type="time" name="checkInTime" value={newHotel.checkInTime} onChange={handleChange} />
              {errors.checkInTime && <span className="create-hotel-error">{errors.checkInTime}</span>}
            </div>

            <div className="form-group">
              <label>Check-Out:</label>
              <input type="time" name="checkOutTime" value={newHotel.checkOutTime} onChange={handleChange} />
              {errors.checkOutTime && <span className="create-hotel-error">{errors.checkOutTime}</span>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input name="email" type="email" value={newHotel.email} onChange={handleChange} />
              {errors.email && <span className="create-hotel-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Teléfono:</label>
              <input name="phone" value={newHotel.phone} onChange={handleChange} />
              {errors.phone && <span className="create-hotel-error">{errors.phone}</span>}
            </div>

            <div className="modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateHotelModal;
