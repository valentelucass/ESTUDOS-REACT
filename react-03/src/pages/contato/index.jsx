import Cabecalho from '../../components/cabecalho';
import './index.css'
import { Link } from "react-router-dom";


export default function Contato() {


    return (
        <div className='page-contato'>
            <Cabecalho titulo="Contato" />

            <main>
                <h1> Entre em contato, </h1>

                <p>
                    Telefone: (11) 9999-8888
                </p>
                <p>
                    Endereço: Av. Um, 1020
                </p>
            </main>
            
        </div>
    )
}