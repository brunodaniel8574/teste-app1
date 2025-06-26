import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Usuarios from './Usuarios';
import Home from './home';
import Cadastro from './cadastro';
import './assets/App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const user = localStorage.getItem('usuarioLogado');
    return user ? JSON.parse(user) : null;
  });

  const carregarUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/users');
      setUsuarios(res.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (usuarioLogado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    } else {
      localStorage.removeItem('usuarioLogado');
    }
  }, [usuarioLogado]);

  const handleUsuarioCadastrado = async (novoUsuario) => {
    await carregarUsuarios();
    setUsuarioLogado(novoUsuario);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setUsuarios([]);
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/cadastro';
  };

  const handleGoToCadastro = () => {
    setUsuarioLogado(null);
    setUsuarios([]);
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/cadastro';
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Cadastro onUsuarioCadastrado={handleUsuarioCadastrado} />} />
        <Route path='/home' element={<Home usuario={usuarioLogado} onLogout={handleLogout} onGoToCadastro={handleGoToCadastro} />} />
        <Route path='/usuarios' element={<Usuarios usuarios={usuarios} onUsuarioExcluido={carregarUsuarios} />} />
        <Route path='/cadastro' element={<Cadastro onUsuarioCadastrado={handleUsuarioCadastrado} />} />
      </Routes>
    </Router>
  );
}

export default App;