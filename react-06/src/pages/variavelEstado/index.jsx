import Cabecalho from '../../components/cabecalho';
import './index.css'

import { useState } from 'react';


export default function VariavelEstado() {
    const [item, setItem] = useState('');
    const [checado, setChecado] = useState(false);
    const [frase, setFrase] = useState('aaaaaaaaaaa');
    const [titulo, setTitulo] = useState('Exibindo e Alterando')
    //let titulo = 'Exibindo e Alterando'


    function alterarItem(e) {
        let novo = e.target.value;
        setItem(novo);
    }

    function alterarFrase(e) {
        let valor = e.target.value;
        setFrase(valor);
    }

    function alterarChecado(e) {
        let valor = e.target.checked;
        setChecado(valor);
    }

    function alterarTitulo() {
        setTitulo('Exibindo e Alterando (alterado)')
        //titulo = 'Exibindo e Alterando (alterado)'
    }




    return (
        <div className='page-variavel'>
            <Cabecalho titulo="Variável de Estado" />

            <main>
                <h1> {titulo} </h1>
                <p>
                    <button onClick={alterarTitulo}>Alterar</button>
                </p>

                <hr />

                

                <h1> Vinculando com Formulários </h1>

                <h3>Input:Text</h3>
                <p>
                    <input type='text' value={frase} onChange={alterarFrase} />
                </p>
                <p>
                    {frase}
                </p>
                

                <hr />

                <h3>Input:Checkbox</h3>
                <p>
                    <input type='checkbox' checked={checado} onChange={alterarChecado} />
                </p>
                <p>
                    Está checado? {checado ? 'Sim' : 'Não'}
                </p>

                <hr />

                
                <h3>Select</h3>
                <p>
                    <select value={item} onChange={alterarItem}>
                        <option>Selecione</option>
                        <option>Item A</option>
                        <option>Item B</option>
                        <option>Item C</option>
                    </select>
                </p>
                <p>
                    {item}
                </p>
                
            </main>
            
        </div>
    )
}