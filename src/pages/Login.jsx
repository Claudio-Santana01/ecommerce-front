import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Input from '../components/Input';
import api from '../api';
import './Login.css'; // Importando o CSS para aplicar os estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;
  
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
  
       // Verifique e salve o token no localStorage
        const token = response.data.token;
        console.log('Token recebido no login:', token); // Log para debug
        localStorage.setItem('token', token);
      
      // Chama a função de contexto para atualizar o estado do usuário logado
      login(response.data);
  
      alert('Login realizado com sucesso!');
    } catch (err) {
      console.error('Erro ao realizar login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao realizar login.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="login-container">
      <Logo className="login-logo" />
      <div className="login-form-container">
        <h1 className="login-title">Bem-vindo de volta</h1>
        <Input 
          label="Usuário" 
          type="text" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="login-input" 
        />
        <Input 
          label="Senha" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="login-input" 
        />
        <button 
          disabled={!email || !password || loading} 
          className="login-button"
          onClick={handleLogin}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          Ainda não tem uma conta? <a href="/signup">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
