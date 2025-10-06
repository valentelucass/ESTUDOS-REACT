import { useState } from 'react'
import './index.css'

export default function Tabuada() {
    const [tabuada, setTabuada] = useState([]);
    const [num, setNum] = useState('');

    function gerarTabuada() {
        let novaTabuada = [];
        for (let i = 0; i <= 10; i++) {
            novaTabuada.push(num * i);
        }
        
        setTabuada(novaTabuada);
    }


    return (
        <div className='pagina-tabuada'>
            <h1>Tabuada</h1>

            <input type="number" placeholder='Digite um número' value={num} onChange={e => setNum(e.target.value)} />
            <button onClick={gerarTabuada}>Gerar Tabuada</button>

            <div>
                {tabuada.map((item,pos) => 
                    <p> {num} x {pos} = {item} </p>
                )}

            </div>
        </div>
    )

}