import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/home'
import Treinos from './pages/treinos'
import Erro from './pages/erro'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/*' element={<Erro />} />
        <Route path='/treinos' element={<Treinos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
