import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateCityModal.css';
import api from '../../services/api';

const CreateCityModal = ({ isOpen, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const climateOptions = [
    'Tropical',
    'Seco',
    'Templado',
    'Frío',
    'Polar',
    'Desértico',
    'Montañoso',
  ];

  const onSubmit = async (data) => {
    try {
      if (data.image && data.image.length > 0) {
        data.image = URL.createObjectURL(data.image[0]);
      } else {
        data.image = '';
      }

      const response = await api.post('/cities', data);
      onCreate(response.data);
      reset(); 
      onClose();
    } catch (error) {
      console.error('Error al crear la ciudad:', error);
    }
  };

  return (
    isOpen && (
      <div className="create-city-modal-overlay">
        <div className="create-city-modal-container">
          <h2>Crear Ciudad</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="create-city-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
              />
              {errors.name && <span className="create-city-error">{errors.name.message}</span>}
            </label>

            <label>
              País:
              <input
                type="text"
                {...register('country', {
                  required: 'El país es obligatorio',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
              />
              {errors.country && <span className="create-city-error">{errors.country.message}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                {...register('description', {
                  required: 'La descripción es obligatoria',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                })}
              />
              {errors.description && <span className="create-city-error">{errors.description.message}</span>}
            </label>

            <label>
              Idioma:
              <input
                type="text"
                {...register('language', {
                  required: 'El idioma es obligatorio',
                })}
              />
              {errors.language && <span className="create-city-error">{errors.language.message}</span>}
            </label>

            <label>
              Moneda:
              <input
                type="text"
                {...register('currency', {
                  required: 'La moneda es obligatoria',
                })}
              />
              {errors.currency && <span className="create-city-error">{errors.currency.message}</span>}
            </label>

            <label>
              Clima:
              <select
                {...register('climate', { required: 'El clima es obligatorio' })}
              >
                <option value="">Seleccione un clima</option>
                {climateOptions.map((climate, index) => (
                  <option key={index} value={climate}>
                    {climate}
                  </option>
                ))}
              </select>
              {errors.climate && <span className="create-city-error">{errors.climate.message}</span>}
            </label>

            <label>
              Mejor época para visitar:
              <input
                type="text"
                {...register('bestTimeToVisit', {
                  required: 'Este campo es obligatorio',
                })}
              />
              {errors.bestTimeToVisit && <span className="create-city-error">{errors.bestTimeToVisit.message}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                accept="image/*"
                {...register('image')}
              />
            </label>

            <div className="create-city-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={() => { reset(); onClose(); }}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateCityModal;
