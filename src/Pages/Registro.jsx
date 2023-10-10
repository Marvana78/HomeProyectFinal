import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Form, Button } from 'react-bootstrap';
import '../css/style.css';


const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msjError, setMsjError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);

  // Cargar datos del usuario desde LocalStorage al cargar la página
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setNombre(parsedUserData.nombre);
      setEdad(parsedUserData.edad);
      setEmail(parsedUserData.email);
    }
  }, []);

  const validarFormulario = (e) => {
    e.preventDefault();
    setMsjError('');

    if (
      nombre === '' ||
      edad === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setMsjError('Todos los campos son obligatorios');

      // Configura un temporizador para limpiar el mensaje de error después de 5 segundos
      
    } else if (edad < 18) {
      setMsjError('El usuario debe ser mayor a 18 años');
    } else if (nombre.length < 3) {
      setMsjError('El nombre debe tener más de 3 caracteres');
    } else if (!isValidEmail) {
      setMsjError('No es un email válido');
    } else if (password.length < 5) {
      setMsjError('La contraseña debe tener más de 5 caracteres');
    } else if (password !== confirmPassword) {
      setMsjError('Las contraseñas deben ser iguales');
    }

    if(msjError){
      setTimeout(() => {
        setMsjError('');
      }, 5000);
      
      return;
    }
    // Guardar datos del usuario en LocalStorage
    const userData = {
      nombre,
      edad,
      email,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    setMsjError('Usuario Registrado Correctamente');
  };

  return (
    <>
    <Navbar/>
    <div className="gray-background" >
      {msjError ? (
        <p className="col-5 mx-auto bg-danger text-white p-3 text-center">{msjError}</p>
      ) : (
        ''
      )}

      <div className='Body'>
        <br />
        <h2 className=' text-center mt-4'>Formulario de Registro</h2><br />
        <div className='col-3 mx-auto'>
          <Form onSubmit={validarFormulario}>
            <Form.Group className="mt-4 " controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="edad">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese su edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="contrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="confirmarContrasena">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="button registro mt-5 w-100 p-2" type="submit">
              Registrarse
            </Button>
          </Form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Registro;
