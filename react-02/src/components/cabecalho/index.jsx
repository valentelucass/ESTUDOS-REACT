import './index.css'
import { Link } from 'react-router-dom'


export default function Cabecalho(props) {

    return (
        <header className='comp-cabecalho'>
            <Link to='/'>
                <i className='fa fa-arrow-left'></i>
            </Link>

            <div className='titulo'>{props.titulo}</div>
            
            <div className='direita'>Aula05</div>
        </header>
    )
}