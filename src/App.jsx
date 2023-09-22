import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import style from './css/style.css';
import Logo from './assets/img/logo1.png';
import { Approuter } from "./router/Approuter";



function App() {
  return (
  <>
   <Approuter/>
    <Navbar/>
    
    <div className="imagenlogo">
        <img src={Logo} alt="" className="centered-image" style={{ width: '100px', height: 'auto', marginTop: '20px' }} />
    </div>

    <Footer/>
    </>
  )
}

export default App
