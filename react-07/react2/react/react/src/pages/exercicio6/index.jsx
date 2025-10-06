import { useState } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css'

export default function Exercicio6() {

    const [formData, setFormData] = useState({
        nome_completo: '',
        email: '',
        data_nascimento: '',
        ativo: false
    });

    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');
    const [filtroStatus, setFiltroStatus] = useState({
        mostrarAtivos: true,
        mostrarInativos: true
    });
    const [filtroDropdown, setFiltroDropdown] = useState('todos');

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

    const handleDataInicioChange = (e) => {
        setFiltroDataInicio(e.target.value);
    };

    const handleDataFimChange = (e) => {
        setFiltroDataFim(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        const { name, checked } = e.target;
        setFiltroStatus(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleDropdownChange = (e) => {
        setFiltroDropdown(e.target.value);
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

    const limparFiltros = () => {
        setFiltro('');
        setFiltroDataInicio('');
        setFiltroDataFim('');
        setFiltroStatus({
            mostrarAtivos: true,
            mostrarInativos: true
        });
        setFiltroDropdown('todos');
    };

    // Filtrar usuários baseado no termo de busca, intervalo de datas, status e dropdown
    const usuariosFiltrados = usuarios.filter(usuario => {
        const termoBusca = filtro.toLowerCase();
        const nomeOuEmailMatch = (
            usuario.nome_completo.toLowerCase().includes(termoBusca) ||
            usuario.email.toLowerCase().includes(termoBusca)
        );

        // Filtro por intervalo de datas
        let dataMatch = true;
        if (filtroDataInicio || filtroDataFim) {
            const dataNascimento = new Date(usuario.data_nascimento);
            
            if (filtroDataInicio) {
                const dataInicio = new Date(filtroDataInicio);
                if (dataNascimento < dataInicio) {
                    dataMatch = false;
                }
            }
            
            if (filtroDataFim) {
                const dataFim = new Date(filtroDataFim);
                if (dataNascimento > dataFim) {
                    dataMatch = false;
                }
            }
        }

        // Filtro por status (ativo/inativo)
        let statusMatch = false;
        if (filtroStatus.mostrarAtivos && usuario.ativo) {
            statusMatch = true;
        }
        if (filtroStatus.mostrarInativos && !usuario.ativo) {
            statusMatch = true;
        }

        // Filtro por dropdown
        let dropdownMatch = true;
        if (filtroDropdown === 'ativos') {
            dropdownMatch = usuario.ativo;
        } else if (filtroDropdown === 'inativos') {
            dropdownMatch = !usuario.ativo;
        } else if (filtroDropdown === 'recentes') {
            // Usuários cadastrados nos últimos 30 dias
            const dataAtual = new Date();
            const dataLimite = new Date(dataAtual.getTime() - (30 * 24 * 60 * 60 * 1000));
            const dataNascimento = new Date(usuario.data_nascimento);
            dropdownMatch = dataNascimento >= dataLimite;
        }
        // Para 'todos', dropdownMatch permanece true

        return nomeOuEmailMatch && dataMatch && statusMatch && dropdownMatch;
    });

    return (
        
        <div className="exercicio-container">
            <Header titulo="exercicio6" />
            <h1 className="exercicio-title">👤 CRUD de Usuários com Filtro Dropdown</h1>
            <p className="exercicio-subtitle">
                Sistema completo para gerenciar usuários com filtros avançados incluindo dropdown para categorização
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
                        <div className="filtros-container">
                            <div className="filtro-busca">
                                <label className="filtro-label">🔍 Buscar:</label>
                                <input
                                    className="filtro-input"
                                    type="text"
                                    value={filtro}
                                    onChange={handleFilterChange}
                                    placeholder="Digite nome ou email..."
                                />
                            </div>
                            
                            <div className="filtro-datas">
                                <div className="filtro-data-grupo">
                                    <label className="filtro-label">📅 Data Início:</label>
                                    <input
                                        className="filtro-input-date"
                                        type="date"
                                        value={filtroDataInicio}
                                        onChange={handleDataInicioChange}
                                    />
                                </div>
                                
                                <div className="filtro-data-grupo">
                                    <label className="filtro-label">📅 Data Fim:</label>
                                    <input
                                        className="filtro-input-date"
                                        type="date"
                                        value={filtroDataFim}
                                        onChange={handleDataFimChange}
                                    />
                                </div>
                            </div>

                            <div className="filtro-status">
                                <label className="filtro-label">🎯 Filtrar por Status:</label>
                                <div className="checkbox-group">
                                    <div className="checkbox-item">
                                        <input
                                            className="checkbox-filter"
                                            type="checkbox"
                                            name="mostrarAtivos"
                                            checked={filtroStatus.mostrarAtivos}
                                            onChange={handleStatusFilterChange}
                                            id="mostrarAtivos"
                                        />
                                        <label className="checkbox-label" htmlFor="mostrarAtivos">
                                            ✅ Mostrar Ativos
                                        </label>
                                    </div>
                                    
                                    <div className="checkbox-item">
                                        <input
                                            className="checkbox-filter"
                                            type="checkbox"
                                            name="mostrarInativos"
                                            checked={filtroStatus.mostrarInativos}
                                            onChange={handleStatusFilterChange}
                                            id="mostrarInativos"
                                        />
                                        <label className="checkbox-label" htmlFor="mostrarInativos">
                                            ❌ Mostrar Inativos
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="filtro-dropdown">
                                <label className="filtro-label">📋 Categoria:</label>
                                <select
                                    className="dropdown-select"
                                    value={filtroDropdown}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="todos">👥 Todos os Usuários</option>
                                    <option value="ativos">✅ Apenas Ativos</option>
                                    <option value="inativos">❌ Apenas Inativos</option>
                                    <option value="recentes">🆕 Recentes (30 dias)</option>
                                </select>
                            </div>
                            
                            {(filtro || filtroDataInicio || filtroDataFim || !filtroStatus.mostrarAtivos || !filtroStatus.mostrarInativos || filtroDropdown !== 'todos') && (
                                <button
                                    className="btn-clear-filters"
                                    onClick={limparFiltros}
                                    title="Limpar todos os filtros"
                                >
                                    🗑️ Limpar Filtros
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
                        <div className="empty-subtext">Tente ajustar os filtros de busca</div>
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