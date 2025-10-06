import { useState } from 'react';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.scss';

export default function Exercicio1() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    data_nascimento: '',
    ativo: false,
  });

  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editando !== null) {
      const usuariosAtualizados = usuarios.map((usuario) =>
        usuario.id === editando ? { ...formData, id: editando } : usuario
      );
      setUsuarios(usuariosAtualizados);
      setEditando(null);
      alert('Usuário atualizado com sucesso!');
    } else {
      const novoUsuario = { ...formData, id: Date.now() };
      setUsuarios([...usuarios, novoUsuario]);
      alert('Usuário cadastrado com sucesso!');
    }

    setFormData({
      nome_completo: '',
      email: '',
      data_nascimento: '',
      ativo: false,
    });
  };

  const handleEdit = (usuario) => {
    setFormData({
      nome_completo: usuario.nome_completo,
      email: usuario.email,
      data_nascimento: usuario.data_nascimento,
      ativo: usuario.ativo,
    });
    setEditando(usuario.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      alert('Usuário excluído com sucesso!');
    }
  };

  return (
    <div className="exercicio1">
      <Header titulo="Exercicio1" />

      <h1>👤 CRUD de Usuários</h1>
      <p>
        Sistema completo para gerenciar usuários com operações de Criar, Ler, Atualizar e Deletar
      </p>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="nome_completo">Nome Completo:</label>
            <input
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              required
              placeholder="Digite o nome completo"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Digite o email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="ativo"
            checked={formData.ativo}
            onChange={handleChange}
            id="ativo"
          />
          <label htmlFor="ativo">Usuário Ativo</label>
        </div>

        <div className="buttons">
          <button type="submit">
            {editando !== null ? '💾 Atualizar' : '➕ Cadastrar'}
          </button>
          {editando !== null && (
            <button
              type="button"
              onClick={() => {
                setEditando(null);
                setFormData({
                  nome_completo: '',
                  email: '',
                  data_nascimento: '',
                  ativo: false,
                });
              }}
            >
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="usuarios">
        <h3>📊 Usuários Cadastrados ({usuarios.length})</h3>

        {usuarios.length === 0 ? (
          <div className="vazio">
            <div>📭</div>
            <div>Nenhum usuário cadastrado</div>
            <div>Use o formulário acima para adicionar o primeiro usuário</div>
          </div>
        ) : (
          <table>
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
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>#{usuario.id}</td>
                  <td>{usuario.nome_completo}</td>
                  <td>{usuario.email}</td>
                  <td>{new Date(usuario.data_nascimento).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <span
                      style={{
                        background: usuario.ativo ? '#d1fae5' : '#fee2e2',
                        color: usuario.ativo ? '#065f46' : '#991b1b',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                      }}
                    >
                      {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="acoes">
                      <button onClick={() => handleEdit(usuario)}>✏️ Editar</button>
                      <button onClick={() => handleDelete(usuario.id)}>🗑️ Excluir</button>
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
