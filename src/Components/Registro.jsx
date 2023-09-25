import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Stylo.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msjError, setMsjError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);

  const validarFormulario = (e) => {
    e.preventDefault();
    //aca van las validaciones
    if (
      nombre === '' ||
      edad === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return setMsjError('Todos los campos son obligatorios');
    } else if (edad < 18) {
      return setMsjError('el usuario debe ser mayor a 18 años');
    } else if (nombre.length < 3) {
      return setMsjError('el usuario debe tener más de 3 caracteres');
    } else if (!isValidEmail) {
      return setMsjError('no es un email válido');
    } else if (password.length < 5) {
      return setMsjError('la contraseña debe tener más de 5 caracteres');
    } else if (password !== confirmPassword) {
      return setMsjError('las contraseñas deben ser iguales');
    }

    setMsjError('Usuario Registrado Correctamente');
  };

  return (
    <div className="">
		
      {msjError ? (
        <p className="col-5 mx-auto bg-danger text-white p-3 text-center">{msjError}</p>
      ) : (
        ''
      )}
	  
<div className='Body'>
<br />
		<h1 className='container text-center text-primary'>Formulario de Registro</h1><br />
<div className='col-3 mx-auto'>
      <Form onSubmit={validarFormulario}>
        <Form.Group className="mt-4 " controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            onChange={(e) => setNombre(e.target.value)}
			
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="edad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese su edad"
            onChange={(e) => setEdad(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="contrasena">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="confirmarContrasena">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme su contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}

			
          />
		  
        </Form.Group>

        <Button className="mt-5 w-100 p-2" variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
	  </div>

    </div>
	</div>
  );
};

export default Registro;
