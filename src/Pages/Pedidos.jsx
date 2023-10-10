import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import serverAPI from '../api/serverAPI';
import '../css/style.css';

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
      <h1 style={{ textAlign: 'center', color: 'black' }}>Mis pedidos</h1>
      <ul style={{ listStyleType: 'none' }}>
        {menus.map((menu) => (
          <li key={menu._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <p style={{ color: ' #f57c00' }}>Nombre: {menu.Nombre}</p>
            <p style={{ color: ' #f57c00' }}>Descripción: {menu.Descripcion}</p>
            <p style={{ color: ' #f57c00' }}>Monto: ${menu.Monto}</p>
            <p style={{ color: ' #f57c00' }}>Unidades: {menu.Unidades}</p>
          </li>
        ))}
      </ul>
      <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>Costo Total: ${costoTotal}</p>
      {pedidoGuardado && <p style={{ color: 'green' }}>{mensajeConfirmacion}</p>}
      {!pedidoGuardado && (
        <div>
          <button onClick={hacerPedido}>Enviar Pedido</button>
          {mensajeConfirmacion && <p style={{ color: 'red' }}>{mensajeConfirmacion}</p>}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Pedidos;
