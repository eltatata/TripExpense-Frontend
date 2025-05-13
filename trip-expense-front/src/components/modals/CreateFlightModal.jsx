import React, { useState } from 'react';
import './CreateFlightModal.css';
import api from '../../services/api';

const CreateFlightModal = ({ isOpen, onClose, onCreate }) => {
  const [newFlight, setNewFlight] = useState({
    airline: '',
    flightNumber: '',
    origin: '',
    destination: '',
    departure: '',
    arrival: '',
    duration: '',
    logo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFlight((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const errs = {};
    let valid = true;

    ['airline', 'flightNumber', 'origin', 'destination', 'departure', 'arrival', 'duration'].forEach((field) => {
      if (!newFlight[field]) {
        errs[field] = 'Campo obligatorio';
        valid = false;
      }
    });

    setErrors(errs);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await api.post('/flights', newFlight);
        onCreate(res.data);
        setNewFlight({
          airline: '',
          flightNumber: '',
          origin: '',
          destination: '',
          departure: '',
          arrival: '',
          duration: '',
          logo: '',
        });
        onClose();
      } catch (error) {
        console.error('Error al crear vuelo:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-flight-modal-overlay">
        <div className="create-flight-modal-container">
          <h2>Crear Vuelo</h2>
          <form onSubmit={handleSubmit} className="create-flight-modal-form">
            <label>
              Aerolínea:
              <input name="airline" value={newFlight.airline} onChange={handleChange} required />
              {errors.airline && <span className="create-flight-error">{errors.airline}</span>}
            </label>

            <label>
              Número de vuelo:
              <input name="flightNumber" value={newFlight.flightNumber} onChange={handleChange} required />
              {errors.flightNumber && <span className="create-flight-error">{errors.flightNumber}</span>}
            </label>

            <label>
              Origen:
              <input name="origin" value={newFlight.origin} onChange={handleChange} required />
              {errors.origin && <span className="create-flight-error">{errors.origin}</span>}
            </label>

            <label>
              Destino:
              <input name="destination" value={newFlight.destination} onChange={handleChange} required />
              {errors.destination && <span className="create-flight-error">{errors.destination}</span>}
            </label>

            <label>
              Salida:
              <input name="departure" type="datetime-local" value={newFlight.departure} onChange={handleChange} required />
              {errors.departure && <span className="create-flight-error">{errors.departure}</span>}
            </label>

            <label>
              Llegada:
              <input name="arrival" type="datetime-local" value={newFlight.arrival} onChange={handleChange} required />
              {errors.arrival && <span className="create-flight-error">{errors.arrival}</span>}
            </label>

            <label>
              Duración (min):
              <input name="duration" type="number" value={newFlight.duration} onChange={handleChange} required />
              {errors.duration && <span className="create-flight-error">{errors.duration}</span>}
            </label>

            <label>
              Logo:
              <input type="file" onChange={handleImageChange} />
            </label>

            <div className="create-flight-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateFlightModal;
