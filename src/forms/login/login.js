// src/forms/login/Login.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Registo from '../registros/registo.js';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://lwlc-proj-2024.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação. Verifique suas credenciais.');
      } else {
        alert('Sessão iniciada');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
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
