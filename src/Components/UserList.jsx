import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Usuarios Activos</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} <button>Inactivar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
