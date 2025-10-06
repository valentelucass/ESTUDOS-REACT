import { Link } from 'react-router-dom'
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css'

export default function Erro() {
    return (
        <div className="error-wrapper">
            <div className="error-card">
                <h2>Página não encontrada</h2>
                <p>A rota acessada não existe. Volte para a página inicial.</p>
                <Link to="/" className="btn">Ir para Home</Link>
            </div>
            <Footer />
        </div>
    )
}