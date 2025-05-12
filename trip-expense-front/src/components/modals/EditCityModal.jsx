import React, { useState, useEffect } from 'react';
import './EditCityModal.css';
import api from '../../services/api';

const EditCityModal = ({ isOpen, onClose, onUpdate, cityToEdit }) => {
  const [updatedCity, setUpdatedCity] = useState({
    name: '',
    country: '',
    description: '',
    image: '',
    language: '',
    currency: '',
    climate: '',
    bestTimeToVisit: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    country: '',
    description: '',
    language: '',
    currency: '',
    climate: '',
    bestTimeToVisit: '',
  });

  useEffect(() => {
    if (cityToEdit) {
      setUpdatedCity({ ...cityToEdit });
    }
  }, [cityToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedCity((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!updatedCity.name.trim()) {
      formIsValid = false;
      errors.name = 'El nombre es obligatorio';
    }

    if (!updatedCity.country.trim()) {
      formIsValid = false;
      errors.country = 'El país es obligatorio';
    }

    if (!updatedCity.description.trim()) {
      formIsValid = false;
      errors.description = 'La descripción es obligatoria';
    }

    if (!updatedCity.language.trim()) {
      formIsValid = false;
      errors.language = 'El idioma es obligatorio';
    }

    if (!updatedCity.currency.trim()) {
      formIsValid = false;
      errors.currency = 'La moneda es obligatoria';
    }

    if (!updatedCity.climate.trim()) {
      formIsValid = false;
      errors.climate = 'El clima es obligatorio';
    }

    if (!updatedCity.bestTimeToVisit.trim()) {
      formIsValid = false;
      errors.bestTimeToVisit = 'Este campo es obligatorio';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.put(`/cities/${cityToEdit.cityId}`, updatedCity);
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error al actualizar la ciudad:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="edit-city-modal-overlay">
        <div className="edit-city-modal-container">
          <h2>Editar Ciudad</h2>
          <form onSubmit={handleSubmit} className="edit-city-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={updatedCity.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="edit-city-error">{errors.name}</span>}
            </label>

            <label>
              País:
              <input
                type="text"
                name="country"
                value={updatedCity.country}
                onChange={handleChange}
                required
              />
              {errors.country && <span className="edit-city-error">{errors.country}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                name="description"
                value={updatedCity.description}
                onChange={handleChange}
                required
              />
              {errors.description && <span className="edit-city-error">{errors.description}</span>}
            </label>

            <label>
              Idioma:
              <input
                type="text"
                name="language"
                value={updatedCity.language}
                onChange={handleChange}
                required
              />
              {errors.language && <span className="edit-city-error">{errors.language}</span>}
            </label>

            <label>
              Moneda:
              <input
                type="text"
                name="currency"
                value={updatedCity.currency}
                onChange={handleChange}
                required
              />
              {errors.currency && <span className="edit-city-error">{errors.currency}</span>}
            </label>

            <label>
              Clima:
              <input
                type="text"
                name="climate"
                value={updatedCity.climate}
                onChange={handleChange}
                required
              />
              {errors.climate && <span className="edit-city-error">{errors.climate}</span>}
            </label>

            <label>
              Mejor época para visitar:
              <input
                type="text"
                name="bestTimeToVisit"
                value={updatedCity.bestTimeToVisit}
                onChange={handleChange}
                required
              />
              {errors.bestTimeToVisit && <span className="edit-city-error">{errors.bestTimeToVisit}</span>}
            </label>

            <label>
              Imagen:
              <input type="file" name="image" onChange={handleImageChange} />
            </label>

            <div className="edit-city-modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditCityModal;
