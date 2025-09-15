import { Link } from "react-router-dom"
import './index.css'

export default function Contato() {
    return (
        <div className="pagina-home">
            <h1 className="titulo">Contato</h1>
            <p>Bem vindo a página de contato</p>
            <p>
                <Link to='/home'>Ir para Home</Link>
            </p>
        </div>
    )
}