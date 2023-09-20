import React from 'react'

export const Navbar = () => {
  return (
    <div>
<nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav text-center ">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pedido</a>
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

    </div>
  )
}

