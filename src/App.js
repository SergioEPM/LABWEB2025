import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Login from './forms/login/login.js';
import Registo from './forms/registros/registo.js';
import Cliente from './apoiocliente/apcliente.js';

import usuario from './usuario.png'; // imagem do usuário

import { Map } from '@vis.gl/react-maplibre';
import { middleOfUSA } from './lib/constants'
import YouAreHere from './components/you-are-here.js';
import 'maplibre-gl/dist/maplibre-gl.css';


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

  function Mapa() {
    return (
      <Map
        initialViewState={{
          longitude: middleOfUSA[0],
          latitude: middleOfUSA[1],
          zoom: 4
        }}
        //mapStyle="/styles/dark.json"
        style={{width: 600, height: 400}}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <YouAreHere />
      </Map>
    );
  }

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
        <Mapa />
        
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
