import './index.css'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="pagina-home">
            <h1>Home</h1>
            <p>Descrição da página</p>

            <form>
                <label>
                    Nome:
                    <input type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Senha:
                    <input type="password" name="password" />
                </label>
                <Link to="/contato" className='button' type='submit'>Contato</Link>
            </form>
        </div>
    )
}