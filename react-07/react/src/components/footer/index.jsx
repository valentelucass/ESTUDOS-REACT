import React from 'react';
import './index.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>React 07 - Estudos</h3>
            <p>Laboratório de exercícios CRUD</p>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} • Desenvolvido por Lucas Andrade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
