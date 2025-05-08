import "./registo.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from '../login/login.js';

function Registo() {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); // Estado para erros

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se as passwords coincidem
        if (formData.password !== formData.confirm_password) {
            setErrorMessage('As palavras-passe não coincidem!');
            return;
        }

        // Limpa o erro se estiver tudo certo
        setErrorMessage('');

        try {
            const response = await fetch('https://lwlc-proj-2024.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 2, // Exemplo com ID estático
                    username: formData.username,
                    full_name: formData.full_name,
                    email: formData.email,
                    password: formData.password,
                    is_admin: false
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao criar conta. Verifique os dados.');
            }

            const data = await response.json();
            alert('Conta criada com sucesso!');
            console.log(data);

        } catch (error) {
            console.error('Erro:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="registo">
            <main>
                <form onSubmit={handleSubmit}>
                    <section className="inputs-container">
                        <input 
                            className="gmail" 
                            type="email" 
                            name="email" 
                            placeholder="example@gmail.com" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                        <div className="name-container">
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="name-container">
                            <input 
                                type="text" 
                                name="full_name" 
                                placeholder="Full Name" 
                                value={formData.full_name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="password-container">
                            <input 
                                type="password" 
                                id="field-password" 
                                className="field-password" 
                                name="password" 
                                placeholder="**********" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="password-container">
                            <input 
                                type="password" 
                                id="field-confirm-password" 
                                className="field-password" 
                                name="confirm_password" 
                                placeholder="Confirm Password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />  
                        </div>
                    </section>

                    {/* Mensagem de erro */}
                    {errorMessage && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>
                    )}

                    <section className="password-infos">
                        <div>
                            <input type="checkbox" />
                            <span> Lembrar senha?</span>
                        </div>
                    </section>
                    <button id="btn-login" type="submit">Criar conta</button>
                    <footer>
                        <hr />
                        <Link to="/login">
                            <span> Já tem conta ? <a href="#"> Iniciar sessão</a></span>
                        </Link>
                    </footer>
                </form>
            </main>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default Registo;
