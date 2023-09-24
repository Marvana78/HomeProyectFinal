import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import style from './css/style.css';
import {Home} from './Pages/Home.jsx';


function App() {
  return (
  <>
    <Navbar/>
    
    <Home/>
   <Footer/>
    </>
  )
}

export default App
