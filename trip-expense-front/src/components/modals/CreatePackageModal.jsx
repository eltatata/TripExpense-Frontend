import React, { useState } from 'react';
import './CreatePackageModal.css';
import api from '../../services/api';

const CreatePackageModal = ({ isOpen, onClose, onCreate }) => {
  const [newPackage, setNewPackage] = useState({
    name: '',
    destination: '',
    pricePerPerson: '',
    durationDays: '',
    type: '',
    description: '',
    image: '',
    hotel: '',
    flight: '',
    activities: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPackage((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!newPackage.name) {
      valid = false;
      errors.name = 'El nombre es obligatorio';
    }
    if (!newPackage.destination) {
      valid = false;
      errors.destination = 'El destino es obligatorio';
    }
    if (!newPackage.pricePerPerson) {
      valid = false;
      errors.pricePerPerson = 'El precio es obligatorio';
    }
    if (!newPackage.durationDays) {
      valid = false;
      errors.durationDays = 'La duración es obligatoria';
    }
    if (!newPackage.type) {
      valid = false;
      errors.type = 'El tipo es obligatorio';
    }
    if (!newPackage.hotel) {
      valid = false;
      errors.hotel = 'El hotel es obligatorio';
    }
    if (!newPackage.flight) {
      valid = false;
      errors.flight = 'El vuelo es obligatorio';
    }
    if (!newPackage.activities) {
      valid = false;
      errors.activities = 'Las actividades son obligatorias';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        ...newPackage,
        activities: newPackage.activities
          .split(',')
          .map((a) => a.trim())
          .filter((a) => a !== ''),
      };

      try {
        const response = await api.post("/packages", payload);
        onCreate(response.data);
        onClose();
        setNewPackage({
          name: '',
          destination: '',
          pricePerPerson: '',
          durationDays: '',
          type: '',
          description: '',
          image: '',
          hotel: '',
          flight: '',
          activities: ''
        });
      } catch (error) {
        console.error("Error al crear el paquete:", error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-package-modal-overlay">
        <div className="create-package-modal-container">
          <h2>Crear Paquete</h2>
          <form onSubmit={handleSubmit} className="create-package-modal-form">
            <label>
              Nombre:
              <input type="text" name="name" value={newPackage.name} onChange={handleChange} />
              {errors.name && <span className="create-package-error">{errors.name}</span>}
            </label>

            <label>
              Destino:
              <input type="text" name="destination" value={newPackage.destination} onChange={handleChange} />
              {errors.destination && <span className="create-package-error">{errors.destination}</span>}
            </label>

            <label>
              Precio por persona:
              <input type="number" name="pricePerPerson" value={newPackage.pricePerPerson} onChange={handleChange} />
              {errors.pricePerPerson && <span className="create-package-error">{errors.pricePerPerson}</span>}
            </label>

            <label>
              Duración (días):
              <input type="number" name="durationDays" value={newPackage.durationDays} onChange={handleChange} />
              {errors.durationDays && <span className="create-package-error">{errors.durationDays}</span>}
            </label>

            <label>
              Tipo:
              <input type="text" name="type" value={newPackage.type} onChange={handleChange} />
              {errors.type && <span className="create-package-error">{errors.type}</span>}
            </label>

            <label>
              Descripción:
              <textarea name="description" value={newPackage.description} onChange={handleChange} />
            </label>

            <label>
              Hotel:
              <input type="text" name="hotel" value={newPackage.hotel} onChange={handleChange} />
              {errors.hotel && <span className="create-package-error">{errors.hotel}</span>}
            </label>

            <label>
              Vuelo:
              <input type="text" name="flight" value={newPackage.flight} onChange={handleChange} />
              {errors.flight && <span className="create-package-error">{errors.flight}</span>}
            </label>

            <label>
              Actividades (separadas por coma):
              <input type="text" name="activities" value={newPackage.activities} onChange={handleChange} />
              {errors.activities && <span className="create-package-error">{errors.activities}</span>}
            </label>

            <label>
              Imagen:
              <input type="file" name="image" onChange={handleImageChange} />
            </label>

            <div className="create-package-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreatePackageModal;
