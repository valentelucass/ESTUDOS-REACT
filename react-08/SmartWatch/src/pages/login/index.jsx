import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
            const users = await response.json();

            if (users.length > 0) {
                alert("Login realizado com sucesso!");
                navigate('/');
            } else {
                alert("E-mail ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro na comunicação com o servidor:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div className="login-page">
            <Header />
            <main className="login-container">
                <div className="login-box">
                    <h1>Acesse sua conta</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Endereço e-mail</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Digite a sua senha</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                        </div>
                        <button type="submit" className="submit-btn">Fazer login</button>
                    </form>
                    <div className="form-links">
                        <Link to="/add-produto">Painel administrador</Link>
                        <span>|</span>
                        <Link to="/cadastro">Fazer cadastro</Link>
                        <span>|</span>
                        <Link to="/esqueci-senha">Esqueci a senha</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;