import Cabecalho from '../../components/cabecalho';
import './index.css'



export default function VariavelEstado() {


    return (
        <div className='page-variavel'>
            <Cabecalho titulo="Variável de Estado" />

            <main>
                <h1> Exibindo e Alterando </h1>

                <p>
                    Olá
                </p>
                <p>
                    <button>Alterar</button>
                </p>

                <hr />

                

                <h1> Vinculando com Formulários </h1>

                <h3>Input:Text</h3>
                <p>
                    <input type='text' />
                </p>
                <p>
                    -
                </p>

                <hr />

                <h3>Input:Checkbox</h3>
                <p>
                    <input type='checkbox' />
                </p>
                <p>
                    -
                </p>

                <hr />

                
                <h3>Select</h3>
                <p>
                    <select>
                        <option>Selecione</option>
                        <option>Item A</option>
                        <option>Item B</option>
                        <option>Item C</option>
                    </select>
                </p>
                <p>
                    -
                </p>
                
            </main>
            
        </div>
    )
}