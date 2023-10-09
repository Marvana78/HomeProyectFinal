import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home';
import Pedidos from '../Pages/Pedidos';
import Registro from '../Pages/Registro';
import Login from '../Pages/Login';
import UserManagement from '../Components/UserManagement';



export const Approuter = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Pedidos" element={<Pedidos />}/>
      <Route path="/Registro" element={<Registro />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/AdminUser" element={<UserManagement/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
