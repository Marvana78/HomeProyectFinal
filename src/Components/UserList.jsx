import React, { useEffect, useState } from 'react';
import { BASE_URL } from './apiConfig.js'; // Importa la URL base

const UserList = ({ setShowEditForm, setSelectedUser, toggleUserStatus }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al backend para obtener la lista de usuarios
    fetch(`${BASE_URL}/api/users`)
      .then((response) => {
        console.log("Respuesta del servidor:", response); // Nueva línea de diagnóstico
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data recibida:", data); // Nueva línea de diagnóstico
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
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
                  <button onClick={() => toggleUserStatus(user.id)}>Inactivar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
