import React from 'react';


export const Navbar = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-center navtext">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pedidos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Registro</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
