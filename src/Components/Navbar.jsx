import React from 'react';
import '../css/style.css';


export const Navbar = () => {
  return (
    <>
<nav className="navbar">
      <ul className="navbar-list pt-3 w-100 justify-content-center">
        <li className="navbar-item"><a href="#">Home</a></li>
        <li className="navbar-item"><a href="#">Pedido</a></li>
        <li className="navbar-item"><a href="#">Registro</a></li>
        <li className="navbar-item"><a href="#">Login</a></li>
      </ul>
    </nav>
    </>
  )
}
export default Navbar;