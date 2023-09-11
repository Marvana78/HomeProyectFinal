import { useState } from 'react'
import { Navbar } from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <h1>Taky Sushi Restó</h1>
      <h2>Proyecto Final</h2>
    </>
  )
}

export default App
