import React, { useEffect, useState } from 'react';
import './CreateHotelModal.css';
import api from '../../services/api';
import { useForm } from 'react-hook-form';

const amenitiesList = ['Wi-Fi', 'Piscina', 'Gimnasio', 'Desayuno', 'Aire acondicionado', 'Spa', 'Estacionamiento', 'Restaurante', 'Bar'];

const CreateHotelModal = ({ isOpen, onClose, onCreate }) => {
  const [cities, setCities] = useState([]);
  const [imagePreview, setImagePreview] = useState('');

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get('/cities');
        setCities(res.data);
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
      }
    };
    fetchCities();
  }, []);

  const onSubmit = async (data) => {
    try {
      data.stars = parseInt(data.stars);
      const response = await api.post('/hotels', data);
      onCreate(response.data);
      reset();
      setImagePreview('');
      onClose();
    } catch (err) {
      console.error('Error al crear hotel:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('imageUrl', url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-hotel-modal-overlay">
      <div className="create-hotel-modal-container">
        <h2>Crear Hotel</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="create-hotel-modal-form">

          <div className="form-group">
            <label>Nombre:</label>
            <input {...register('name', { required: 'El nombre es obligatorio', maxLength: 100 })} />
            {errors.name && <span className="create-hotel-error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label>Ciudad:</label>
            <select {...register('city', { required: 'La ciudad es obligatoria' })} defaultValue="">
              <option value="" disabled>Seleccione una ciudad</option>
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>{city.name}</option>
              ))}
            </select>
            {errors.city && <span className="create-hotel-error">{errors.city.message}</span>}
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input {...register('address', { required: 'La dirección es obligatoria', maxLength: 255 })} />
            {errors.address && <span className="create-hotel-error">{errors.address.message}</span>}
          </div>

          <div className="form-group image-file">
            <label>Imagen:</label>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Vista previa" style={{ width: '100px' }} />}
          </div>

          <input type="hidden" {...register('imageUrl', {
            maxLength: 255,
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Debe ser una URL válida'
            }
          })} />

          <div className="form-group">
            <label>Estrellas:</label>
            <select
              {...register('stars', {
                required: 'Las estrellas son obligatorias',
                validate: value => [1, 2, 3, 4, 5].includes(Number(value)) || 'Debe estar entre 1 y 5'
              })}
              defaultValue=""
            >
              <option value="" disabled>Seleccione estrellas</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} estrella{n > 1 && 's'}</option>
              ))}
            </select>
            {errors.stars && <span className="create-hotel-error">{errors.stars.message}</span>}
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea {...register('description')} />
          </div>

          <div className="form-group">
            <fieldset>
              <legend>Amenities:</legend>
              {amenitiesList.map(a => (
                <div key={a} className="amenities-option">
                  <input type="checkbox" value={a} {...register('amenities')} />
                  <span>{a}</span>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="form-group">
            <label>Check-In:</label>
            <input type="time" {...register('checkInTime', { required: 'Hora de check-in obligatoria' })} />
            {errors.checkInTime && <span className="create-hotel-error">{errors.checkInTime.message}</span>}
          </div>

          <div className="form-group">
            <label>Check-Out:</label>
            <input type="time" {...register('checkOutTime', { required: 'Hora de check-out obligatoria' })} />
            {errors.checkOutTime && <span className="create-hotel-error">{errors.checkOutTime.message}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email obligatorio',
                maxLength: 100,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Formato de email inválido'
                }
              })}
            />
            {errors.email && <span className="create-hotel-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input {...register('phone', { maxLength: 20 })} />
            {errors.phone && <span className="create-hotel-error">{errors.phone.message}</span>}
          </div>

          <div className="modal-actions">
            <button type="submit">Crear</button>
            <button type="button" onClick={() => { reset(); setImagePreview(''); onClose(); }}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateHotelModal;
