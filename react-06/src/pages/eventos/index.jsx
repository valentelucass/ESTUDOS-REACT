import Cabecalho from '../../components/cabecalho';
import './index.css'


export default function Eventos() {

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
                    <input type='text' onChange={alterouInput} />
                </p>
                <p>
                    -
                </p>

                <hr />

                <h3>Input:Checkbox</h3>
                <p>
                    <input type='checkbox' onChange={alterouCheckbox} />
                </p>
                <p>
                    -
                </p>

                <hr />

                
                <h3>Select</h3>
                <p>
                    <select onChange={alterouSelect}>
                        <option>Selecione</option>
                        <option>Item A</option>
                        <option>Item B</option>
                        <option>Item C</option>
                    </select>
                </p>
                <p>
                    -
                </p>
                
            </main>
            
        </div>
    )
}