import './index.css';
import axios from 'axios';


function Usuarios({ usuarios, onUsuarioExcluido }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este usuário?')) return;

    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      alert('Usuário excluído!');
      onUsuarioExcluido();
    } catch (err) {
      alert('Erro ao excluir usuário: ' + (err.response?.data?.error || err.message));
      console.error(err);
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Lista de Usuários</h2>
      <ul className="usuarios-lista">
        {usuarios.map((u) => (
          <li key={u.id} className="usuarios-item">
            <div className="usuario-info">
              {u.nome} | {u.email} | CPF: {u.cpf}
            </div>
            <button
              className="botao-excluir"
              onClick={() => handleDelete(u.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
