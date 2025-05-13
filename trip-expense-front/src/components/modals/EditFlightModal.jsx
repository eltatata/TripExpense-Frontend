import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CreateFlightModal.css';
import api from '../../services/api';

const EditFlightModal = ({ isOpen, onClose, onUpdate, flightToEdit }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [cities, setCities] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get('/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
      }
    };

    if (isOpen) fetchCities();
  }, [isOpen]);

  useEffect(() => {
    if (flightToEdit) {
      setValue('airline', flightToEdit.airline);
      setValue('flightNumber', flightToEdit.flightNumber);
      setValue('departureCityId', flightToEdit.departureCity.cityId);
      setValue('arrivalCityId', flightToEdit.arrivalCity.cityId);
      setValue('departureDateTime', flightToEdit.departureDateTime);
      setValue('arrivalDateTime', flightToEdit.arrivalDateTime);
      setValue('durationMinutes', flightToEdit.durationMinutes);
      setLogoUrl(flightToEdit.airlineLogoUrl || '');
    }
  }, [flightToEdit, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        airline: data.airline,
        airlineLogoUrl: logoUrl,
        flightNumber: data.flightNumber,
        departureCity: { cityId: parseInt(data.departureCityId) },
        arrivalCity: { cityId: parseInt(data.arrivalCityId) },
        departureDateTime: data.departureDateTime,
        arrivalDateTime: data.arrivalDateTime,
        durationMinutes: parseInt(data.durationMinutes),
      };

      const res = await api.put(`/flights/${flightToEdit.flightId}`, payload);
      onUpdate(res.data);
      reset();
      setLogoUrl('');
      onClose();
    } catch (error) {
      console.error('Error al actualizar vuelo:', error);
    }
  };

  return (
    isOpen && (
      <div className="create-flight-modal-overlay">
        <div className="create-flight-modal-container">
          <h2>Editar Vuelo</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="create-flight-modal-form">
            <label>
              Aerolínea:
              <input
                {...register('airline', {
                  required: 'La aerolínea es obligatoria',
                  maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                })}
              />
              {errors.airline && <span className="create-flight-error">{errors.airline.message}</span>}
            </label>

            <label>
              Número de vuelo:
              <input
                {...register('flightNumber', {
                  required: 'El número de vuelo es obligatorio',
                  maxLength: { value: 20, message: 'Máximo 20 caracteres' }
                })}
              />
              {errors.flightNumber && <span className="create-flight-error">{errors.flightNumber.message}</span>}
            </label>

            <label>
              Ciudad de origen:
              <select
                {...register('departureCityId', { required: 'Ciudad de origen obligatoria' })}
              >
                <option value="">Seleccione una ciudad de origen</option>
                {cities.map(city => (
                  <option key={city.cityId} value={city.cityId}>{city.name}</option>
                ))}
              </select>
              {errors.departureCityId && <span className="create-flight-error">{errors.departureCityId.message}</span>}
            </label>

            <label>
              Ciudad de destino:
              <select
                {...register('arrivalCityId', { required: 'Ciudad de destino obligatoria' })}
              >
                <option value="">Seleccione una ciudad de destino</option>
                {cities.map(city => (
                  <option key={city.cityId} value={city.cityId}>{city.name}</option>
                ))}
              </select>
              {errors.arrivalCityId && <span className="create-flight-error">{errors.arrivalCityId.message}</span>}
            </label>

            <label>
              Salida:
              <input
                type="datetime-local"
                {...register('departureDateTime', { required: 'La hora de salida es obligatoria' })}
              />
              {errors.departureDateTime && <span className="create-flight-error">{errors.departureDateTime.message}</span>}
            </label>

            <label>
              Llegada:
              <input
                type="datetime-local"
                {...register('arrivalDateTime', { required: 'La hora de llegada es obligatoria' })}
              />
              {errors.arrivalDateTime && <span className="create-flight-error">{errors.arrivalDateTime.message}</span>}
            </label>

            <label>
              Duración (min):
              <input
                type="number"
                {...register('durationMinutes', {
                  required: 'La duración es obligatoria',
                  valueAsNumber: true,
                  min: { value: 1, message: 'La duración debe ser mayor a 0' }
                })}
              />
              {errors.durationMinutes && <span className="create-flight-error">{errors.durationMinutes.message}</span>}
            </label>

            <label>
              Logo:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <div className="create-flight-modal-actions">
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
