import { useState } from 'react'
import './index.css'

export default function ListaTarefas() {

    return (
        <div className='pagina-planos'>
            <input type="text" placeholder='Digite uma plano' />
            <input type="text" placeholder='Digite aqui a situação' />
            <input type="text" placeholder='Digite a cor' />
        </div>
    )

}