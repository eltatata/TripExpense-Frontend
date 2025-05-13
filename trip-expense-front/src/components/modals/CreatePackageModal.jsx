import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CreatepackageModal.css'; // Reutilizamos estilos existentes
import api from '../../services/api';

const CreatePackageModal = ({ isOpen, onClose, onCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [cities, setCities] = useState([]);
  const [packages, setpackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, packagesRes, hotelsRes, activitiesRes] = await Promise.all([
          api.get('/cities'),
          api.get('/packages'),
          api.get('/hotels'),
          api.get('/activities'),
        ]);

        setCities(citiesRes.data || []);
        setpackages(packagesRes.data || []);
        setHotels(hotelsRes.data || []);
        setActivities(activitiesRes.data || []);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (isOpen) fetchData();
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description || '',
        imageUrl: imageUrl,
        destination: { cityId: parseInt(data.destinationCityId) },
        basePrice: parseFloat(data.basePrice),
        durationDays: parseInt(data.durationDays),
        includedpackage: data.includedpackageId ? { packageId: parseInt(data.includedpackageId) } : null,
        includedHotel: data.includedHotelId ? { hotelId: parseInt(data.includedHotelId) } : null,
        includedActivities: data.includedActivityIds?.map(id => ({ activityId: parseInt(id) })) || [],
        type: data.type,
      };

      const res = await api.post('/packages', payload);
      onCreate(res.data);
      reset();
      setImageUrl('');
      onClose();
    } catch (error) {
      console.error('Error al crear paquete:', error);
    }
  };

  return (
    isOpen && (
      <div className="create-package-modal-overlay">
        <div className="create-package-modal-container">
          <h2>Crear Paquete</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="create-package-modal-form">

            <label>
              Nombre del paquete:
              <input
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                })}
              />
              {errors.name && <span className="create-package-error">{errors.name.message}</span>}
            </label>

            <label>
                Descripción:
                <textarea
                    {...register('description', {
                    required: 'La descripción es obligatoria',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                    maxLength: { value: 500, message: 'Máximo 500 caracteres' }
                    })}
                
                />
                {errors.description && (
                    <span className="create-package-error">{errors.description.message}</span>
                )}
            </label>

            <label>
              Imagen:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>

            <label>
              Ciudad destino:
              <select {...register('destinationCityId', { required: 'Ciudad destino obligatoria' })}>
                <option value="">Seleccione una ciudad</option>
                {cities.map(city => (
                  <option key={city.cityId} value={city.cityId}>{city.name}</option>
                ))}
              </select>
              {errors.destinationCityId && <span className="create-package-error">{errors.destinationCityId.message}</span>}
            </label>

            <label>
              Precio base:
              <input
                type="number"
                step="0.01"
                {...register('basePrice', {
                  required: 'El precio es obligatorio',
                  min: { value: 0, message: 'Debe ser positivo' }
                })}
              />
              {errors.basePrice && <span className="create-package-error">{errors.basePrice.message}</span>}
            </label>

            <label>
              Duración (días):
              <input
                type="number"
                {...register('durationDays', {
                  required: 'Duración obligatoria',
                  min: { value: 1, message: 'Mínimo 1 día' }
                })}
              />
              {errors.durationDays && <span className="create-package-error">{errors.durationDays.message}</span>}
            </label>

            <label>
              Vuelo incluido:
              <select {...register('includedpackageId')}>
                <option value="">Seleccione un vuelo</option>
                {packages.map(f => (
                  <option key={f.packageId} value={f.packageId}>
                    {f.airline} - {f.packageNumber}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Hotel incluido:
              <select {...register('includedHotelId')}>
                <option value="">Seleccione un hotel</option>
                {hotels.map(h => (
                  <option key={h.hotelId} value={h.hotelId}>
                    {h.name} ({h.stars} estrellas)
                  </option>
                ))}
              </select>
            </label>

            <label>
              Actividades incluidas:
              <select multiple {...register('includedActivityIds')}>
                {activities.map(a => (
                  <option key={a.activityId} value={a.activityId}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Tipo de paquete:
              <select {...register('type', { required: 'Tipo obligatorio' })}>
                <option value="">Seleccione un tipo</option>
                <option value="Todo incluído">Todo incluido</option>
                <option value="Familiar">Familiar</option>
                <option value="Romántico">Romántico</option>
                <option value="Aventura">Aventura</option>
                <option value="Lujo">Lujo</option>
                <option value="Negocios">Negocios</option>
              </select>
              {errors.type && <span className="create-package-error">{errors.type.message}</span>}
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
