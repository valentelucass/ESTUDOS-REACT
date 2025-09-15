import Cabecalho from '../../components/cabecalho';
import './index.css'
import { useState } from 'react';


export default function Eventos() {
    const [texto, setTexto] = useState('');
    const [marcado, setMarcado] = useState(false);
    const [opcao, setOpcao] = useState('');

    function clicouBotao() {
        alert('clicou no botão!');
    }

    function clicouLabel() {
        alert('clicou na label')
    }

    function moveuMouse() {
        alert('moveu o mouse em cima da imagem')
    }

    function alterouInput(e) {
        let valor = e.target.value;
        alert('alterou o input: ' + valor);
    }

    function alterouCheckbox(e) {
        let check = e.target.checked;
        alert('alterou o checkbox: ' + check);
    }

    function alterouSelect(e) {
        let valor = e.target.value;
        alert('alterou o select: ' + valor)
    }

    return (
        <div className='page-contato'>
            <Cabecalho titulo="Eventos" />

            <main>
                <h1> Evento onClick() </h1>

                <p>
                    <label onClick={clicouLabel}>Clique na Label</label>
                </p>
                <p>
                    <button onClick={clicouBotao}>Clique no botão</button>
                </p>

                <hr />

                <h1> Evento onMouseMove() </h1>

                <p>
                    <img onMouseMove={moveuMouse} src="/ti.jpg" alt="" />
                </p>


                <hr />

                <h1> Evento onChange() </h1>

                <h3>Input:Text</h3>
                <p>
                    <input type='text' onChange={(e) => setTexto(e.target.value)} />
                    
                </p>
                
                <p>
                    - {texto}
                </p>

                <hr />

                <h3>Input:Checkbox</h3>
                <p>
                    <input type='checkbox' onChange={(e) => setMarcado(e.target.checked)} />
                </p>
                <p>
                    - {marcado ? 'Marcado' : 'Desmarcado'}
                </p>

                <hr />

                
                <h3>Select</h3>
                <p>
                    <select onChange={(e) => setOpcao(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="a">Item A</option>
                        <option value="b">Item B</option>
                        <option value="c">Item C</option>
                    </select>
                </p>
                <p>
                    - Você selecionou: {opcao}
                </p>
                
            </main>
            
        </div>
    )
}