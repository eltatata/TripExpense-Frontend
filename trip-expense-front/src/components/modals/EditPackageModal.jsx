import React, { useState, useEffect } from 'react';
import './EditUserModal.css';
import api from '../../services/api';

const EditPackageModal = ({ isOpen, onClose, onUpdate, packageToEdit }) => {
  const [updatedPackage, setUpdatedPackage] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (packageToEdit) {
      setUpdatedPackage({
        name: packageToEdit.name || '',
        description: packageToEdit.description || '',
        price: packageToEdit.price || '',
        image: packageToEdit.image || '',
      });
    }
  }, [packageToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedPackage((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!updatedPackage.name) {
      formIsValid = false;
      errors.name = 'El nombre es obligatorio';
    }
    if (!updatedPackage.description) {
      formIsValid = false;
      errors.description = 'La descripción es obligatoria';
    }
    if (!updatedPackage.price || isNaN(updatedPackage.price)) {
      formIsValid = false;
      errors.price = 'El precio es inválido';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.put(`/packages/${packageToEdit.id}`, updatedPackage);
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error("Error al actualizar el paquete:", error);
      }
    }
  };

  return (
    isOpen && (
      <div className="edit-user-modal-overlay">
        <div className="edit-user-modal-container">
          <h2>Editar Paquete</h2>
          <form onSubmit={handleSubmit} className="edit-user-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={updatedPackage.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="edit-user-error">{errors.name}</span>}
            </label>

            <label>
              Descripción:
              <textarea
                name="description"
                value={updatedPackage.description}
                onChange={handleChange}
                required
              />
              {errors.description && <span className="edit-user-error">{errors.description}</span>}
            </label>

            <label>
              Precio:
              <input
                type="number"
                name="price"
                value={updatedPackage.price}
                onChange={handleChange}
                required
              />
              {errors.price && <span className="edit-user-error">{errors.price}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </label>

            <div className="edit-user-modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditPackageModal;
