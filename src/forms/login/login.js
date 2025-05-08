
// src/forms/login/Login.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Registo from '../registros/registo.js';
import './login.css';
import { useAuth } from '../../AuthContext.js';


function Login() {
 
  const { login } = useAuth(); 

  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://api.sostrack.pt/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação.');
      }
      // Save the token and user in localStorage
      login(data.token);
      
      // Optionally log the data to check
      console.log('authToken saved:', localStorage.getItem('authToken'));
      

      navigate('/');

      alert(`✅ Login efetuado como ${data.username}`);
      console.log('Login response:', data);
  
    } catch (error) {
      console.error('Erro de login:', error);
      setError(error.message);
    }
  };
  

  return (
    <div className="login">
      <main>
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          <section className="inputs-container">
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </section>

          <section className="password-infos">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember"> Lembrar senha?</label>
            </div>
            <a href="#">Esqueceu sua senha?</a>
          </section>

          {error && <p className="error">{error}</p>}

          <button id="btn-login" type="submit">Login</button>

          <footer>
            <hr />
            <span>
              Ainda não tem uma conta?{' '}
              <Link to="/registo">Criar conta</Link>
            </span>
          </footer>
        </form>
      </main>

      <Routes>
        <Route path="/registo" element={<Registo />} />
      </Routes>
    </div>
  );
}

export default Login;


