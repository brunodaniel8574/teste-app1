import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';  // Supondo que o CSS esteja aqui

function Cadastro({ onUsuarioCadastrado }) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cpf: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/register', form);

      const novoUsuario = { nome: form.nome }; // Pegando o nome para mostrar no home
      if (onUsuarioCadastrado) {
        await onUsuarioCadastrado(novoUsuario);
      }

      setForm({ nome: '', email: '', senha: '', cpf: '' });
      setLoading(false);

      alert('Usuário cadastrado!');
      navigate('/home');
    } catch (err) {
      setLoading(false);
      const mensagemErro = err.response?.data?.message || err.message;
      alert('Erro ao cadastrar: ' + mensagemErro);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-cadastro">
      <h2>Cadastro</h2>
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="senha"
        type="password"
        placeholder="Senha"
        value={form.senha}
        onChange={handleChange}
        required
      />
      <input
        name="cpf"
        placeholder="CPF"
        value={form.cpf}
        onChange={handleChange}
        required
      />
      <div className="botoes-cadastro">
        <button
          className={`btn-animado ${loading ? 'btn-loading' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span className="loading-text">Cadastrando</span>
            </>
          ) : (
            'Cadastrar'
          )}
        </button>
      </div>
    </form>
  );
}

export default Cadastro;
