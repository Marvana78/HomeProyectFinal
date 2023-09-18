import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminMenu from "./Pages/Admin/AdminMenu";
import AdminUsers from "./Pages/AdminUsers";
import AdminPedidos from "./Pages/AdminPedidos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/AdminUsers" element={<AdminUsers />} />
        <Route path="/AdminPedidos" element={<AdminPedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
