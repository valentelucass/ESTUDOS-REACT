import './index.css'
import React, { useState } from 'react';

export default function Cards4() {
    const [nome, setNome] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [nota1, setNota1] = useState('');
    const [nota2, setNota2] = useState('');
    const [nota3, setNota3] = useState('');
    const [media, setMedia] = useState(null);
    const [situacao, setSituacao] = useState('');

    function calcularMedia() {
        if (!nome || !disciplina || !nota1 || !nota2 || !nota3) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const n1 = parseFloat(nota1);
        const n2 = parseFloat(nota2);
        const n3 = parseFloat(nota3);

        const mediaCalculada = ((n1 + n2 + n3) / 3).toFixed(1);
        setMedia(mediaCalculada);

        if (mediaCalculada >= 6) {
            setSituacao('Aprovado');
        } else {
            setSituacao('Reprovado');
        }
    }

    return (
        <section className="ticket-section">
            <h2>Boletim Aluno</h2>

            <div className="form-row">
                <input
                    className="ticket-input"
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    className="ticket-input"
                    type="text"
                    placeholder="Disciplina"
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                />
            </div>

            <div className="form-row">
                <input
                    className="ticket-input"
                    type="text"
                    placeholder="Nota 01"
                    value={nota1}
                    onChange={(e) => setNota1(e.target.value)}
                />

                <input
                    className="ticket-input"
                    type="text"
                    placeholder="Nota 02"
                    value={nota2}
                    onChange={(e) => setNota2(e.target.value)}
                />

                <input
                    className="ticket-input"
                    type="text"
                    placeholder="Nota 03"
                    value={nota3}
                    onChange={(e) => setNota3(e.target.value)}
                />
            </div>

            <div className="form-row">
                <button
                    className="ticket-button"
                    onClick={calcularMedia}
                >
                    Calcular
                </button>


            </div>

            {media !== null && (
                <div className="resultado">
                    <p>Média: {media}</p>
                    <p>Situação: {situacao}</p>
                </div>
            )}
        </section>
    )
}