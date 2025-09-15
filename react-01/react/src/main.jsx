import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import App from './App.jsx'
import Home from './pages/home'
import Contato from './pages/contato'
import Erro from './pages/erro'
import Aluno from './components/aluno/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contato" element={<Contato/>} />
      <Route path="*" element={<Erro/>} />
      <Route path='/aluno' element={<Aluno/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
