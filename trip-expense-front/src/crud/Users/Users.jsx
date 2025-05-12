import React, { useState } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      phone: "3001234567",
      email: "juan.perez@example.com",
      image: "../assets/Newyork.jpg",
    },
    {
      id: 2,
      firstName: "Laura",
      lastName: "Gómez",
      phone: "3017654321",
      email: "laura.gomez@example.com",
      image: "../assets/Newyork.jpg",
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCreate = () => {
    const newUser = {
      id: users.length + 1,
      firstName: "Nuevo",
      lastName: "Usuario",
      phone: "3000000000",
      email: "nuevo.usuario@example.com",
      image: "../assets/Newyork.jpg",
    };
    setUsers([...users, newUser]);
  };

  const handleEdit = (id) => {
    alert(`Editar usuario con ID ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-title">Gestión de Usuarios</h2>
        <button className="create-button" onClick={handleCreate}>
          Crear usuario
        </button>
      </div>

      <div className="cards-wrapper">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image || "https://via.placeholder.com/300"} alt={`${user.firstName} ${user.lastName}`} className="user-image" />
            <div className="user-info">
              <h3>{user.firstName} {user.lastName}</h3>
              <p><strong>ID:</strong> {user.id}</p>

              {expandedCard === user.id && (
                <div className="extra-info">
                  <p><strong>Teléfono:</strong> {user.phone}</p>
                  <p><strong>Correo:</strong> {user.email}</p>
                </div>
              )}

              <div className="action-buttons">
                <button className="toggle-button" onClick={() => toggleExpand(user.id)}>
                  {expandedCard === user.id ? "Ocultar" : "Ver más"}
                </button>
                <button className="edit-button" onClick={() => handleEdit(user.id)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
