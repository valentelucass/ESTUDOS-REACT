import { useState, useMemo } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css'

export default function Exercicio10() {
    // Estado dos usuários
    const [usuarios, setUsuarios] = useState([]);

    // Estado do modal
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        ativo: false
    });

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

    // Função para abrir modal para novo usuário
    const abrirModalNovo = () => {
        setUsuarioEditando(null);
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            ativo: false
        });
        setModalAberto(true);
    };

    // Função para abrir modal para editar usuário
    const abrirModalEdicao = (usuario) => {
        setUsuarioEditando(usuario);
        setFormData({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            ativo: usuario.ativo
        });
        setModalAberto(true);
    };

    // Função para fechar modal
    const fecharModal = () => {
        setModalAberto(false);
        setUsuarioEditando(null);
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            ativo: false
        });
    };

    // Função para lidar com mudanças no formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Função para submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuarioEditando) {
            // Editar usuário existente
            const usuariosAtualizados = usuarios.map(usuario =>
                usuario.id === usuarioEditando.id
                    ? { ...usuario, ...formData }
                    : usuario
            );
            setUsuarios(usuariosAtualizados);
        } else {
            // Criar novo usuário
            const novoUsuario = {
                ...formData,
                id: gerarId(),
                dataCadastro: new Date().toISOString().split('T')[0]
            };
            setUsuarios([...usuarios, novoUsuario]);
        }

        fecharModal();
    };

    // Função para excluir usuário
    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        }
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
            <Header titulo="exercicio10" />
            <h1 className="exercicio-title">🪟 CRUD com Modal</h1>
            <p className="exercicio-subtitle">
                Sistema de gerenciamento com formulário em modal
            </p>

            {/* Seção de Usuários */}
            <div className="usuarios-section">
                <div className="usuarios-header">
                    <div className="header-top">
                        <h3 className="usuarios-title">👥 Lista de Usuários ({usuariosFiltrados.length})</h3>
                        <button onClick={abrirModalNovo} className="btn btn-primary">
                            ➕ Novo Usuário
                        </button>
                    </div>

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
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefone}</td>
                                    <td>
                                        <span className={usuario.ativo ? 'status-ativo' : 'status-inativo'}>
                                            {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                                        </span>
                                    </td>
                                    <td>{usuario.dataCadastro}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                onClick={() => abrirModalEdicao(usuario)}
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
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <div className="empty-text">Nenhum usuário encontrado</div>
                        <div className="empty-subtext">
                            {usuarios.length === 0
                                ? 'Clique em "Novo Usuário" para adicionar o primeiro usuário'
                                : 'Tente ajustar os filtros para encontrar usuários'
                            }
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalAberto && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {usuarioEditando ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
                            </h2>
                            <button onClick={fecharModal} className="modal-close">
                                ✕
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
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

                            <div className="modal-actions">
                                <button type="button" onClick={fecharModal} className="btn btn-secondary">
                                    ❌ Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {usuarioEditando ? '💾 Salvar' : '➕ Adicionar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}