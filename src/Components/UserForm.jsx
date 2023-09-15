import React from 'react';

const UserForm = () => {
  return (
    <form>
      <label>
        Nombre:
        <input type="text" name="name" />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" />
      </label>
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default UserForm;
