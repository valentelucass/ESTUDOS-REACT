import { useState, useMemo } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css';

export default function ListagemUsuarios({ 
    usuarios, 
    onEditar, 
    onExcluir, 
    onNovoUsuario 
}) {
    // Estados dos filtros
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');
    const [filtroStatus, setFiltroStatus] = useState({
        ativo: false,
        inativo: false
    });
    const [filtroDropdown, setFiltroDropdown] = useState('todos');

    // Função para limpar todos os filtros
    const limparFiltros = () => {
        setFiltroTexto('');
        setFiltroDataInicio('');
        setFiltroDataFim('');
        setFiltroStatus({ ativo: false, inativo: false });
        setFiltroDropdown('todos');
    };

    // Função para lidar com mudanças no filtro de status
    const handleStatusFilterChange = (status) => {
        setFiltroStatus(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    // Função para lidar com mudanças no dropdown
    const handleDropdownChange = (e) => {
        setFiltroDropdown(e.target.value);
    };

    // Lógica de filtragem usando "OR" (qualquer filtro ativo pode ser verdadeiro)
    const usuariosFiltrados = useMemo(() => {
        // Verificar se algum filtro está ativo
        const temFiltroTexto = filtroTexto.trim() !== '';
        const temFiltroData = filtroDataInicio !== '' || filtroDataFim !== '';
        const temFiltroStatus = filtroStatus.ativo || filtroStatus.inativo;
        const temFiltroDropdown = filtroDropdown !== 'todos';

        // Se nenhum filtro está ativo, mostrar todos os usuários
        if (!temFiltroTexto && !temFiltroData && !temFiltroStatus && !temFiltroDropdown) {
            return usuarios;
        }

        return usuarios.filter(usuario => {
            const resultadosFiltros = [];

            // Filtro de texto (nome ou email)
            if (temFiltroTexto) {
                const textoLower = filtroTexto.toLowerCase();
                const matchTexto = usuario.nome_completo.toLowerCase().includes(textoLower) ||
                                 usuario.email.toLowerCase().includes(textoLower);
                resultadosFiltros.push(matchTexto);
            }

            // Filtro de data
            if (temFiltroData) {
                const dataNascimento = new Date(usuario.data_nascimento);
                let matchData = true;

                if (filtroDataInicio) {
                    const dataInicio = new Date(filtroDataInicio);
                    matchData = matchData && dataNascimento >= dataInicio;
                }

                if (filtroDataFim) {
                    const dataFim = new Date(filtroDataFim);
                    matchData = matchData && dataNascimento <= dataFim;
                }

                resultadosFiltros.push(matchData);
            }

            // Filtro de status
            if (temFiltroStatus) {
                const matchStatus = (filtroStatus.ativo && usuario.ativo) ||
                                  (filtroStatus.inativo && !usuario.ativo);
                resultadosFiltros.push(matchStatus);
            }

            // Filtro dropdown
            if (temFiltroDropdown) {
                let matchDropdown = false;
                const hoje = new Date();
                const trintaDiasAtras = new Date(hoje.getTime() - (30 * 24 * 60 * 60 * 1000));
                const dataNascimento = new Date(usuario.data_nascimento);

                switch (filtroDropdown) {
                    case 'ativos':
                        matchDropdown = usuario.ativo;
                        break;
                    case 'inativos':
                        matchDropdown = !usuario.ativo;
                        break;
                    case 'recentes':
                        matchDropdown = dataNascimento >= trintaDiasAtras;
                        break;
                    default:
                        matchDropdown = true;
                }

                resultadosFiltros.push(matchDropdown);
            }

            // Retorna true se qualquer filtro for verdadeiro (OR)
            return resultadosFiltros.some(resultado => resultado === true);
        });
    }, [usuarios, filtroTexto, filtroDataInicio, filtroDataFim, filtroStatus, filtroDropdown]);

    // Verificar se algum filtro está ativo para mostrar o botão de limpar
    const algumFiltroAtivo = filtroTexto !== '' || 
                           filtroDataInicio !== '' || 
                           filtroDataFim !== '' || 
                           filtroStatus.ativo || 
                           filtroStatus.inativo || 
                           filtroDropdown !== 'todos';

    const handleExcluir = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            onExcluir(id);
        }
    };

    return (
        <div className="listagem-container">
            <div className="listagem-header">
                <h2 className="listagem-title">👥 Lista de Usuários</h2>
                <button 
                    className="btn btn-primary"
                    onClick={onNovoUsuario}
                >
                    ➕ Novo Usuário
                </button>
            </div>

            {/* Seção de Filtros */}
            <div className="filtros-section">
                <h3 className="filtros-title">🔍 Filtros (Operação OU)</h3>
                
                <div className="filtros-grid">
                    {/* Filtro de Texto */}
                    <div className="filtro-grupo">
                        <label className="filtro-label">Buscar por nome ou email:</label>
                        <input
                            className="filtro-input"
                            type="text"
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                            placeholder="Digite para buscar..."
                        />
                    </div>

                    {/* Filtro de Data */}
                    <div className="filtro-grupo">
                        <label className="filtro-label">Data de nascimento:</label>
                        <div className="filtro-data-range">
                            <input
                                className="filtro-input"
                                type="date"
                                value={filtroDataInicio}
                                onChange={(e) => setFiltroDataInicio(e.target.value)}
                                placeholder="Data início"
                            />
                            <span className="data-separator">até</span>
                            <input
                                className="filtro-input"
                                type="date"
                                value={filtroDataFim}
                                onChange={(e) => setFiltroDataFim(e.target.value)}
                                placeholder="Data fim"
                            />
                        </div>
                    </div>

                    {/* Filtro de Status */}
                    <div className="filtro-grupo">
                        <label className="filtro-label">Status:</label>
                        <div className="filtro-status">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filtroStatus.ativo}
                                    onChange={() => handleStatusFilterChange('ativo')}
                                />
                                <span className="checkbox-text">✅ Ativos</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filtroStatus.inativo}
                                    onChange={() => handleStatusFilterChange('inativo')}
                                />
                                <span className="checkbox-text">❌ Inativos</span>
                            </label>
                        </div>
                    </div>

                    {/* Filtro Dropdown */}
                    <div className="filtro-grupo filtro-dropdown">
                        <label className="filtro-label">Categoria:</label>
                        <select
                            className="dropdown-select"
                            value={filtroDropdown}
                            onChange={handleDropdownChange}
                        >
                            <option value="todos">📋 Todos os Usuários</option>
                            <option value="ativos">✅ Apenas Ativos</option>
                            <option value="inativos">❌ Apenas Inativos</option>
                            <option value="recentes">🆕 Recentes (30 dias)</option>
                        </select>
                    </div>
                </div>

                {/* Botão para limpar filtros */}
                {algumFiltroAtivo && (
                    <div className="filtros-actions">
                        <button 
                            className="btn btn-secondary"
                            onClick={limparFiltros}
                        >
                            🧹 Limpar Filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Resultados */}
            <div className="resultados-info">
                <p>
                    Mostrando <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuários
                    {algumFiltroAtivo && ' (filtros ativos)'}
                </p>
            </div>

            {/* Lista de Usuários */}
            <div className="usuarios-lista">
                {usuariosFiltrados.length === 0 ? (
                    <div className="empty-state">
                        <p>😔 Nenhum usuário encontrado com os filtros aplicados.</p>
                    </div>
                ) : (
                    usuariosFiltrados.map(usuario => (
                        <div key={usuario.id} className="usuario-card">
                            <div className="usuario-info">
                                <h4 className="usuario-nome">{usuario.nome_completo}</h4>
                                <p className="usuario-email">📧 {usuario.email}</p>
                                <p className="usuario-data">🎂 {new Date(usuario.data_nascimento).toLocaleDateString('pt-BR')}</p>
                                <span className={`usuario-status ${usuario.ativo ? 'ativo' : 'inativo'}`}>
                                    {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                                </span>
                            </div>
                            <div className="usuario-actions">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => onEditar(usuario)}
                                    title="Editar usuário"
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleExcluir(usuario.id)}
                                    title="Excluir usuário"
                                >
                                    🗑️ Excluir
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}
