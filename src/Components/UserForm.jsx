import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ addUser, editUser, user }) => {
  console.log("Props recibidos en UserForm:", { addUser, editUser, user });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cliente',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // Llamada PUT para editar usuario
        const response = await axios.put(`http://localhost:4000/api/users/create${user.id}`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200) {
          editUser({ ...formData, id: user.id });
        }
      } else {
        // Llamada POST para crear un nuevo usuario
        const response = await axios.post('http://localhost:4000/api/users/create', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          addUser({ ...formData, id: Date.now(), isActive: true });
        }
      }
    } catch (error) {
      console.error('Hubo un error al procesar el formulario:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log("Formulario enviado"); handleSubmit(e); }}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <label>
        Rol:
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
        </select>
      </label>
      <button type="submit">{user ? 'Editar Usuario' : 'Agregar Usuario'}</button>
    </form>
  );
};

export default UserForm;
