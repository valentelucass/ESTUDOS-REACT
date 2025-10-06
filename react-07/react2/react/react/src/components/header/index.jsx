import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

const Header = () => {
  const location = useLocation();

  const handleBack = () => {
    window.history.back();
  };

  // Lista de exercícios para gerar os links dinamicamente
  const exercicios = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <header className="header">
      <div className="header-container">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label="Voltar"
        >
          ←
        </button>

        <button
          className="home-button"
          onClick={() => window.location.href = '/'}
          aria-label="Home"
        >
          Home
        </button>

        <div className="nav-buttons">
          {exercicios.map(num => (
            <Link
              key={num}
              to={`/exercicio-${num}`}
              className={`nav-button ${location.pathname === `/exercicio-${num}` ? 'active' : ''}`}
            >
              {num}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;