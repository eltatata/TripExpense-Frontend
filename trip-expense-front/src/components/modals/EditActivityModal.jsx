import React, { useState, useEffect } from 'react';
import './EditActivityModal.css';
import api from '../../services/api';

const EditActivityModal = ({ isOpen, onClose, onUpdate, activityToEdit }) => {
  const [updatedActivity, setUpdatedActivity] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (activityToEdit) {
      setUpdatedActivity({
        name: activityToEdit.name || '',
        description: activityToEdit.description || '',
        image: activityToEdit.image || '',
      });
    }
  }, [activityToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedActivity((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!updatedActivity.name.trim()) {
      formIsValid = false;
      newErrors.name = 'El nombre es obligatorio';
    }
    if (!updatedActivity.description.trim()) {
      formIsValid = false;
      newErrors.description = 'La descripción es obligatoria';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.put(`/activities/${activityToEdit.id}`, updatedActivity);
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error al actualizar la actividad:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className="edit-activity-modal-overlay">
        <div className="edit-activity-modal-container">
          <h2>Editar Actividad</h2>
          <form onSubmit={handleSubmit} className="edit-activity-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={updatedActivity.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="edit-activity-error">{errors.name}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                name="description"
                value={updatedActivity.description}
                onChange={handleChange}
                required
              />
              {errors.description && <span className="edit-activity-error">{errors.description}</span>}
            </label>

            <label>
              Imagen:
              <input type="file" name="image" onChange={handleImageChange} />
            </label>

            <div className="edit-activity-modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditActivityModal;
