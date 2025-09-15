import Cabecalho from '../../components/cabecalho';
import './index.css'
import { Link } from "react-router-dom";
import { useState } from 'react'


export default function Eventos() {

    function alterouSelect(e) {
        let valor = e.target.value
        alert('alterou o select: ' +  valor)
    }

    function cliqueiNoBotao() {
        alert('cliquei no botão')
    }

    function mouse() {
        const [contador, setContador] = React.useState(0);
        setContador(contador + 1);
        alert('contador: ' + contador)
    }

    return (
        <div className='page-contato'>
            <Cabecalho titulo="Eventos" />

            <main>
                <h1 onClick={mouse}> Evento onClick() </h1>

                <p>
                    <label>Clique na Label</label>
                </p>
                <p>
                    <button onClick={cliqueiNoBotao}>Clique no botão</button>
                </p>

                <hr />

                <h1> Evento onMouseMove() </h1>

                <p>
                    <img src="/ti.jpg" alt="" />
                </p>


                <hr />

                <h1> Evento onChange() </h1>

                <h3>Input:Text</h3>
                <p>
                    <input type='text' />
                </p>
                <p>
                    -
                </p>

                <hr />

                <h3>Input:Checkbox</h3>
                <p>
                    <input type='checkbox' />
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