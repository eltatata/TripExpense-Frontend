import React, { useState } from 'react';
import './CreateUserModal.css';
import api from '../../services/api';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    image: '',
    role: '', 
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    image: '',
    role: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewUser((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!newUser.firstName) {
      formIsValid = false;
      errors.firstName = 'El nombre es obligatorio';
    }
    if (!newUser.lastName) {
      formIsValid = false;
      errors.lastName = 'El apellido es obligatorio';
    }
    if (!newUser.phone) {
      formIsValid = false;
      errors.phone = 'El teléfono es obligatorio';
    }
    if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) {
      formIsValid = false;
      errors.email = 'El correo electrónico es inválido';
    }
    if (!newUser.password) {
      formIsValid = false;
      errors.phone = 'La contraseña es obligatoria';
    }
    if (!newUser.role) {
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
        const response = await api.post("/users", newUser);
        onCreate(response.data); 
        setNewUser({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          image: '',
          role: '', 
        });
        onClose(); 
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }
    }
  };

  return (
    isOpen && (
      <div className="create-user-modal-overlay">
        <div className="create-user-modal-container">
          <h2>Crear Usuario</h2>
          <form onSubmit={handleSubmit} className="create-user-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="create-user-error">{errors.firstName}</span>}
            </label>

            <label>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <span className="create-user-error">{errors.lastName}</span>}
            </label>

            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="create-user-error">{errors.phone}</span>}
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="create-user-error">{errors.email}</span>}
            </label>

            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="create-user-error">{errors.password}</span>}
            </label>

            <label>
              Rol:
              <input
                type="text"
                name="role"
                value={newUser.role}
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

            <div className="create-user-modal-actions">
              <button type="submit">Crear</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateUserModal;
