import { useState } from 'react'
import './index.css'
import Plano from '../../components/plano'

export default function ListaPlanos() {
    
    
    return (
        <div className='pagina-planos'>
            <h1>Lista de Planos</h1>

            <div>
                <div>
                    <input type="text" placeholder='Digite um plano' />
                    <input type='text' placeholder='Digite a cor' />
                    <input type='text' placeholder='Digite a situação' />
                </div>
                <button>Adicionar Plano</button>
            </div>
            
            <br /><br />

            <div className='lista-planos'>
                <Plano />
                <Plano />
                <Plano />
                <Plano />
            </div>
            
        </div>
    )

}