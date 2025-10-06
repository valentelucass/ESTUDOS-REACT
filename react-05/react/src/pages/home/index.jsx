import './index.css'
import React from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/cabecalho';

export default function Home() {
    return (
        <div className="ticket-container">
            <Cabecalho titulo="Página Inicial" />

            <div className="home-content">
                <h1 className="home-title">Bem-vindo aos Exercícios React</h1>
                <p className="home-description">
                    Esta aplicação contém diversos exercícios práticos de React, incluindo:
                </p>

                <ul className="exercises-list">
                    <li>Calculadora de ingressos de cinema</li>
                    <li>Estimativa de tempo de leitura</li>
                    <li>Boletim de alunos</li>
                    <li>Conversor de moedas</li>
                    <li>Combinador de cores primárias</li>
                </ul>

                <Link to="/treinos" className="treinos-button">
                    Ver Todos os Exercícios
                </Link>
            </div>

            <footer className="ticket-footer">
                <p>Site de ingressos.com - Todos os direitos reservados</p>
            </footer>
        </div>
    )
}