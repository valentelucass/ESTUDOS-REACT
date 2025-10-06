import { Link } from 'react-router-dom'
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.scss'

export default function Home() {
    return (
        <div className="home">
            <Header />

            <main className="app-main">
                <section className="hero">
                    <h1>🚀 Laboratório de CRUDs</h1>
                    <p>
                        Explore os exercícios interativos para praticar conceitos de CRUD.
                        Cada card representa um desafio único de desenvolvimento.
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>⚡ React</span>
                        <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>🔧 CRUD</span>
                        <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>📚 Aprendizado</span>
                    </div>
                </section>

                <section className="cards">
                    <Link to="/exercicio-1" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>👤</div>
                        <div className="card-title">Exercício 01</div>
                        <div className="card-desc">
                            CRUD completo de Usuários
                        </div>
                    </Link>

                    <Link to="/exercicio-2" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📚</div>
                        <div className="card-title">Exercício 02</div>
                        <div className="card-desc">
                            CRUD completo de Livros
                        </div>
                    </Link>

                    <Link to="/exercicio-3" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎬</div>
                        <div className="card-title">Exercício 03</div>
                        <div className="card-desc">
                            CRUD completo de Filmes
                        </div>
                    </Link>

                    <Link to="/exercicio-4" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🛒</div>
                        <div className="card-title">Exercício 04</div>
                        <div className="card-desc">
                            CRUD completo de Produtos
                        </div>
                    </Link>

                    <Link to="/exercicio-5" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎉</div>
                        <div className="card-title">Exercício 05</div>
                        <div className="card-desc">
                            CRUD completo de Eventos
                        </div>
                    </Link>

                    <Link to="/exercicio-6" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🍳</div>
                        <div className="card-title">Exercício 06</div>
                        <div className="card-desc">
                            CRUD completo de Receitas
                        </div>
                    </Link>

                    <Link to="/exercicio-7" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎵</div>
                        <div className="card-title">Exercício 07</div>
                        <div className="card-desc">
                            CRUD completo de Músicas
                        </div>
                    </Link>

                    <Link to="/exercicio-8" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🐾</div>
                        <div className="card-title">Exercício 08</div>
                        <div className="card-desc">
                            CRUD completo de Pets
                        </div>
                    </Link>

                    <Link to="/exercicio-9" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚗</div>
                        <div className="card-title">Exercício 09</div>
                        <div className="card-desc">
                            CRUD completo de Carros
                        </div>
                    </Link>

                    <Link to="/exercicio-10" className="card">
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🏨</div>
                        <div className="card-title">Exercício 10</div>
                        <div className="card-desc">
                            CRUD completo de Hotéis
                        </div>
                    </Link>

                </section>
            </main>

            <Footer />
        </div>
    )
}
