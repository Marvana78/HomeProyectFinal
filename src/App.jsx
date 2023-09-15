import { useState } from 'react';
import { Navbar } from './Components/Navbar';
import UserForm from './Components/UserForm'; // Asegúrate de que la importación esté correcta
import UserList from './UserList';
function App() {
  const [count, setCount] = useState(0);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar el formulario

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Agregar nuevo usuario</button>
      {showForm && <UserForm />}
      <UserList users={users} />
    </div>
  );
}

export default App;

