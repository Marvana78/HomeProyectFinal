import { useState } from 'react';
import { Navbar } from './Components/Navbar';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';

function App() {
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [users, setUsers] = useState([]); // Estado para mantener un registro de los usuarios

  // Función para agregar un nuevo usuario al estado
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <>
      <Navbar />
      <button onClick={() => setShowForm(true)}>Agregar nuevo usuario</button>
      {showForm && <UserForm addUser={addUser} />}
      <UserList users={users} />
    </>
  );
}

export default App;


