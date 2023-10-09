import React, { useState } from 'react';
import '../css/style.css';
import serverAPI from '../api/serverAPI';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const startLogin = async (email, password) => {
		try {
			const resp = await serverAPI.post('/pages/Login', {
				email,
				password,
			});

			console.log(resp);
			setError(resp.data.msg);

			localStorage.setItem('token', resp.data.token);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//aca van las validaciones
		if (email === '' || password === '') {
			return console.log('todos los campos son obligatorios');
		}

		startLogin(email, password);
	};
	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit} className='form-container'>
				{error ? <h3 className='errorStyle'>{error}</h3> : ''}
				<h1>Login</h1>

				<div className='input-container'>
					<label htmlFor='username'>Email:</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='input-container'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>Inciar Sesion</button>
			</form>
		</div>
	);
};

export default Login;
