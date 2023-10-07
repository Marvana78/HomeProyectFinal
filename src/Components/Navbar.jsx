import React from 'react';
import '../css/style.css';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid ">
    <a className="navbar-brand" href="#"></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-center navtex">
        <li className="nav-item">
          <NavLink className="nav-link active text-white" aria-current="page" to="/" >Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link active text-white" to="/Pedidos" >Pedidos</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link active text-white" to="/Registro" >Registro</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link active text-white" to="/Login" >Login</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
export default Navbar;