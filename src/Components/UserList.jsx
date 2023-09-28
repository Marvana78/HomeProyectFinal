import React from 'react';

const UserList = ({ users, setShowEditForm, setSelectedUser, toggleUserStatus }) => {
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  return (
    <div>
      <h2>Usuarios Activos</h2>
      <ul>
        {users.filter(user => user.isActive).map((user, index) => (
          <li key={index}>
            {user.name}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => toggleUserStatus(user.id)}>Inactivar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
