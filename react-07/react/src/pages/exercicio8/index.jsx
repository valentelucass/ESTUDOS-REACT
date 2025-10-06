import { useState } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import FormularioUsuario from './FormularioUsuario';
import ListagemUsuarios from './ListagemUsuarios';
import './index.scss'

export default function Exercicio8() {
    // Estado para controlar qual página está sendo exibida
    const [paginaAtual, setPaginaAtual] = useState('listagem'); // 'listagem' ou 'formulario'
    
    // Estado dos usuários
    const [usuarios, setUsuarios] = useState([]);
    
    // Estado para usuário sendo editado
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // Funções para gerenciar usuários
    const handleSalvarUsuario = (dadosUsuario) => {
        if (usuarioEditando) {
            // Editando usuário existente
            const usuariosAtualizados = usuarios.map(usuario => 
                usuario.id === usuarioEditando.id ? dadosUsuario : usuario
            );
            setUsuarios(usuariosAtualizados);
            setUsuarioEditando(null);
        } else {
            // Adicionando novo usuário
            setUsuarios([...usuarios, dadosUsuario]);
        }
        setPaginaAtual('listagem');
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setPaginaAtual('formulario');
    };

    const handleExcluirUsuario = (id) => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    };

    const handleNovoUsuario = () => {
        setUsuarioEditando(null);
        setPaginaAtual('formulario');
    };

    const handleVoltarListagem = () => {
        setUsuarioEditando(null);
        setPaginaAtual('listagem');
    };

    const handleCancelarEdicao = () => {
        setUsuarioEditando(null);
        setPaginaAtual('listagem');
    };

    return (
        <div className="exercicio-container">
            <Header titulo="exercicio8" />
            <h1 className="exercicio-title">📄 CRUD Dividido em Duas Páginas</h1>
            <p className="exercicio-subtitle">
                Sistema de gerenciamento de usuários com formulário e listagem em páginas separadas
            </p>

            {paginaAtual === 'listagem' ? (
                <ListagemUsuarios
                    usuarios={usuarios}
                    onEditar={handleEditarUsuario}
                    onExcluir={handleExcluirUsuario}
                    onNovoUsuario={handleNovoUsuario}
                />
            ) : (
                <FormularioUsuario
                    onSalvar={handleSalvarUsuario}
                    onCancelar={handleCancelarEdicao}
                    usuarioEditando={usuarioEditando}
                    onVoltar={handleVoltarListagem}
                />
            )}
        </div>
    );
}
