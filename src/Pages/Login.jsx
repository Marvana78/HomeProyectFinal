import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msjError, setMsjError] = useState('');

	const validarLogin = (e) => {
		e.preventDefault();
		setMsjError('');

		//aca van las validaciones
		if (email === '' || password === '') {
			setMsjError('Todos los campos son obligatorios');
		}

		setTimeout(() => {
			setMsjError('');
		}, 5000);
	};
	return (
		<div className=''>
			{msjError ? (
				<p className='col-5 mx-auto bg-danger text-white p-3 text-center'>
					{msjError}
				</p>
			) : (
				''
			)}

			<div className='Body'>
				<br />
				<h1 className='container text-center text-dark'>
					<strong>Login</strong>
				</h1>
				<br />
				<div className='col-3 mx-auto'>
					<div>
						<Form onSubmit={validarLogin}>
							<Form.Group className='mt-2' controlId='email'>
								<Form.Label className='text-dark'>
									<strong>Email</strong>
								</Form.Label>
								<Form.Control
									type='email'
									placeholder='Ingrese su correo electrónico'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className='mt-2' controlId='contrasena'>
								<Form.Label>
									<strong>Contraseña</strong>
								</Form.Label>
								<Form.Control
									type='password'
									placeholder='Ingrese su contraseña'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Button className='mt-5 w-100 p-2' variant='dark' type='submit'>
								Iniciar sesión
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
