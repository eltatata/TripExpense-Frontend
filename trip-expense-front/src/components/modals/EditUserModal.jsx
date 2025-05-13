import React, { useEffect } from 'react';
import './CreateUserModal.css';
import api from '../../services/api';
import { useForm } from 'react-hook-form';

const EditUserModal = ({ isOpen, onClose, onUpdate, userData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (userData) {
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("phone", userData.phone);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setValue("role", userData.role);
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      if (data.image && data.image.length > 0) {
        data.image = URL.createObjectURL(data.image[0]);
      } else {
        data.image = userData.image; 
      }

      const response = await api.put(`/users/${userData.id}`, data);
      onUpdate(response.data); 
      onClose(); 
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    isOpen && (
      <div className="create-user-modal-overlay">
        <div className="create-user-modal-container">
          <h2>Editar Usuario</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="create-user-modal-form">
            <label>
              Nombre:
              <input
                type="text"
                {...register("firstName", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" }
                })}
              />
              {errors.firstName && <span className="create-user-error">{errors.firstName.message}</span>}
            </label>

            <label>
              Apellido:
              <input
                type="text"
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" }
                })}
              />
              {errors.lastName && <span className="create-user-error">{errors.lastName.message}</span>}
            </label>

            <label>
              Teléfono:
              <input
                type="text"
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  pattern: { value: /^[0-9]+$/, message: "Solo números" },
                  minLength: { value: 7, message: "Mínimo 7 dígitos" },
                  maxLength: { value: 15, message: "Máximo 15 dígitos" }
                })}
              />
              {errors.phone && <span className="create-user-error">{errors.phone.message}</span>}
            </label>

            <label>
              Email:
              <input
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Correo inválido"
                  }
                })}
              />
              {errors.email && <span className="create-user-error">{errors.email.message}</span>}
            </label>

            <label>
              Contraseña:
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" }
                })}
              />
              {errors.password && <span className="create-user-error">{errors.password.message}</span>}
            </label>

            <label>
              Rol:
              <input
                type="text"
                {...register("role", {
                  required: "El rol es obligatorio"
                })}
              />
              {errors.role && <span className="create-user-error">{errors.role.message}</span>}
            </label>

            <label>
              Imagen:
              <input
                type="file"
                {...register("image")}
              />
            </label>

            <div className="create-user-modal-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={() => { onClose(); }}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditUserModal;
