import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import logo1 from './assets/img/logo1.png'
import style from './css/style.css';
import ReactPlayer from "react-player"
import Video from './videos.mp4/Taky.mp4'


function App() {
  return (
    <>
    <Navbar/>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
    <img src={logo1} style={{ width: '100px', height: 'auto' }} />
    </div>  

  
    <section>
        <div className="text-container text-center mt-5 mb-5">
          <h1 className="fonts3">NUESTRO MENÚ</h1>
        </div> 
      </section>

       <section className="d-flex justify-content-around flex-wrap my-5 backgroundcolor-sections p-5">
        
      </section> 
      <Footer/>
    </>
  )
}

export default App
