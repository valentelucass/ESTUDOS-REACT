import React, { useState } from "react";
import './index.css'

export default function Cards3() {
    const [nome, setNome] = useState("");
    const [livro, setLivro] = useState("");
    const [paginas, setPaginas] = useState("");
    const [segundosPorPagina, setSegundosPorPagina] = useState("");
    const [resultado, setResultado] = useState("");

    const calcularTempoLeitura = () => {
        if (!nome || !livro || !paginas || !segundosPorPagina) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        const totalPaginas = parseInt(paginas);
        const tempoPorPagina = parseInt(segundosPorPagina);
        const totalSegundos = totalPaginas * tempoPorPagina;
        const totalHoras = (totalSegundos / 3600).toFixed(2);

        setResultado(`${nome}, você finalizará a leitura do livro ${livro} em aproximadamente ${totalHoras} horas.`);
    };

    return (
        <section className="ticket-section">
            <h2>Você lê rápido?</h2>
            <p>Faça um programa que calcule o tempo que um livro será lido por uma pessoa 
                a partir do nome do livro, do total de páginas e do tempo em segundos de leitura por página.</p><br></br>
            
            <input 
                type="text" 
                className="ticket-input" 
                placeholder="Nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
            
            <input 
                type="text" 
                className="ticket-input" 
                placeholder="Livro" 
                value={livro} 
                onChange={(e) => setLivro(e.target.value)} 
            />
            
            <input 
                type="number" 
                className="ticket-input" 
                placeholder="Qtd. de páginas" 
                value={paginas} 
                onChange={(e) => setPaginas(e.target.value)} 
            />
            
            <input 
                type="number" 
                className="ticket-input" 
                placeholder="Segundos por página" 
                value={segundosPorPagina} 
                onChange={(e) => setSegundosPorPagina(e.target.value)} 
            />
            
            <button className="ticket-button" onClick={calcularTempoLeitura}>
                Calcular
            </button>
            
            {resultado && <div className="ticket-total">{resultado}</div>}
        </section>
    )
}
