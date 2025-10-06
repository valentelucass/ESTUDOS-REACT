import './index.css'
import React from 'react';

import Cabecalho from '../../components/cabecalho'
import Cards1 from '../../components/cards-1'
import Cards2 from '../../components/cards-2'
import Cards3 from '../../components/cards-3'
import Cards4 from '../../components/cards-4'
import Cards5 from '../../components/cards-5'
import Cards6 from '../../components/cards-6'
import Cards7 from '../../components/cards-7'
import Cards8 from '../../components/cards-8'


export default function Treinos() {
    return (
        <div className="ticket-container">
            <Cabecalho titulo="Exercícios React" />
            <Cards1 titulo="Tickets Cinemark" />
            <Cards2 titulo="Tickets Cinema" />
            <Cards3 titulo="Estimativa de Leitura" />
            <Cards4 titulo="Boletim Aluno" />
            <Cards5 titulo="Câmbio de Dólar" />
            <Cards6 titulo="Combinador de Cores Primárias" />
            <Cards7 titulo="Tabuada" />
            <Cards8 titulo="Lista de Tarefas" />

            <footer className="ticket-footer">
                <p>Site de ingressos.com - Todos os direitos reservados</p>
            </footer>
        </div>
    )
}