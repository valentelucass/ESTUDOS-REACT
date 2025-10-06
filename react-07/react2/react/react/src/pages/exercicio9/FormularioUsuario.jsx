import { useState, useEffect } from 'react';
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import './index.css';

export default function FormularioUsuario({ 
    onSalvar, 
    onCancelar, 
    usuarioEditando, 
    onVoltar 
}) {
    const [formData, setFormData] = useState({
        nome_completo: '',
        email: '',
        data_nascimento: '',
        ativo: false
    });

    // Preencher formulário quando estiver editando
    useEffect(() => {
        if (usuarioEditando) {
            setFormData({
                nome_completo: usuarioEditando.nome_completo,
                email: usuarioEditando.email,
                data_nascimento: usuarioEditando.data_nascimento,
                ativo: usuarioEditando.ativo
            });
        }
    }, [usuarioEditando]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (usuarioEditando) {
            // Editando usuário existente
            onSalvar({ ...formData, id: usuarioEditando.id });
            alert('Usuário atualizado com sucesso!');
        } else {
            // Adicionando novo usuário
            const novoUsuario = {
                ...formData,
                id: Date.now() // ID simples baseado no timestamp
            };
            onSalvar(novoUsuario);
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

    const handleCancelar = () => {
        setFormData({
            nome_completo: '',
            email: '',
            data_nascimento: '',
            ativo: false
        });
        if (onCancelar) {
            onCancelar();
        }
    };

    return (
        <div className="formulario-container">
            <div className="formulario-header">
                <button 
                    className="btn-voltar"
                    onClick={onVoltar}
                    title="Voltar para listagem"
                >
                    ← Voltar para Listagem
                </button>
                <h2 className="formulario-title">
                    {usuarioEditando ? '✏️ Editar Usuário' : '➕ Cadastrar Novo Usuário'}
                </h2>
            </div>

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
                        {usuarioEditando ? '💾 Atualizar' : '➕ Cadastrar'}
                    </button>
                    {usuarioEditando && (
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleCancelar}
                        >
                            ❌ Cancelar
                        </button>
                    )}
                </div>
            </form>
            <Footer />
        </div>
    );
}
