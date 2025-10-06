import './index.css'
import Cabecalho from '../../components/cabecalho';
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
                    <li>
                        <Link to='/tabuada'> Tabuada </Link>
                    </li>
                    <li>
                        <Link to='/tarefas'> Lista de Tarefas </Link>
                    </li>
                    <li>
                        <Link to='/planos'> Meus Planos </Link>
                    </li>
                </ul>
            </main>
        </div>
    )
}