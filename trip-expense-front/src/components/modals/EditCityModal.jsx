import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './EditCityModal.css';
import api from '../../services/api';

const EditCityModal = ({ isOpen, onClose, onUpdate, cityToEdit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [climateOptions] = useState([
    'Tropical', 'Seco', 'Templado', 'Frío', 'Polar'
  ]);

  useEffect(() => {
    if (cityToEdit) {
      reset(cityToEdit);
    }
  }, [cityToEdit, reset]);

  const onSubmit = async (updatedCity) => {
    try {
      const response = await api.put(`/cities/${cityToEdit.cityId}`, updatedCity);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la ciudad:', error);
    }
  };

  return (
    isOpen && (
      <div className="edit-city-modal-overlay">
        <div className="edit-city-modal-container">
          <h2>Editar Ciudad</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="edit-city-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name && <span className="edit-city-error">{errors.name.message}</span>}
            </label>

            <label>
              País:
              <input
                type="text"
                {...register('country', { required: 'El país es obligatorio' })}
              />
              {errors.country && <span className="edit-city-error">{errors.country.message}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                {...register('description', { required: 'La descripción es obligatoria' })}
              />
              {errors.description && <span className="edit-city-error">{errors.description.message}</span>}
            </label>

            <label>
              Idioma:
              <input
                type="text"
                {...register('language', { required: 'El idioma es obligatorio' })}
              />
              {errors.language && <span className="edit-city-error">{errors.language.message}</span>}
            </label>

            <label>
              Moneda:
              <input
                type="text"
                {...register('currency', { required: 'La moneda es obligatoria' })}
              />
              {errors.currency && <span className="edit-city-error">{errors.currency.message}</span>}
            </label>

            <label>
              Clima:
              <select {...register('climate', { required: 'El clima es obligatorio' })}>
                <option value="">Selecciona un clima</option>
                {climateOptions.map((climate) => (
                  <option key={climate} value={climate}>
                    {climate}
                  </option>
                ))}
              </select>
              {errors.climate && <span className="edit-city-error">{errors.climate.message}</span>}
            </label>

            <label>
              Mejor época para visitar:
              <input
                type="text"
                {...register('bestTimeToVisit', { required: 'Este campo es obligatorio' })}
              />
              {errors.bestTimeToVisit && <span className="edit-city-error">{errors.bestTimeToVisit.message}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                {...register('image')}
              />
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
