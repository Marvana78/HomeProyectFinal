import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import style from './css/style.css';
import {Home} from './Pages/Home.jsx';
import { Approuter } from "./router/Approuter";


function App() {
  return (
  <>
    <Navbar/>
    <Approuter/>
    <Home/>
   <Footer/>

  </>
  )
}

export default App
