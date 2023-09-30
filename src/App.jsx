import { useState } from 'react';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import './CSS/styles.css'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const editUser = (editedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
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
        setShowEditForm={setShowEditForm}
        setSelectedUser={setSelectedUser}
        toggleUserStatus={toggleUserStatus}
      />
    </>
  );
}

export default App;
