import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.css'



export default function Calculadora() {
    const [num1, setNumero1] = useState('');
    const [num2, setNumero2] = useState('');
    const [resultado, setResultado] = useState('');


    function alterarNumero1(e) {
        let novo = e.target.value;
        setNumero1(novo);
    }

    function alterarNumero2(e) {
        let novo = e.target.value;
        setNumero2(novo);
    }

    function somar() {
        let res = Number(num1) + Number(num2);
        setResultado(res);
    }


    return (
        <div className='page-calculadora'>
            <Cabecalho titulo="Calculadora" />

            <main>
                <h1> Calculadora </h1>

                <div className='form'>
                    <div>
                        <label> Número 01:</label>
                        <input type="text" value={num1} onChange={alterarNumero1} />
                    </div>
                    <div>
                        <label> Número 02:</label>
                        <input type="text" value={num2} onChange={alterarNumero2} />
                    </div>
                    <div>
                        <label> &nbsp; </label>
                        <p> {resultado} </p>
                    </div>
                    <div>
                        <label> &nbsp; </label>
                        <button onClick={somar}> Somar </button>
                    </div>

                </div>
                
            </main>
            
        </div>
    )
}