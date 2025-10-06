import React, { useState } from "react";
import './index.css'

export default function Cards8() {
    const [tarefa, setTarefa] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

    const adicionarTarefa = () => {
        if (!tarefa.trim()) {
            alert('Por favor, descreva uma tarefa');
            return;
        }

        setListaTarefas([...listaTarefas, tarefa]);
        setTarefa('');
    };

    const excluirTarefa = (index) => {
        const novaLista = [...listaTarefas];
        novaLista.splice(index, 1);
        setListaTarefas(novaLista);
    };

    return (
        <section className="ticket-section">
            <h2>Lista de Tarefas</h2>

            <div className="tarefa-form">
                <div className="input-group">
                    <input
                        type="text"
                        className="ticket-input"
                        placeholder="Descreva a Tarefa"
                        value={tarefa}
                        onChange={(e) => setTarefa(e.target.value)}
                    />

                    <button
                        className="adicionar-button"
                        onClick={adicionarTarefa}
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            <div className="lista-tarefas">
                <ul>
                    {listaTarefas.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button
                                className="excluir-link"
                                onClick={() => excluirTarefa(index)}
                            >
                                excluir
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}