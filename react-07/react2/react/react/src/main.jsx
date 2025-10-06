import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/index.jsx'
import Erro from './pages/erro/index.jsx'
import Exercicio1 from './pages/exercicio1/index.jsx'
import Exercicio2 from './pages/exercicio2/index.jsx'
import Exercicio3 from './pages/exercicio3/index.jsx'
import Exercicio4 from './pages/exercicio4/index.jsx'
import Exercicio5 from './pages/exercicio5/index.jsx'
import Exercicio6 from './pages/exercicio6/index.jsx'
import Exercicio7 from './pages/exercicio7/index.jsx'
import Exercicio8 from './pages/exercicio8/index.jsx'
import Exercicio9 from './pages/exercicio9/index.jsx'
import Exercicio10 from './pages/exercicio10/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercicio-1" element={<Exercicio1 />} />
        <Route path="/exercicio-2" element={<Exercicio2 />} />
        <Route path="/exercicio-3" element={<Exercicio3 />} />
        <Route path="/exercicio-4" element={<Exercicio4 />} />
        <Route path="/exercicio-5" element={<Exercicio5 />} />
        <Route path="/exercicio-6" element={<Exercicio6 />} />
        <Route path="/exercicio-7" element={<Exercicio7 />} />
        <Route path="/exercicio-8" element={<Exercicio8 />} />
        <Route path="/exercicio-9" element={<Exercicio9 />} />
        <Route path="/exercicio-10" element={<Exercicio10 />} />
        <Route path="*" element={<Erro />} />  // ← Rota catch-all
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
