import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import serverAPI from '../api/serverAPI';
import '../css/style.css';




const Pedidos = () => {
  const [menus, setMenus] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0);

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
  console.log(menus);
  return (
    <div>
      <Navbar/>
      <h1 className='textcenter'>Mis pedidos</h1>
      <ul>
        {menus.map((menu) => (
          <li key={menu._id}>
            <p>Nombre: {menu.Nombre}</p>
            <p>Descripción: {menu.Descripcion}</p>
            <p>Monto: {menu.Monto}</p>
            <p>Unidades: {menu.Unidades}</p>
          </li>
        ))}
      </ul>
      <p>Costo Total: ${costoTotal}</p>
      <Footer/> 
    </div>
  );
};

export default Pedidos;
