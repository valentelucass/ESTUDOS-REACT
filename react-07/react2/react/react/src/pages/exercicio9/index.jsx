import { useState, useMemo } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css'

export default function Exercicio9() {
    // Estado dos usuários
    const [usuarios, setUsuarios] = useState([]);
    
    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        ativo: false
    });

    // Estado para controlar qual usuário está sendo editado inline
    const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);
    const [dadosEdicao, setDadosEdicao] = useState({});

    // Estados dos filtros
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');
    const [filtroStatus, setFiltroStatus] = useState({
        ativo: false,
        inativo: false
    });
    const [filtroDropdown, setFiltroDropdown] = useState('todos');

    // Função para gerar ID único
    const gerarId = () => Date.now().toString();

    // Função para lidar com mudanças no formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Função para lidar com mudanças na edição inline
    const handleEdicaoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDadosEdicao(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Função para submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const novoUsuario = {
            ...formData,
            id: gerarId(),
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        setUsuarios([...usuarios, novoUsuario]);
        
        // Limpar formulário
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            ativo: false
        });
    };

    // Função para iniciar edição inline
    const iniciarEdicao = (usuario) => {
        setUsuarioEditandoId(usuario.id);
        setDadosEdicao({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            ativo: usuario.ativo
        });
    };

    // Função para salvar edição inline
    const salvarEdicao = () => {
        const usuariosAtualizados = usuarios.map(usuario => 
            usuario.id === usuarioEditandoId 
                ? { ...usuario, ...dadosEdicao }
                : usuario
        );
        setUsuarios(usuariosAtualizados);
        setUsuarioEditandoId(null);
        setDadosEdicao({});
    };

    // Função para cancelar edição inline
    const cancelarEdicao = () => {
        setUsuarioEditandoId(null);
        setDadosEdicao({});
    };

    // Função para excluir usuário
    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    };

    // Função para lidar com mudanças no filtro de status
    const handleStatusChange = (status) => {
        setFiltroStatus(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    // Função para lidar com mudanças no dropdown
    const handleDropdownChange = (e) => {
        setFiltroDropdown(e.target.value);
    };

    // Função para limpar filtros
    const limparFiltros = () => {
        setFiltroTexto('');
        setFiltroDataInicio('');
        setFiltroDataFim('');
        setFiltroStatus({ ativo: false, inativo: false });
        setFiltroDropdown('todos');
    };

    // Lógica de filtragem com operação OR
    const usuariosFiltrados = useMemo(() => {
        return usuarios.filter(usuario => {
            // Se nenhum filtro está ativo, mostrar todos
            const nenhumFiltroAtivo = !filtroTexto && 
                                    !filtroDataInicio && 
                                    !filtroDataFim && 
                                    !filtroStatus.ativo && 
                                    !filtroStatus.inativo && 
                                    filtroDropdown === 'todos';
            
            if (nenhumFiltroAtivo) return true;

            // Array para coletar resultados de cada filtro
            const resultadosFiltros = [];

            // Filtro de texto (nome ou email)
            if (filtroTexto) {
                const textoMatch = usuario.nome.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                                 usuario.email.toLowerCase().includes(filtroTexto.toLowerCase());
                resultadosFiltros.push(textoMatch);
            }

            // Filtro de data
            if (filtroDataInicio || filtroDataFim) {
                const dataUsuario = new Date(usuario.dataCadastro);
                let dataMatch = true;
                
                if (filtroDataInicio) {
                    dataMatch = dataMatch && dataUsuario >= new Date(filtroDataInicio);
                }
                if (filtroDataFim) {
                    dataMatch = dataMatch && dataUsuario <= new Date(filtroDataFim);
                }
                
                resultadosFiltros.push(dataMatch);
            }

            // Filtro de status
            if (filtroStatus.ativo || filtroStatus.inativo) {
                const statusMatch = (filtroStatus.ativo && usuario.ativo) || 
                                  (filtroStatus.inativo && !usuario.ativo);
                resultadosFiltros.push(statusMatch);
            }

            // Filtro dropdown
            if (filtroDropdown !== 'todos') {
                let dropdownMatch = false;
                const hoje = new Date();
                const dataUsuario = new Date(usuario.dataCadastro);
                const diasDiferenca = Math.floor((hoje - dataUsuario) / (1000 * 60 * 60 * 24));

                switch (filtroDropdown) {
                    case 'ativos':
                        dropdownMatch = usuario.ativo;
                        break;
                    case 'inativos':
                        dropdownMatch = !usuario.ativo;
                        break;
                    case 'recentes':
                        dropdownMatch = diasDiferenca <= 30;
                        break;
                }
                
                resultadosFiltros.push(dropdownMatch);
            }

            // Retorna true se qualquer filtro retornou true (operação OR)
            return resultadosFiltros.some(resultado => resultado === true);
        });
    }, [usuarios, filtroTexto, filtroDataInicio, filtroDataFim, filtroStatus, filtroDropdown]);

    return (
        <div className="exercicio-container">
            <Header titulo="exercicio9" />
            <h1 className="exercicio-title">✏️ CRUD com Edição Inline</h1>
            <p className="exercicio-subtitle">
                Sistema de gerenciamento com edição direta na tabela
            </p>

            {/* Formulário de Cadastro */}
            <form className="crud-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Telefone:</label>
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>
                
                <div className="form-checkbox">
                    <input
                        type="checkbox"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleChange}
                        className="checkbox-input"
                    />
                    <label className="form-label">Usuário Ativo</label>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        ➕ Adicionar Usuário
                    </button>
                </div>
            </form>

            {/* Seção de Usuários */}
            <div className="usuarios-section">
                <div className="usuarios-header">
                    <h3 className="usuarios-title">👥 Lista de Usuários ({usuariosFiltrados.length})</h3>
                    
                    {/* Filtros */}
                    <div className="filtros-container">
                        <div className="filtro-busca">
                            <label className="filtro-label">🔍 Buscar:</label>
                            <input
                                type="text"
                                placeholder="Digite nome ou email..."
                                value={filtroTexto}
                                onChange={(e) => setFiltroTexto(e.target.value)}
                                className="filtro-input"
                            />
                        </div>

                        <div className="filtro-datas">
                            <div className="filtro-data-grupo">
                                <label className="filtro-label">📅 Data Início:</label>
                                <input
                                    type="date"
                                    value={filtroDataInicio}
                                    onChange={(e) => setFiltroDataInicio(e.target.value)}
                                    className="filtro-input-date"
                                />
                            </div>
                            <div className="filtro-data-grupo">
                                <label className="filtro-label">📅 Data Fim:</label>
                                <input
                                    type="date"
                                    value={filtroDataFim}
                                    onChange={(e) => setFiltroDataFim(e.target.value)}
                                    className="filtro-input-date"
                                />
                            </div>
                        </div>

                        <div className="filtro-status">
                            <label className="filtro-label">📊 Status:</label>
                            <div className="checkbox-group">
                                <div className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={filtroStatus.ativo}
                                        onChange={() => handleStatusChange('ativo')}
                                        className="checkbox-filter"
                                    />
                                    <label className="checkbox-label">Ativo</label>
                                </div>
                                <div className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={filtroStatus.inativo}
                                        onChange={() => handleStatusChange('inativo')}
                                        className="checkbox-filter"
                                    />
                                    <label className="checkbox-label">Inativo</label>
                                </div>
                            </div>
                        </div>

                        <div className="filtro-dropdown">
                            <label className="filtro-label">🏷️ Categoria:</label>
                            <select
                                value={filtroDropdown}
                                onChange={handleDropdownChange}
                                className="dropdown-select"
                            >
                                <option value="todos">Todos</option>
                                <option value="ativos">Ativos</option>
                                <option value="inativos">Inativos</option>
                                <option value="recentes">Recentes (30 dias)</option>
                            </select>
                        </div>

                        <button onClick={limparFiltros} className="btn-clear-filters">
                            🗑️ Limpar Filtros
                        </button>
                    </div>
                </div>

                {usuariosFiltrados.length > 0 ? (
                    <table className="usuarios-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Status</th>
                                <th>Data Cadastro</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>
                                        {usuarioEditandoId === usuario.id ? (
                                            <input
                                                type="text"
                                                name="nome"
                                                value={dadosEdicao.nome || ''}
                                                onChange={handleEdicaoChange}
                                                className="form-input"
                                                style={{ margin: 0, padding: '8px' }}
                                            />
                                        ) : (
                                            usuario.nome
                                        )}
                                    </td>
                                    <td>
                                        {usuarioEditandoId === usuario.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={dadosEdicao.email || ''}
                                                onChange={handleEdicaoChange}
                                                className="form-input"
                                                style={{ margin: 0, padding: '8px' }}
                                            />
                                        ) : (
                                            usuario.email
                                        )}
                                    </td>
                                    <td>
                                        {usuarioEditandoId === usuario.id ? (
                                            <input
                                                type="tel"
                                                name="telefone"
                                                value={dadosEdicao.telefone || ''}
                                                onChange={handleEdicaoChange}
                                                className="form-input"
                                                style={{ margin: 0, padding: '8px' }}
                                            />
                                        ) : (
                                            usuario.telefone
                                        )}
                                    </td>
                                    <td>
                                        {usuarioEditandoId === usuario.id ? (
                                            <input
                                                type="checkbox"
                                                name="ativo"
                                                checked={dadosEdicao.ativo || false}
                                                onChange={handleEdicaoChange}
                                                className="checkbox-input"
                                            />
                                        ) : (
                                            <span className={usuario.ativo ? 'status-ativo' : 'status-inativo'}>
                                                {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                                            </span>
                                        )}
                                    </td>
                                    <td>{usuario.dataCadastro}</td>
                                    <td>
                                        <div className="table-actions">
                                            {usuarioEditandoId === usuario.id ? (
                                                <>
                                                    <button
                                                        onClick={salvarEdicao}
                                                        className="btn-edit"
                                                    >
                                                        💾 Salvar
                                                    </button>
                                                    <button
                                                        onClick={cancelarEdicao}
                                                        className="btn-secondary"
                                                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                                    >
                                                        ❌ Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => iniciarEdicao(usuario)}
                                                        className="btn-edit"
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(usuario.id)}
                                                        className="btn-delete"
                                                    >
                                                        🗑️ Excluir
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">👤</div>
                        <div className="empty-text">Nenhum usuário encontrado</div>
                        <div className="empty-subtext">
                            {usuarios.length === 0 
                                ? 'Adicione o primeiro usuário usando o formulário acima'
                                : 'Tente ajustar os filtros para encontrar usuários'
                            }
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}