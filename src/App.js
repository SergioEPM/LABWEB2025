import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Login from './forms/login/login.js';
import Registo from './forms/registros/registo.js';
import Cliente from './apoiocliente/apcliente.js';

import usuario from './usuario.png'; // imagem do usuário

// Componente reutilizável para botão de navegação
const MenuLink = ({ to, label }) => (
  <Link to={to}>
    <button className="menu-button">{label}</button>
  </Link>
);

// Menu dropdown do usuário
const UserMenu = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <nav className="user-menu">
      <MenuLink to="/login" label="Login" />
      <MenuLink to="/registo" label="Criar conta" />
      <MenuLink to="/cliente" label="Apoio ao cliente" />
    </nav>
  );
};

const ImageTextContainer = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
      <img 
        src="usuario.png"
        alt="Example" 
        style={{ marginRight: '20px', width: '150px', height: '150px', objectFit: 'cover' }} 
      />
      <div>
        <h2>Title</h2>
        <p>This is some text next to the image.</p>
      </div>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="App">
      
        <header className="App-header">
           {/* Quando carregar no nome faz voltar à root  */}
          <h1 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
            Navegação com a família
          </h1>

          <div className="search-box">
            <input placeholder="O que estás à procura?" />
          </div>

          <button className="toggle-menu" onClick={toggleOpen} aria-label="Menu do usuário">
            <img src={usuario} alt="Usuário" className="icon" />
          </button>

          <UserMenu isOpen={isOpen} />
        </header>
        
        {!(isOpen || window.location.pathname !== '/') && <ImageTextContainer />}
        <main>
          <Routes>
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registo" element={<Registo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
  

  
}










export default App;
