import React, { useEffect, useState } from 'react'
import imageBetweenVideoAndCards from '../assets/img/logomenu.png';
import image1 from '../assets/img/combinadomacky.png';
import image2 from '../assets/img/combinadonigiri.png';
import image3 from '../assets/img/buenosairesroll.png';
import image4 from '../assets/img/cevicheroll.png';
import image5 from '../assets/img/bondiolateriyaki.png';
import image6 from '../assets/img/camembertroll.png';
import videoSource from '../video/Taky.mp4';
import videoSource2 from '../video/serietaky.mp4';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Button } from 'react-bootstrap';
import serverAPI from '../api/serverAPI';



const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: '20px',
  padding: '20px',
  maxWidth: '300px',
  backgroundColor: '#101010',
};

const videoStyle = {
  width: '100%', 
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '6px',
};

const titleStyle = {
  fontSize: '1.5rem',
  margin: '0',
};

const descriptionStyle = {
margin: '10px 0',
};

const buttonStyle = {
  display: 'block', 
  width: '100%', 
 padding: '10px 20px',
 backgroundColor: '#f57c00',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
};

const videoContainerStyle = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
    };

const secondVideoStyle = {
  width: '80%', 
  margin: '0 auto', 
    };

const secondVideoMarginBottom = '80px'; 


export const Home = () => {

  const [cargarProductos, setCargarProductos] = useState([]);
 
  const cargarProducto = async () => {

try {
  const resp = await serverAPI.get('/prod/GetProd');
  
  setCargarProductos(resp.data);
} catch (error) {
  console.error(error);
}

  };

useEffect(() =>{
  cargarProducto();
},[]);

 
  return (
    <>
    <Navbar/>
    <section>
<div className="video-container">
        <video controls autoPlay loop style={videoStyle}>
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
      </section>
      <section>
      <div className="image-between-video-and-cards" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '90px', marginBottom: '10px' }}>
  <img
    src={imageBetweenVideoAndCards}
    alt="Image Between Video and Cards"
    style={{
      maxWidth: '80%', 
      maxHeight: '150px', 
      height: 'auto',
      borderRadius: '6px',
    }}
  />
</div>

  <div className='d-flex justify-content-center align-items-center flex-wrap my-5 backgroundcolor-sections p-5'>
  {cargarProductos.map((producto) => (
    <div key={producto._id} style={cardStyle}>
      <img src={image1} alt={`Imagen ${producto._id}`} style={imageStyle} />
      <p style={descriptionStyle}>{producto.Descripcion}</p>
      <p className="lh-1 fw-bold">Total: ${producto.Precio}</p>
      <Button style={buttonStyle}>Agregar</Button>
    </div>
  ))}

      <div style={cardStyle}>
        <img src={image2} alt='Imagen 2' style={imageStyle} />
        <p style={descriptionStyle}>makis de salmón, tuna rolls, kani maki, sashimi.</p>
        <p className="lh-1 fw-bold" >Total: $5.000</p>
        <Button style={buttonStyle}>Agregar</Button>
      </div>
      <div style={cardStyle}>
        <img src={image3} alt='Imagen 3' style={imageStyle} />
        <p style={descriptionStyle}>Relleno de salmón, langostinos, palta y queso crema, con salmón por fu…</p>
        <p className="lh-1 fw-bold" >Total: $3.021</p>
        <Button style={buttonStyle}>Agregar</Button>
      </div>
      <div style={cardStyle}>
        <img src={image4} alt='Imagen 4' style={imageStyle} />
        <p style={descriptionStyle}>Relleno de salmón, pescado blanco y verduras marinadas en cilantro y p…</p>
        <p className="lh-1 fw-bold" >Total: $3.376</p>
        <Button style={buttonStyle}>Agregar</Button>
      </div>
      <div style={cardStyle}>
        <img src={image5} alt='Imagen 5' style={imageStyle} />
        <p style={descriptionStyle}>Braseada con salsa teriyaki y hongos portobello, sobre colchón de puré…</p>
        <p className="lh-1 fw-bold" >Total: $4.200</p>
        <Button style={buttonStyle}>Agregar</Button>
      </div>
      <div style={cardStyle}>
        <img src={image6} alt='Imagen 6' style={imageStyle} />
        <p style={descriptionStyle}>Relleno de tomates secos en conserva, espinaca, palta y cebolla morada…</p>
        <p className="lh-1 fw-bold" >Total: $ 8.182</p>
        <Button style={buttonStyle}>Agregar</Button>
      </div>

    </div>
    </section>
    <section>
        <div className="video-container" style={{ ...videoContainerStyle, marginBottom: secondVideoMarginBottom }}>
          <video controls autoPlay loop style={videoStyle}>
            <source src={videoSource2} type="video/mp4" />
          </video>
        </div>
      </section>
      <Footer/>
    </>
  )
}
export default Home;