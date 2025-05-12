import React, { useState } from 'react';
import './CreateCityModal.css';
import api from '../../services/api';

const CreateCityModal = ({ isOpen, onClose, onCreate }) => {
  const [newCity, setNewCity] = useState({
    name: '',
    country: '',
    description: '',
    image: '',
    language: '',
    currency: '',
    climate: '',
    bestTimeToVisit: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCity((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!newCity.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }

    if (!newCity.country.trim()) {
      newErrors.country = 'El país es obligatorio';
      valid = false;
    }

    if (!newCity.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
      valid = false;
    }

    if (!newCity.language.trim()) {
      newErrors.language = 'El idioma es obligatorio';
      valid = false;
    }

    if (!newCity.currency.trim()) {
      newErrors.currency = 'La moneda es obligatoria';
      valid = false;
    }

    if (!newCity.climate.trim()) {
      newErrors.climate = 'El clima es obligatorio';
      valid = false;
    }

    if (!newCity.bestTimeToVisit.trim()) {
      newErrors.bestTimeToVisit = 'Este campo es obligatorio';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.post('/cities', newCity);
        onCreate(response.data);
        setNewCity({
        name: '',
        country: '',
        description: '',
        image: '',
        language: '',
        currency: '',
        climate: '',
        bestTimeToVisit: '',
      });
        onClose();
      } catch (error) {
        console.error('Error al crear la ciudad:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-city-modal-overlay">
        <div className="create-city-modal-container">
          <h2>Crear Ciudad</h2>
          <form onSubmit={handleSubmit} className="create-city-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={newCity.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="create-city-error">{errors.name}</span>}
            </label>

            <label>
              País:
              <input
                type="text"
                name="country"
                value={newCity.country}
                onChange={handleChange}
                required
              />
              {errors.country && <span className="create-city-error">{errors.country}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                name="description"
                value={newCity.description}
                onChange={handleChange}
                required
              />
              {errors.description && <span className="create-city-error">{errors.description}</span>}
            </label>

            <label>
              Idioma:
              <input
                type="text"
                name="language"
                value={newCity.language}
                onChange={handleChange}
                required
              />
              {errors.language && <span className="create-city-error">{errors.language}</span>}
            </label>

            <label>
              Moneda:
              <input
                type="text"
                name="currency"
                value={newCity.currency}
                onChange={handleChange}
                required
              />
              {errors.currency && <span className="create-city-error">{errors.currency}</span>}
            </label>

            <label>
              Clima:
              <input
                type="text"
                name="climate"
                value={newCity.climate}
                onChange={handleChange}
                required
              />
              {errors.climate && <span className="create-city-error">{errors.climate}</span>}
            </label>

            <label>
              Mejor época para visitar:
              <input
                type="text"
                name="bestTimeToVisit"
                value={newCity.bestTimeToVisit}
                onChange={handleChange}
                required
              />
              {errors.bestTimeToVisit && <span className="create-city-error">{errors.bestTimeToVisit}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </label>

            <div className="create-city-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateCityModal;
