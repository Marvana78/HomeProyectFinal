import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => { 
    reloadUsers();
    fetch('http://localhost:4000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);
  const reloadUsers = () => {
    fetch('http://localhost:4000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  };
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const editUser = (editedUser) => {
    const updatedUsers = users.map((user) => {
      return user.id === editedUser.id ? editedUser : user;
    });
    setUsers(updatedUsers);
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) => {
      return user.id === userId ? { ...user, isActive: !user.isActive } : user;
    });
    setUsers(updatedUsers);
  };

  return (
    <>
      <button onClick={() => setShowForm(true)}>Agregar nuevo usuario</button>
      {showForm && <UserForm addUser={addUser} />}
      {showEditForm && <UserForm user={selectedUser} editUser={editUser} />}
      <UserList
        users={users}
        reloadUsers={reloadUsers}
        setShowEditForm={setShowEditForm}
        setSelectedUser={setSelectedUser}
        toggleUserStatus={toggleUserStatus}
      />
    </>
  );
};

export default UserManagement;
