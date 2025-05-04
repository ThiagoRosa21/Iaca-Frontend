import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginRegister';
import CadastroLote from './pages/Vendedor/CadastroLote';
import ComprarLotes from './pages/Empresa/ComprarLotes';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vendedor/cadastrar" element={<CadastroLote />} />
        <Route path="/empresa/lotes" element={<ComprarLotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
