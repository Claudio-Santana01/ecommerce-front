import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import api from '../api';
import './Signup.css';

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
  const [showModal, setShowModal] = useState(false); // Controla o modal
  const navigate = useNavigate();

  // Data mínima para que o usuário tenha 16 anos
  const today = new Date();
  const maxValidDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { password, confirmPassword, dob, fullName, email, phone, address, nickname } = formData;

    // Verificar se a idade mínima foi respeitada
    const userAge = new Date().getFullYear() - new Date(dob).getFullYear();
    if (userAge < 16) {
      setError('Você precisa ter pelo menos 16 anos para se cadastrar.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (Object.values(formData).some((field) => !field)) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        name: fullName,
        email,
        password,
        phone,
        address,
        nickname,
      });
      alert('Cadastrado com sucesso!');
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
          <div className="dob-container">
            <label className="dob-label">
              Data de Nascimento
              <span className="info-icon" onClick={() => setShowModal(true)}>?</span>
            </label>
            <Input
              type="date"
              max={maxValidDate}
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="dob-container">
            <label className="dob-label-tel">
              Telefone
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="signup-input"
            />
          </div>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Data de Nascimento</h2>
            <p>Para se cadastrar, você deve ter pelo menos 16 anos.</p>
            <button onClick={() => setShowModal(false)} className="close-modal-button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
