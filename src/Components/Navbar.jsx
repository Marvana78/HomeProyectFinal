import React from 'react';
import '../css/style.css';


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
          <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Pedidos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Registro</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
export default Navbar;