import Cabecalho from '../../components/cabecalho';
import './index.css'
import { Link } from "react-router-dom";


export default function Home() {

    return (
        <div className='page-home'>
            <Cabecalho titulo="Home" />

            <main>
                <h1> Olá,</h1>

                <ul>
                    <li>
                        <Link to='/contato'> Contato </Link>
                    </li>
                    <li>
                        <Link to='/eventos'> Eventos </Link>
                    </li>
                    <li>
                        <Link to='/variavel'> Variável de Estado </Link>
                    </li>
                    <li>
                        <Link to='/calculadora'> Calculadora </Link>
                    </li>
                </ul>
            </main>
        </div>
    )
}