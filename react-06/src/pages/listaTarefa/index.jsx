import { useState } from 'react'
import './index.css'

export default function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    function adicionarTarefa() {
        setTarefas([...tarefas, novaTarefa]);
        setNovaTarefa('');
    }

    function excluirTarefa(pos) {
        tarefas.splice(pos, 1);
        setTarefas([...tarefas]);
    }


    return (
        <div className='pagina-tarefas'>
            <h1>Lista de Tarefas</h1>

            <input type="text" placeholder='Digite uma tarefa' value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} />
            <button onClick={adicionarTarefa}>Adicionar Tarefa</button>

            
            <h3> Tarefas:</h3>
            <div>
                {tarefas.map((item, pos) => 
                    <p> {item} <button onClick={() => excluirTarefa(pos)}>excluir</button> </p>
                )}
            </div>

            
        </div>
    )

}