import React, { useState } from 'react';
import './CreateActivityModal.css';
import api from '../../services/api';

const CreateActivityModal = ({ isOpen, onClose, onCreate }) => {
  const [newActivity, setNewActivity] = useState({
    name: '',
    city: '',
    description: '',
    image: '',
    category: '',
    duration: '',
    location: '',
    difficulty: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    city: '',
    description: '',
    image: '',
    category: '',
    duration: '',
    location: '',
    difficulty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewActivity((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!newActivity.name) {
      formIsValid = false;
      errors.name = 'El nombre de la actividad es obligatorio';
    }
    if (!newActivity.city) {
      formIsValid = false;
      errors.city = 'La ciudad es obligatoria';
    }
    if (!newActivity.description) {
      formIsValid = false;
      errors.description = 'La descripción es obligatoria';
    }
    if (!newActivity.image) {
      formIsValid = false;
      errors.image = 'La imagen es obligatoria';
    }
    if (!newActivity.category) {
      formIsValid = false;
      errors.category = 'La categoría es obligatoria';
    }
    if (!newActivity.duration) {
      formIsValid = false;
      errors.duration = 'La duración es obligatoria';
    }
    if (!newActivity.location) {
      formIsValid = false;
      errors.location = 'La ubicación es obligatoria';
    }
    if (!newActivity.difficulty) {
      formIsValid = false;
      errors.difficulty = 'La dificultad es obligatoria';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.post('/activities', newActivity);
        onCreate(response.data); 
        setNewActivity({
          name: '',
          city: '',
          description: '',
          image: '',
          category: '',
          duration: '',
          location: '',
          difficulty: '',
        });
        onClose(); 
      } catch (error) {
        console.error('Error al crear la actividad:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-activity-modal-overlay">
        <div className="create-activity-modal-container">
          <h2>Crear Actividad</h2>
          <form onSubmit={handleSubmit} className="create-activity-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="create-activity-error">{errors.name}</span>}
            </label>

            <label>
              Ciudad:
              <input
                type="text"
                name="city"
                value={newActivity.city}
                onChange={handleChange}
                required
              />
              {errors.city && <span className="create-activity-error">{errors.city}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                name="description"
                value={newActivity.description}
                onChange={handleChange}
                required
              />
              {errors.description && <span className="create-activity-error">{errors.description}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {errors.image && <span className="create-activity-error">{errors.image}</span>}
            </label>

            <label>
              Categoría:
              <input
                type="text"
                name="category"
                value={newActivity.category}
                onChange={handleChange}
                required
              />
              {errors.category && <span className="create-activity-error">{errors.category}</span>}
            </label>

            <label>
              Duración:
              <input
                type="text"
                name="duration"
                value={newActivity.duration}
                onChange={handleChange}
                required
              />
              {errors.duration && <span className="create-activity-error">{errors.duration}</span>}
            </label>

            <label>
              Ubicación:
              <input
                type="text"
                name="location"
                value={newActivity.location}
                onChange={handleChange}
                required
              />
              {errors.location && <span className="create-activity-error">{errors.location}</span>}
            </label>

            <label>
              Dificultad:
              <input
                type="text"
                name="difficulty"
                value={newActivity.difficulty}
                onChange={handleChange}
                required
              />
              {errors.difficulty && <span className="create-activity-error">{errors.difficulty}</span>}
            </label>

            <div className="create-activity-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateActivityModal;
