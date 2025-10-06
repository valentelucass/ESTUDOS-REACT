import React, { useState } from "react";
import './index.css'

export default function Cards7() {
    const [numero, setNumero] = useState('');
    const [tabuada, setTabuada] = useState([]);

    const calcularTabuada = () => {
        if (!numero || isNaN(numero)) {
            alert('Por favor, informe um número válido');
            return;
        }

        const num = parseInt(numero);
        const novaTabuada = [];

        for (let i = 0; i <= 10; i++) {
            novaTabuada.push(`${num} × ${i} = ${num * i}`);
        }

        setTabuada(novaTabuada);
    };

    return (
        <section className="ticket-section">
            <h2>Tabuada</h2>

            <div className="tabuada-form">
                <div className="input-group">
                    <input
                        type="text"
                        className="ticket-input"
                        placeholder="Informe um número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />

                    <button
                        className="ok-button"
                        onClick={calcularTabuada}
                    >
                        OK
                    </button>
                </div>
            </div>

            <div className="resultado-tabuada">
                {tabuada.map((linha, index) => (
                    <p key={index}>{linha}</p>
                ))}
            </div>
        </section>
    );
}