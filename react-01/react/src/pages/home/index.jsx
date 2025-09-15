import { Link } from "react-router-dom"
import './index.css'
import Aluno from "../../components/aluno"

export default function Home() {
    return (
        <div className="pagina-home">
            <h1 className="titulo">Home</h1>
            <p>Bem vindo à Home</p>
            <p>
                <Link to='/contato'>Ir para Contato</Link>
            </p>
            <p>
                <Link to='/aluno'>Ir para a página alunos</Link>
            </p>

            <Aluno nome='Lucas M.' curso='TADS'/>
            <Aluno nome='João B.' curso='BCC'/>
        </div>
    )
}