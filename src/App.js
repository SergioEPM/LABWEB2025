import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Login from './forms/login/login.js';
import Registo from './forms/registros/registo.js';
import Cliente from './apoiocliente/apcliente.js';
import { useAuth } from './AuthContext';

import usuario from './usuario.png'; // imagem do usuário

import { Map } from '@vis.gl/react-maplibre';
import { middleOfPortugal } from './lib/constants'
import YouAreHere from './components/you-are-here.js';
import 'maplibre-gl/dist/maplibre-gl.css';


// Componente reutilizável para botão de navegação
const MenuLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick}>
    <button className="menu-button">{label}</button>
  </Link>
);

// Menu dropdown do usuário
const UserMenu = ({ isOpen, onLinkClick }) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <nav className="user-menu">
      {!isAuthenticated ? (
        <>
          <MenuLink to="/login" label="Login" onClick={onLinkClick} />
          <MenuLink to="/registo" label="Criar conta" onClick={onLinkClick} />
        </>
      ) : (
        <MenuLink
          label="Logout"
          onClick={() => {
            logout();
            onLinkClick();
          }}
        />
      )}
      <MenuLink to="/cliente" label="Apoio ao cliente" onClick={onLinkClick} />
    </nav>
  );
};

  function Mapa() {
    return (
      <Map
        initialViewState={{
          longitude: middleOfPortugal[0],
          latitude: middleOfPortugal[1],
          zoom: 4
        }}
        //mapStyle="/styles/dark.json"
        style={{width: 600, height: 600}}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <YouAreHere />
      </Map>
    );
  }

  function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [hideContent, setHideContent] = useState(false);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    const handleLinkClick = () => {
      setIsOpen(false);
      setHideContent(true); // hide both map and welcome text
    };
  
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
              Navegação com a família
            </h1>
  
            <div className="search-box">
              <input placeholder="O que estás à procura?" />
            </div>
  
            <button className="toggle-menu" onClick={toggleOpen} aria-label="Menu do usuário">
              <img src={usuario} alt="Usuário" className="icon" />
            </button>
  
            <UserMenu isOpen={isOpen} onLinkClick={handleLinkClick} />
          </header>
  
          <main >
            {!hideContent && (
              <div className="map-container">
                <Mapa />
              </div>
            )}
  
          <div className="content-area">
          <Routes>
              <Route path="/cliente" element={<Cliente />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registo" element={<Registo />} />
          </Routes>

  {!hideContent && (
    <div className="welcome-message">
      <h2>Welcome to the App!</h2>
      <p>This is a platform where you can register, log in, or view your client profile.</p>
    </div>
  )}
            </div>
          </main>
        </div>
      </Router>
    );
  }


export default App;
