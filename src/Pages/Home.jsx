import React, { useEffect, useState } from 'react'
import LogoMenu from '../assets/img/logomenu.png';
import image1 from '../assets/img/combinadomacky.png';
import image2 from '../assets/img/combinadonigiri.png';
import image3 from '../assets/img/buenosairesroll.png';
import image4 from '../assets/img/cevicheroll.png';
import image5 from '../assets/img/bondiolateriyaki.png';
import image6 from '../assets/img/camembertroll.png';
import image7 from '../assets/img/Chef.jpg';
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

const descriptionStyle = {
margin: '10px',
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

const productImages = [image3, image4, image5, image6];

export const Home = () => {

  const [cargarProductos, setCargarProductos] = useState([]);
 
  const cargarProducto = async () => {

try {
  const resp = await serverAPI.get('/prod/GetProd');
  console.log(resp)
  setCargarProductos(resp.data);
} catch (error) {
  console.error(error);
}

  };
const onclickProduct = async (producto) => {
  
  try {
    const resp = await serverAPI.post('/menu/AddMenu', producto);
   console.log(producto.Nombre) ;
  } catch (error) {
    console.error(error);
  }
}

useEffect(() =>{
  cargarProducto();
},[]);

const combo1 = {
  _id: '650dff4d43c232202dd2fb4e',
  Descripcion: 'Salmon Crunch,Philadelphia Roll,Camarón Sweet Spicy.',
  Nombre: 'Combo 1',
  Cantidad: 15,
  Precio: 8000,
};
const combo2 = {
  _id: '650dfff643c232202dd2fb56',
  Descripcion: 'Tabla con Nigiris,Nigiri Salmón,Nigiri Jiro, Nigiri Aburi.',
  Nombre: 'Combo 2',
  Cantidad: 5,
  Precio: 5000,
};

const comboImages = [image1, image2];
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
    <section style={{ marginTop: '50px' }}>
    <div className="container" style={{ backgroundColor: 'black', padding: '20px',  }}>
    <div className="row">
    <div className="col-md-6">
    <div style={{ color: 'white', padding: '20px' }}>
    <h4 className="text-center mt-4 orange-text p-3">CONCEPTO TAKY SUSHI</h4>
    <p>TakySushi es sinónimo de gastronomía de primer nivel. Reconocidos como el inconfundible referente del sushi y cocina de tendencia asiática, logramos transmitir placer y sensualidad en cada encuentro, gracias a combinaciones de sabores vanguardistas y exclusivos.</p>
    <h4 className="text-center mt-4 orange-text p-3">NUESTRA MISIÓN</h4>
    <p>Hacer de TakySushi un espacio relacionado con el buen vivir: Ofreciendo a nuestros clientes sushi creativo y de calidad premium, cocina innovadora y dinámica, en un ambiente vanguardista y relajado, a través de un servicio anticipativo y profesional.</p>
    <h4 className="text-center mt-4 orange-text p-3">NUESTRO PRODUCTO</h4>
    <p>TakySushi brinda un excelente producto, en un marco de calidad de servicio atento y profesional, y acondiciona sus locales en ubicaciones estratégicas con un diseño personal, que conforman su identidad y hacen de cada visita a SushiClub una experiencia única.</p>
    </div>
    </div>
    <div className="col-md-6">
    <img src={image7} alt="" style={{ maxWidth: '80%', height: 'auto', float: 'right'}} />
    </div>
    </div>
    </div>
    </section>
    <section>
    <div className="image-between-video-and-cards" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '90px', marginBottom: '10px' }}>
    <img src={LogoMenu} alt="Logo Menu" style={{maxWidth: '80%', maxHeight: '150px', height: 'auto',borderRadius: '6px',}}/>
</div>
  <div className='d-flex justify-content-center align-items-center flex-wrap my-5 p-5'>
  {cargarProductos.map((producto, index) => (
    <div key={producto._id} style={cardStyle}>
      <h1>{producto.Nombre}</h1>
    <img src={productImages[index % productImages.length]} alt={`Imagen ${producto._id}`} style={imageStyle} />
    <p style={descriptionStyle}>{producto.Descripcion}</p>
    <p className="lh-1 fw-bold">Total: ${producto.Precio}</p>
    <Button style={buttonStyle} onClick={()=>onclickProduct(producto)}>Agregar</Button>
    </div>
  ))}
   
    </div>
    </section>
    <section>
    <div className="video-container" style={{marginBottom:'40px' }}>
    <video autoPlay muted loop playsInline style={videoStyle}>
    <source src={videoSource2} type="video/mp4" />
    </video>
    </div>
    </section>
    <Footer/>
    </>
  )
}
export default Home;