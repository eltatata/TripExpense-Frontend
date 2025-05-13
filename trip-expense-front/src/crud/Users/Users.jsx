import React, { useState, useEffect } from "react";
import api from "../../services/api"; 
import "./Users.css";
import CreateUserModal from "../../components/modals/CreateUserModal"; 
import EditUserModal from "../../components/modals/EditUserModal"; 
import ConfirmModal from "../../components/modals/ConfirmModal"; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users"); 
        const usersArray = Array.isArray(res.data) ? res.data : res.data.data;  
        setUsers(usersArray || []);  
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setUsers([]); 
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = (newUser) => {
    setUsers([...users, newUser]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setEditModalOpen(false); 
    setUserToEdit(null); 
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${userToDelete}`);
      setUsers(users.filter((user) => user.id !== userToDelete));
      setDeleteModalOpen(false); 
      setUserToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-title">Gestión de Usuarios</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear usuario
        </button>
      </div>

      <div className="cards-wrapper">
        {users.length === 0 ? (
          <p className="no-users-message">No hay usuarios disponibles</p> 
        ) : (
          users.map((user) => (
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
                  <button className="edit-button" onClick={() => {
                    setUserToEdit(user); 
                    setEditModalOpen(true);
                  }}>Editar</button>
                  <button className="delete-button" onClick={() => {
                    setUserToDelete(user.id); 
                    setDeleteModalOpen(true);
                  }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
        userToEdit={userToEdit}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        userToEdit={userToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar usuario?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este usuario?"
      />
    </div>
  );
};

export default Users;
