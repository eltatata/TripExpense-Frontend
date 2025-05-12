import React, { useState, useEffect } from 'react';
import './EditUserModal.css';
import api from '../../services/api';

const EditUserModal = ({ isOpen, onClose, onUpdate, userToEdit }) => {
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    image: '',
    role: '', 
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    image: '',
    role: '', 
  });

  useEffect(() => {
    if (userToEdit) {
      setUpdatedUser({
        firstName: userToEdit.firstName || '',
        lastName: userToEdit.lastName || '',
        phone: userToEdit.phone || '',
        email: userToEdit.email || '',
        image: userToEdit.image || '',
        role: userToEdit.role || '', 
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedUser((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!updatedUser.firstName) {
      formIsValid = false;
      errors.firstName = 'El nombre es obligatorio';
    }
    if (!updatedUser.lastName) {
      formIsValid = false;
      errors.lastName = 'El apellido es obligatorio';
    }
    if (!updatedUser.phone) {
      formIsValid = false;
      errors.phone = 'El teléfono es obligatorio';
    }
    if (!updatedUser.email || !/\S+@\S+\.\S+/.test(updatedUser.email)) {
      formIsValid = false;
      errors.email = 'El correo electrónico es inválido';
    }

    if (!updatedUser.role) {
      formIsValid = false;
      errors.phone = 'El rol es obligatorio';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.put(`/users/${userToEdit.id}`, updatedUser);
        onUpdate(response.data); 
        onClose(); 
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  return (
    isOpen && (
      <div className="edit-user-modal-overlay">
        <div className="edit-user-modal-container">
          <h2>Editar Usuario</h2>
          <form onSubmit={handleSubmit} className="edit-user-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="edit-user-error">{errors.firstName}</span>}
            </label>

            <label>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <span className="edit-user-error">{errors.lastName}</span>}
            </label>

            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="edit-user-error">{errors.phone}</span>}
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="edit-user-error">{errors.email}</span>}
            </label>

            <label>
              Rol:
              <input
                type="text"
                name="role"
                value={updatedUser.role}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="create-user-error">{errors.role}</span>}
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

export default EditUserModal;
