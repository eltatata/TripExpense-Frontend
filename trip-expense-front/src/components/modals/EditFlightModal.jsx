import React, { useState, useEffect } from 'react';
import './CreateUserModal.css';
import api from '../../services/api';

const EditFlightModal = ({ isOpen, onClose, onUpdate, flightToEdit }) => {
  const [updatedFlight, setUpdatedFlight] = useState({
    airline: '',
    departureCity: '',
    arrivalCity: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (flightToEdit) {
      setUpdatedFlight({
        airline: flightToEdit.airline || '',
        departureCity: flightToEdit.departureCity || '',
        arrivalCity: flightToEdit.arrivalCity || '',
        departureTime: flightToEdit.departureTime || '',
        arrivalTime: flightToEdit.arrivalTime || '',
        price: flightToEdit.price || '',
      });
    }
  }, [flightToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFlight((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!updatedFlight.airline) {
      newErrors.airline = 'La aerolínea es obligatoria';
      formIsValid = false;
    }
    if (!updatedFlight.departureCity) {
      newErrors.departureCity = 'Ciudad de salida requerida';
      formIsValid = false;
    }
    if (!updatedFlight.arrivalCity) {
      newErrors.arrivalCity = 'Ciudad de llegada requerida';
      formIsValid = false;
    }
    if (!updatedFlight.departureTime) {
      newErrors.departureTime = 'Hora de salida requerida';
      formIsValid = false;
    }
    if (!updatedFlight.arrivalTime) {
      newErrors.arrivalTime = 'Hora de llegada requerida';
      formIsValid = false;
    }
    if (!updatedFlight.price || isNaN(updatedFlight.price)) {
      newErrors.price = 'Precio válido requerido';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.put(`/flights/${flightToEdit.id}`, updatedFlight);
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error al actualizar vuelo:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-user-modal-overlay">
        <div className="create-user-modal-container">
          <h2>Editar Vuelo</h2>
          <form onSubmit={handleSubmit} className="create-user-modal-form">
            <label>
              Aerolínea:
              <input
                type="text"
                name="airline"
                value={updatedFlight.airline}
                onChange={handleChange}
              />
              {errors.airline && <span className="create-user-error">{errors.airline}</span>}
            </label>

            <label>
              Ciudad de Salida:
              <input
                type="text"
                name="departureCity"
                value={updatedFlight.departureCity}
                onChange={handleChange}
              />
              {errors.departureCity && <span className="create-user-error">{errors.departureCity}</span>}
            </label>

            <label>
              Ciudad de Llegada:
              <input
                type="text"
                name="arrivalCity"
                value={updatedFlight.arrivalCity}
                onChange={handleChange}
              />
              {errors.arrivalCity && <span className="create-user-error">{errors.arrivalCity}</span>}
            </label>

            <label>
              Hora de Salida:
              <input
                type="datetime-local"
                name="departureTime"
                value={updatedFlight.departureTime}
                onChange={handleChange}
              />
              {errors.departureTime && <span className="create-user-error">{errors.departureTime}</span>}
            </label>

            <label>
              Hora de Llegada:
              <input
                type="datetime-local"
                name="arrivalTime"
                value={updatedFlight.arrivalTime}
                onChange={handleChange}
              />
              {errors.arrivalTime && <span className="create-user-error">{errors.arrivalTime}</span>}
            </label>

            <label>
              Precio:
              <input
                type="number"
                name="price"
                value={updatedFlight.price}
                onChange={handleChange}
              />
              {errors.price && <span className="create-user-error">{errors.price}</span>}
            </label>

            <div className="create-user-modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditFlightModal;
