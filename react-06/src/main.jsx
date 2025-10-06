import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Contato from './pages/contato'
import Eventos from './pages/eventos'
import VariavelEstado from './pages/variavelEstado'
import Calculadora from './pages/calculadora'
import Tabuada from './pages/tabuada'
import ListaTarefas from './pages/listaTarefa'
import ListaPlanos from './pages/meusPlanos'
import Filmes from './pages/filmes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contato' element={<Contato />} />
        <Route path='/eventos' element={<Eventos />} />
        <Route path='/variavel' element={<VariavelEstado />} />
        <Route path='/calculadora' element={<Calculadora />} />
        <Route path='/tabuada' element={<Tabuada />} />
        <Route path='/tarefas' element={<ListaTarefas />} />
        <Route path='/planos' element={<ListaPlanos />} />
        <Route path='/filmes' element={<Filmes />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
