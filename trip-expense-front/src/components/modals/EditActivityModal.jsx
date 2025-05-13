import React, { useEffect, useState } from 'react';
import './EditActivityModal.css';
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

const EditActivityModal = ({ isOpen, onClose, onUpdate, activityToEdit }) => {
  const [cities, setCities] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
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
      if (activityToEdit) {
        setValue('name', activityToEdit.name || '');
        setValue('cityId', activityToEdit.cityId || '');
        setValue('description', activityToEdit.description || '');
        setValue('category', activityToEdit.category || '');
        setValue('duration', activityToEdit.duration || '');
        setValue('location', activityToEdit.location || '');
        setValue('difficulty', activityToEdit.difficulty || '');
        setImageFile(null);
      }
    }
  }, [isOpen, activityToEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        duration: parseInt(data.duration, 10),
        image: imageFile ? URL.createObjectURL(imageFile) : activityToEdit.image,
      };

      const res = await api.put(`/activities/${activityToEdit.id}`, payload);
      onUpdate(res.data);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
    }
  };

  return (
    isOpen && (
      <div className="edit-activity-modal-overlay">
        <div className="edit-activity-modal-container">
          <h2>Editar Actividad</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="edit-activity-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name && <span className="edit-activity-error">{errors.name.message}</span>}
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
              {errors.cityId && <span className="edit-activity-error">{errors.cityId.message}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                {...register('description', { required: 'La descripción es obligatoria' })}
              />
              {errors.description && <span className="edit-activity-error">{errors.description.message}</span>}
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
              {errors.category && <span className="edit-activity-error">{errors.category.message}</span>}
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
              {errors.duration && <span className="edit-activity-error">{errors.duration.message}</span>}
            </label>

            <label>
              Ubicación:
              <input
                type="text"
                {...register('location', { required: 'La ubicación es obligatoria' })}
              />
              {errors.location && <span className="edit-activity-error">{errors.location.message}</span>}
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
              {errors.difficulty && <span className="edit-activity-error">{errors.difficulty.message}</span>}
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
