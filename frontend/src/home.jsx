import { Link } from 'react-router-dom';
import './home.css';

function Home({ usuario, onLogout, onGoToCadastro }) {
  return (
    <div className="home-container">
      <h1>Página Inicial</h1>
      <h2>Bem-vindo{usuario?.nome ? `, ${usuario.nome}` : ''}!</h2>
      <p>Escolha uma das opções abaixo:</p>

      <div className="home-buttons">
        <button className="home-btn" onClick={onGoToCadastro}>
          Ir para cadastro
        </button>
        <Link to="/usuarios">
          <button className="btn-home">Ver usuários</button>
        </Link>
        {usuario && (
          <button
            className="btn-destroy"
            type="button"
            onClick={onLogout}
            style={{ background: '#e53935', color: '#fff', marginLeft: '10px' }}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
