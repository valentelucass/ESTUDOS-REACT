import React, { useState } from "react";
import './index.css'

export default function Cards5() {
    const [valorReal, setValorReal] = useState('');
    const [valorDolar, setValorDolar] = useState(null);
    const cotacaoDolar = 5.34; // Valor fixo da cotação do dólar

    const converterMoeda = () => {
        if (!valorReal || isNaN(valorReal)) {
            alert('Por favor, informe um valor válido em Real');
            return;
        }

        const valorEmDolar = (parseFloat(valorReal) / cotacaoDolar).toFixed(2);
        setValorDolar(valorEmDolar);
    };

    return (
        <section className="ticket-section">
            <h2>Câmbio de Dólar</h2>
            <p>Converta o valor de Real em Dólar.</p>
            
            <input 
                type="number" 
                className="ticket-input" 
                placeholder="Informe o valor em Real" 
                value={valorReal}
                onChange={(e) => setValorReal(e.target.value)}
            />
            
            <div className="cotacao-info">
                Valor do Dólar: R$ {cotacaoDolar.toFixed(2)}
            </div>
            
            <button 
                className="ticket-button" 
                onClick={converterMoeda}
            >
                Calcular
            </button>
            
            {valorDolar !== null && (
                <div className="resultado-conversao">
                    <p>Conversão: $ {valorDolar}</p>
                </div>
            )}
        </section>
    );
}