import React, { useState, useEffect } from 'react';
import '../CSS/styles.css';

const UserForm = ({ addUser, editUser, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'cliente',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = 'El nombre es obligatorio';
        }
        if (!formData.email.trim()) {
            validationErrors.email = 'El correo electrónico es obligatorio';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            validationErrors.email = 'El correo electrónico no es válido';
        }
        if (!formData.password.trim()) {
            validationErrors.password = 'La contraseña es obligatoria';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else if (formData.password.length > 20) {
            validationErrors.password = 'La contraseña no debe tener más de 20 caracteres';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            alert('No es posible proceder con el registro. Por favor, revisa los campos obligatorios y las reglas de validación.');
            return;
        }

        try {
            let response;
            if (user) {
                response = await fetch(`http://localhost:4000/api/users/create${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                response = await fetch('http://localhost:4000/api/users/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.status === 500) {
                alert('Error en el servidor. Por favor intenta de nuevo más tarde.');
            } else {
                try {
                    const data = await response.json();
                    if (response.status === 409) {
                        alert(data.message);
                    } else if (response.status !== 200 && response.status !== 201) {
                        alert(`No es posible ${user ? 'editar' : 'crear'} el usuario: ${data.message}`);
                    } else {
                        if (user) {
                            editUser({ ...formData, id: user.id });
                        } else {
                            addUser({ ...formData, id: Date.now(), isActive: true });
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar la respuesta del servidor:', error);
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
        setErrors({
            ...errors,
            [e.target.name]: undefined,
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-secondary">Nombre:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label className="text-secondary">Correo electrónico:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label className="text-secondary">Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label className="text-secondary">Rol:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="btn-primary">{user ? 'Editar Usuario' : 'Agregar Usuario'}</button>
            </form>
        </div>
    );
};

export default UserForm;
