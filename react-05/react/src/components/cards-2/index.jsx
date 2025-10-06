import React, { useState } from "react";
import './index.css'

const PRECO_INTEIRA = 24.0;
const PRECO_MEIA = 12.0;

export default function Cards2() {
    const [quantidade, setQuantidade] = useState(0);
    const [meia, setMeia] = useState(false);
    const [total, setTotal] = useState(0);

    function calcularTotal() {
        const q = Number(quantidade) || 0;
        const valor = meia ? q * PRECO_MEIA : q * PRECO_INTEIRA;
        setTotal(valor);
    }

    return (
        <section className="ticket-section">
            <h2>Ingressos</h2>

            <input
                className="ticket-input"
                type="number"
                placeholder="Quantidade de ingressos"
                min="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />

            <label className="ticket-checkbox">
                <input
                    type="checkbox"
                    checked={meia}
                    onChange={(e) => setMeia(e.target.checked)}
                />
                Meia-entrada
            </label>

            <button className="ticket-button" onClick={calcularTotal}>
                Calcular
            </button>

            <p className="ticket-total">
                Total:{" "}
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
        </section>
    );
}
