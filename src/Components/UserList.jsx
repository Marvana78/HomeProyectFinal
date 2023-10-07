import React, { useEffect, useState } from 'react';
import { BASE_URL } from './apiConfig.js'; // Importa la URL base

const UserList = ({ setShowEditForm, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al backend para obtener la lista de usuarios
    fetch(`${BASE_URL}/api/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);



  const toggleUserStatus = (userId) => {
    // Realiza una solicitud PUT para inactivar al usuario
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
      // Actualizar la lista de usuarios con el estado actualizado
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, isActive: false } : user
      );
      setUsers(updatedUsers);
    })
    .catch(error => {
      console.error('Error al inactivar al usuario:', error);
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  const userEdit = user;
  editUserfunction(userEdit);
  };
    
  const editUserfunction =(user) => {
    const updatedUser = user;
    updatedUser.name="son 8k";
    
      fetch(`${BASE_URL}/api/users/edit/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al editar al usuario');
        }
        return response.json();
      })
      .then(data => {
        // Actualizar la lista de usuarios con la información actualizada
        const updatedUsers = users.map(u => u._id === user._id ? { ...u, ...updatedUser } : u);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('Error al editar al usuario:', error);
      });
  
  };
  return (
    <div className="container">
      <h2>Usuarios Activos</h2>
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
          {users
            .filter((user) => user.isActive)
            .map((user, index) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => toggleUserStatus(user._id)}>Inactivar</button> {/* Línea corregida */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
