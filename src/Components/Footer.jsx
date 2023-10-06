import React from 'react'


export const Footer = () => {
  return (
    <div>
<footer>
      <div className="container-fluid mt-3">
        <div className="row text-center">
        <ul className="d-flex justify-content-center list-unstyled mb-4">
          <li className="me-3">
            <i className="bi bi-facebook fs-3"></i></li>
          <li className="me-3">
            <i className="bi bi-instagram fs-3"></i></li>
          <li>
            <i className="bi bi-twitter fs-3"></i></li>  
        </ul>
          <div className="col-md-12">
            <p>Tel. +54 (0381) 4215106</p>
            <p>Crisóstomo Alvarez 656 - C.P 4.000</p>
            <p>S. M. de Tucumán - Argentina</p>
            <p>&copy; 2023 Copyright: TakySushi.com.ar</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer