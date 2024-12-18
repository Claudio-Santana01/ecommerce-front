import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import api from '../api';
import './Signup.css'; // Importando o CSS para aplicar os estilos

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    dob: '',
    phone: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Obter a data atual no formato adequado para o atributo `max`
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (Object.values(formData).some((field) => !field)) return;

    setLoading(true);
    try {
      await api.post('/api/auth/register', { name: formData.fullName, email: formData.email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Logo className="signup-logo" />
      <div className="signup-form-container">
        <h1 className="signup-title">Crie sua conta</h1>
        <Input 
          label="Nome Completo" 
          type="text" 
          name="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
          className="signup-input" 
        />
        <Input 
          label="Endereço" 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          className="signup-input" 
        />
        <Input 
          label="E-mail" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="signup-input" 
        />
        <div className="signup-flex-container">
          <Input 
            label="Data Nascimento" 
            max={today} 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            className="signup-input" 
          />
          <Input 
            label="Telefone" 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="signup-input" 
          />
        </div>
        <Input 
          label="Nickname" 
          type="text" 
          name="nickname" 
          value={formData.nickname} 
          onChange={handleChange} 
          className="signup-input" 
        />
        <div className="signup-flex-container">
          <Input 
            label="Senha" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="signup-input" 
          />
          <Input 
            label="Repita a Senha" 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            className="signup-input" 
          />
        </div>
        <button
          disabled={Object.values(formData).some((field) => !field) || loading}
          className="signup-button"
          onClick={handleSignup}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Já tem cadastro? <a href="/" className="login-link">Faça o login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
