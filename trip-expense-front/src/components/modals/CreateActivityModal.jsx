import React, { useEffect, useState } from 'react';
import './CreateActivityModal.css';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const categories = [
  'Aventura',
  'Cultura',
  'Gastronomía',
  'Naturaleza',
  'Deportes',
  'Entretenimiento',
  'Relajación',
  'Educativa',
];

const difficulties = ['Fácil', 'Media', 'Difícil'];

const CreateActivityModal = ({ isOpen, onClose, onCreate }) => {
  const [cities, setCities] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get('/cities');
        setCities(res.data);
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
      }
    };

    if (isOpen) {
      fetchCities();
      reset(); 
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        duration: parseInt(data.duration, 10),
        image: imageFile ? URL.createObjectURL(imageFile) : '',
      };

      const res = await api.post('/activities', payload);
      onCreate(res.data);
      onClose();
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  return (
    isOpen && (
      <div className="create-activity-modal-overlay">
        <div className="create-activity-modal-container">
          <h2>Crear Actividad</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="create-activity-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name && <span className="create-activity-error">{errors.name.message}</span>}
            </label>

            <label>
              Ciudad:
              <select
                {...register('cityId', { required: 'La ciudad es obligatoria' })}
                defaultValue=""
              >
                <option value="" disabled>Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
              {errors.cityId && <span className="create-activity-error">{errors.cityId.message}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                {...register('description', { required: 'La descripción es obligatoria' })}
              />
              {errors.description && <span className="create-activity-error">{errors.description.message}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>

            <label>
              Categoría:
              <select
                {...register('category', { required: 'La categoría es obligatoria' })}
                defaultValue=""
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="create-activity-error">{errors.category.message}</span>}
            </label>

            <label>
              Duración (minutos):
              <input
                type="number"
                {...register('duration', {
                  required: 'La duración es obligatoria',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Debe ser al menos 1 minuto' },
                })}
              />
              {errors.duration && <span className="create-activity-error">{errors.duration.message}</span>}
            </label>

            <label>
              Ubicación:
              <input
                type="text"
                {...register('location', { required: 'La ubicación es obligatoria' })}
              />
              {errors.location && <span className="create-activity-error">{errors.location.message}</span>}
            </label>

            <label>
              Dificultad:
              <select
                {...register('difficulty', { required: 'La dificultad es obligatoria' })}
                defaultValue=""
              >
                <option value="" disabled>Selecciona una dificultad</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.difficulty && <span className="create-activity-error">{errors.difficulty.message}</span>}
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
