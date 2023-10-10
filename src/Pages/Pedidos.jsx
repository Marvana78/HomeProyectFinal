import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import serverAPI from '../api/serverAPI';
import '../css/style.css';
import '../CSS/pedidos.css';

const Pedidos = () => {
  const [menus, setMenus] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0);
  const [pedidoGuardado, setPedidoGuardado] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  useEffect(() => {
    serverAPI.get('/menu/GetMenu')
      .then((response) => {
        setMenus(response.data);

        // Calcular el costo total
        const total = response.data.reduce((acc, menu) => acc + menu.Monto, 0);
        setCostoTotal(total);
      })
      .catch((error) => {
        console.error('Error al obtener los menús:', error);
      });
  }, []);

  // Función para simular el pedido sin guardar en la base de datos
  const hacerPedido = () => {
    // Aquí puedes simular el proceso de guardar el pedido
    // Por ejemplo, puedes establecer una variable de estado para indicar que el pedido se ha enviado
    setPedidoGuardado(true);
    setMensajeConfirmacion('Pedido pendiente'); // Mensaje de confirmación simulado
  };

  return (
    <div>
      <Navbar />
      <h1 className="header">Mis pedidos</h1>
      <ul className='list-card'>
        {menus.map((menu) => (
          <li key={menu._id} className='list-card-item'>
            <p className='text-color'>Nombre: {menu.Nombre}</p>
            <p className='text-color'>Descripción: {menu.Descripcion}</p>
            <p className='text-color'>Monto: ${menu.Monto}</p>
            <p className='text-color'>Unidades: {menu.Unidades}</p>
          </li>
        ))}
      </ul>
      <p className="total">Costo Total: ${costoTotal}</p>
      {pedidoGuardado && <p className="confirmation">{mensajeConfirmacion}</p>}
      {!pedidoGuardado && (
        <div>
          <button onClick={hacerPedido} className="button">
            Enviar Pedido
          </button>
          {mensajeConfirmacion && <p>{mensajeConfirmacion}</p>}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Pedidos;
