import './index.css'
import React from 'react';

export default function Cards1() {
    function calcularTotal() {
        const qtdInteira = document.getElementById('qtdInteira').value
        const qtdMeia = document.getElementById('qtdMeia').value
        const total = qtdInteira * 20 + qtdMeia * 10
        document.getElementById('total').innerHTML = `Total: R$ ${total},00`
    }
    return (
        <section className="ticket-section">
            <h2>Tickets Cinemark</h2>
            <input id="qtdInteira" className="ticket-input" type="number" placeholder="Quantidade de ingressos 'Inteira'" min="0" />
            <input id="qtdMeia" className="ticket-input" type="number" placeholder="Quantidade de ingressos 'Meia'" min="0" />
            <button className="ticket-button" onClick={calcularTotal}>Comprar</button>
            <p id="total" className="ticket-total">Total: R$ 0,00</p>
        </section>
    )
}