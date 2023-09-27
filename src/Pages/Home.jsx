import React from 'react'
import imageBetweenVideoAndCards from '../assets/img/logomenu.png';
import image1 from '../assets/img/combinadonigiri.png';
import image2 from '../assets/img/combinadomacky.png';
import image3 from '../assets/img/tunaroll.png';
import image4 from '../assets/img/macky.png';
import image5 from '../assets/img/sake.png';
import image6 from '../assets/img/urakamakis.png';
import videoSource from '../video/Taky.mp4';
import videoSource2 from '../video/serietaky.mp4';

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
 
  return (
    <>
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
      <div style={cardStyle}>
        <img src={image1} alt='Imagen 1' style={imageStyle} />
        <p style={descriptionStyle}>2 maguro, 2 sake de salmón, 1 avocado, 3 ebi, 2 tako.</p>
        <p className="lh-1 fw-bold" >Total: $5.400</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
      <div style={cardStyle}>
        <img src={image2} alt='Imagen 2' style={imageStyle} />
        <p style={descriptionStyle}>10 makis de salmón, 10 tuna rolls, 5 kani maki, 5 sashimi.</p>
        <p className="lh-1 fw-bold" >Total: $8.500</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
      <div style={cardStyle}>
        <img src={image3} alt='Imagen 3' style={imageStyle} />
        <p style={descriptionStyle}>Rollo de arroz envuelto c/salmón rosado</p>
        <p className="lh-1 fw-bold" >Total: $3.500</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
      <div style={cardStyle}>
        <img src={image4} alt='Imagen 4' style={imageStyle} />
        <p style={descriptionStyle}>Rollo de arroz envuelto c/alga nori</p>
        <p className="lh-1 fw-bold" >Total: $2.800</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
      <div style={cardStyle}>
        <img src={image5} alt='Imagen 5' style={imageStyle} />
        <p style={descriptionStyle}>Arroz cubierto c/salmón</p>
        <p className="lh-1 fw-bold" >Total: $4.200</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
      <div style={cardStyle}>
        <img src={image6} alt='Imagen 6' style={imageStyle} />
        <p style={descriptionStyle}>Rollo invertido c/arroz o alga nori</p>
        <p className="lh-1 fw-bold" >Total: $ 3.100</p>
        <a href='#' style={buttonStyle}>Comprar</a>
      </div>
    </div>
    </section>
    <section>
    <section>
        <div className="video-container" style={{ ...videoContainerStyle, marginBottom: secondVideoMarginBottom }}>
          <video controls autoPlay loop style={videoStyle}>
            <source src={videoSource2} type="video/mp4" />
          </video>
        </div>
      </section>
      </section>
    </>
  )
}
export default Home;