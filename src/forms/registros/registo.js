import './registo.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from '../login/login.js';




function Register() {
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

    // Função para validar password com as regras pedidas
    const isPasswordValid = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação geral dos campos
        if (!formData.email || !formData.username || !formData.full_name || !formData.password || !formData.confirm_password) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        // Verificar formato do email simples
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Por favor, insira um email válido.');
            return;
        }

        // Verificar se as passwords coincidem
        if (formData.password !== formData.confirm_password) {
            setErrorMessage('As palavras-passe não coincidem!');
            return;
        }

        // Verificar se a password cumpre as regras
        if (!isPasswordValid(formData.password)) {
            setErrorMessage('A palavra-passe deverá conter pelo menos 8 caracteres, 1 número, 1 maiúscula e 1 carácter especial.');
            return;
        }

        // Limpa o erro se passar nas validações
        setErrorMessage('');

        try {
            const response = await fetch('https://api.sostrack.pt/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
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

export default Register;

