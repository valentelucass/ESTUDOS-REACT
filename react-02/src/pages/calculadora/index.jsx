import Cabecalho from '../../components/cabecalho';
import './index.css'
import { useState } from 'react'



export default function Calculadora() {

    const [numero1, setNumero1] = useState('')
    const [numero2, setNumero2] = useState('')
    const [resultado, setResultado] = useState('')

    function alterarNumero1(e) {
        let novo = e.target.value;
        setNumero1(novo);
    }

    function alterarNumero2(e) {
        let novo = e.target.value;
        setNumero2(novo);
    }

    function somar() {
        let res = Number(numero1) + Number(numero2);
        setResultado(res);
    }

        function subtrair() {
        let res = Number(numero1) - Number(numero2);
        setResultado(res);
    }

        function dividir() {
        let res = Number(numero1) / Number(numero2);
        setResultado(res);
    }

    function multiplicar() {
        let res = Number(numero1) * Number(numero2);
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
                        <input type="text" value={numero1} onChange={alterarNumero1} />
                    </div>
                    <div>
                        <label> Número 02:</label>
                        <input type="text" value={numero2} onChange={alterarNumero2} />
                    </div>
                    <div>
                        <label> &nbsp; </label>
                        <p> {resultado} </p>
                    </div>
                    <div>
                        <label> &nbsp; </label>
                        <button onClick={somar}> Somar </button>
                        <button onClick={subtrair}> Subtrair </button>
                        <button onClick={dividir}> Dividir </button>
                        <button onClick={multiplicar}> Multiplicar </button>
                    </div>

                </div>
                
            </main>
            
        </div>
    )
}