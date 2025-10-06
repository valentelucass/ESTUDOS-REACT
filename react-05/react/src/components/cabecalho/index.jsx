import './index.css'

export default function Cabecalho({ titulo }) {
    return (
        <header className="ticket-header">
            <h1>Site de ingressos.com - {titulo}</h1>
        </header>
    )
}