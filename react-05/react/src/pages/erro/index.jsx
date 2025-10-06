import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Erro() {
    return (
        <div className="erro-container">
            <div className="erro-content">
                <h1 className="erro-titulo">404</h1>
                <div className="erro-divider"></div>
                <h2 className="erro-subtitulo">Página não encontrada</h2>
                <p className="erro-mensagem">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Link to="/" className="erro-botao">
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}