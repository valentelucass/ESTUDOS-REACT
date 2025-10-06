import React, { useState } from "react";
import './index.css'

export default function Cards6() {
    const [corPrimaria1, setCorPrimaria1] = useState('');
    const [corPrimaria2, setCorPrimaria2] = useState('');
    const [corResultante, setCorResultante] = useState(null);

    const coresPrimarias = ['vermelho', 'azul', 'amarelo'];

    const combinarCores = () => {
        if (!corPrimaria1 || !corPrimaria2) {
            alert('Por favor, selecione duas cores primárias');
            return;
        }

        if (corPrimaria1 === corPrimaria2) {
            setCorResultante(corPrimaria1);
            return;
        }

        // Lógica de combinação de cores primárias
        if (
            (corPrimaria1 === 'vermelho' && corPrimaria2 === 'azul') || 
            (corPrimaria1 === 'azul' && corPrimaria2 === 'vermelho')
        ) {
            setCorResultante('roxo');
        } else if (
            (corPrimaria1 === 'vermelho' && corPrimaria2 === 'amarelo') || 
            (corPrimaria1 === 'amarelo' && corPrimaria2 === 'vermelho')
        ) {
            setCorResultante('laranja');
        } else if (
            (corPrimaria1 === 'azul' && corPrimaria2 === 'amarelo') || 
            (corPrimaria1 === 'amarelo' && corPrimaria2 === 'azul')
        ) {
            setCorResultante('verde');
        }
    };

    return (
        <section className="ticket-section">
            <h2>Combinador de Cores Primárias</h2>
            
            <div className="color-form">
                <div className="color-input-group">
                    <input 
                        type="text" 
                        className="ticket-input" 
                        placeholder="Cor primária" 
                        value={corPrimaria1}
                        onChange={(e) => setCorPrimaria1(e.target.value.toLowerCase())}
                        list="cores-primarias"
                    />
                    
                    <span className="combinado-text">combinado com</span>
                    
                    <input 
                        type="text" 
                        className="ticket-input" 
                        placeholder="Cor primária" 
                        value={corPrimaria2}
                        onChange={(e) => setCorPrimaria2(e.target.value.toLowerCase())}
                        list="cores-primarias"
                    />
                    
                    <button 
                        className="ok-button" 
                        onClick={combinarCores}
                    >
                        OK
                    </button>
                </div>
                
                <datalist id="cores-primarias">
                    {coresPrimarias.map((cor, index) => (
                        <option key={index} value={cor} />
                    ))}
                </datalist>
            </div>
            
            <div className="resultado-container">
                <p className="resultado-label">Cor resultante: {corResultante ? corResultante : '-'}</p>
            </div>
        </section>
    );
}