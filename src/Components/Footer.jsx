import React from 'react'

export const Footer = () => {
  return (
    <div>
<footer className="bg-dark text-light p-3">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-12">
            <p>Tel. +54 (0381) 4215106</p>
            <p>Crisóstomo Alvarez 656 - C.P 4000</p>
            <p>S. M. de Tucumán - Argentina</p>
            <p>&copy; 2023 Copyright: RollingCodeSchool.com.ar</p>
          </div>
          <li className='col-12 col-md3 list-unstyled pe-5 ps-5'>
            <li className='d-flex justify-content-between'>
            <i className="bi bi-facebook fs-3"></i>
          <i className="bi bi-instagram fs-3"></i>
          <i className="bi bi-twitter fs-3 "></i>
          </li>
          </li>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer