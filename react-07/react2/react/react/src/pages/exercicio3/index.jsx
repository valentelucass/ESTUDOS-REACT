import { useState } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css'

export default function Exercicio3() {

    const [formData, setFormData] = useState({
        nome_completo: '',
        email: '',
        data_nascimento: '',
        ativo: false
    });

    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null);
    const [filtro, setFiltro] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFilterChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editando !== null) {
            // Editando usuário existente
            const usuariosAtualizados = usuarios.map(usuario => 
                usuario.id === editando ? { ...formData, id: editando } : usuario
            );
            setUsuarios(usuariosAtualizados);
            setEditando(null);
            alert('Usuário atualizado com sucesso!');
        } else {
            // Adicionando novo usuário
            const novoUsuario = {
                ...formData,
                id: Date.now() // ID simples baseado no timestamp
            };
            setUsuarios([...usuarios, novoUsuario]);
            alert('Usuário cadastrado com sucesso!');
        }

        // Limpar formulário
        setFormData({
            nome_completo: '',
            email: '',
            data_nascimento: '',
            ativo: false
        });
    };

    const handleEdit = (usuario) => {
        setFormData({
            nome_completo: usuario.nome_completo,
            email: usuario.email,
            data_nascimento: usuario.data_nascimento,
            ativo: usuario.ativo
        });
        setEditando(usuario.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            alert('Usuário excluído com sucesso!');
        }
    };

    // Filtrar usuários baseado no termo de busca
    const usuariosFiltrados = usuarios.filter(usuario => {
        const termoBusca = filtro.toLowerCase();
        return (
            usuario.nome_completo.toLowerCase().includes(termoBusca) ||
            usuario.email.toLowerCase().includes(termoBusca)
        );
    });

    return (
        
        <div className="exercicio-container">
            <Header titulo="exercicio3" />
            <h1 className="exercicio-title">👤 CRUD de Usuários</h1>
            <p className="exercicio-subtitle">
                Sistema completo para gerenciar usuários com operações de Criar, Ler, Atualizar e Deletar
            </p>

            <form className="crud-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Nome Completo:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="nome_completo"
                            value={formData.nome_completo}
                            onChange={handleChange}
                            required
                            placeholder="Digite o nome completo"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Digite o email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Data de Nascimento:</label>
                        <input
                            className="form-input"
                            type="date"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-checkbox">
                    <input
                        className="checkbox-input"
                        type="checkbox"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleChange}
                        id="ativo"
                    />
                    <label className="form-label" htmlFor="ativo">Usuário Ativo</label>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" type="submit">
                        {editando !== null ? '💾 Atualizar' : '➕ Cadastrar'}
                    </button>
                    {editando !== null && (
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => {
                                setEditando(null);
                                setFormData({
                                    nome_completo: '',
                                    email: '',
                                    data_nascimento: '',
                                    ativo: false
                                });
                            }}
                        >
                            ❌ Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="usuarios-section">
                <div className="usuarios-header">
                    <h3 className="usuarios-title">📊 Usuários Cadastrados ({usuariosFiltrados.length})</h3>
                    
                    {usuarios.length > 0 && (
                        <div className="filtro-container">
                            <label className="filtro-label">🔍 Buscar:</label>
                            <input
                                className="filtro-input"
                                type="text"
                                value={filtro}
                                onChange={handleFilterChange}
                                placeholder="Digite nome ou email para filtrar..."
                            />
                            {filtro && (
                                <button
                                    className="btn-clear-filter"
                                    onClick={() => setFiltro('')}
                                    title="Limpar filtro"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {usuarios.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <div className="empty-text">Nenhum usuário cadastrado</div>
                        <div className="empty-subtext">Use o formulário acima para adicionar o primeiro usuário</div>
                    </div>
                ) : usuariosFiltrados.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <div className="empty-text">Nenhum usuário encontrado</div>
                        <div className="empty-subtext">Tente ajustar o termo de busca</div>
                    </div>
                ) : (
                    <table className="usuarios-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome Completo</th>
                                <th>Email</th>
                                <th>Data de Nascimento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>#{usuario.id}</td>
                                    <td>{usuario.nome_completo}</td>
                                    <td>{usuario.email}</td>
                                    <td>{new Date(usuario.data_nascimento).toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <span style={{
                                            background: usuario.ativo ? '#d1fae5' : '#fee2e2',
                                            color: usuario.ativo ? '#065f46' : '#991b1b',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}>
                                            {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(usuario)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(usuario.id)}
                                            >
                                                🗑️ Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
}