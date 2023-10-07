import React, { useState } from 'react';
import { BASE_URL } from './apiConfig.js';

const UserList = ({ reloadUsers,setShowEditForm, setSelectedUser, users }) => {
  const [editedUser, setEditedUser] = useState(null);  // Estado para el usuario que se está editando
  const [successMessage, setSuccessMessage] = useState("");  // Estado para el mensaje de éxito

  

  const toggleUserStatus = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres inactivar este usuario?")) {
      fetch(`${BASE_URL}/api/users/deactivate/${userId}`, {
        method: 'PUT'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al inactivar al usuario');
          }
          return response.json();
        })
        .then(data => {
          reloadUsers(); // Llamar a la función para recargar los usuarios
        })
        .catch(error => {
          console.error('Error al inactivar al usuario:', error);
        });
    }
  };

  const handleEdit = (user) => {
    if (window.confirm("¿Estás seguro de que quieres editar este usuario?")) {
      setSelectedUser(user);
      setShowEditForm(true);
      setEditedUser(user);  // Establecer el usuario que se está editando
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (!editedUser) return;

    if (window.confirm("¿Estás seguro de que quieres guardar los cambios?")) {
      fetch(`${BASE_URL}/api/users/edit/${editedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al editar al usuario');
          }
          return response.json();
        })
        .then(data => {
          const updatedUsers = localUsers.map(u => u._id === editedUser._id ? { ...u, ...editedUser } : u);
          setLocalUsers(updatedUsers);
          setShowEditForm(false);  // Ocultar el formulario después de guardar
          setSuccessMessage("Cambios guardados con éxito.");
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch(error => {
          console.error('Error al editar al usuario:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Usuarios Activos</h2>
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {editedUser && (
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Mail:
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Rol:
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSaveEdit}>Guardar cambios</button>
        </div>
      )}
      
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users // Usar directamente la prop "users"
            .filter((user) => user.isActive)
            .map((user, index) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => toggleUserStatus(user._id)}>Inactivar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
