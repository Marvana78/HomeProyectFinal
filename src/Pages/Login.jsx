import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


export const Login = () => {
  	const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
	
    const handleSubmit = (e) => {
      e.preventDefault
    }
  
    if(email === '' || password === '') {
      return console.log('Todos los campos son obligatorios');
    }

    return (
		<>
			<Navbar />
			<h1 className='container text-center text-primary'>Iniciar Sesion</h1>

			<div>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mt-4 ' controlId='nombre'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='text'
							placeholder='Ingrese su nombre'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mt-2' controlId='edad'>
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type='number'
							id='Ingrese su password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button className='mt-5 w-100 p-2' variant='primary' type='submit'>
						Iniciar Sesion
					</Button>
				</Form>
			</div>
			<Footer />
		</>
	);
};
export default Login;
