import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Logo from '../components/Logo';
import Input from '../components/Input';
import HamburgerMenu from '../components/HamburgerMenu'; // Importa o HamburgerMenu
import api from '../api';
import './MinhaConta.css';

const MinhaConta = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    dob: '',
    phone: '',
    isWhatsApp: false,
    nickname: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado do menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await api.get(`/api/users/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('Dados do usuário:', response.data); // Adicionado para verificar a estrutura
        setFormData((prev) => ({
          ...prev,
          fullName: response.data.fullName || response.data.name || '', // Ajusta para o campo correto
          address: response.data.address || '',
          email: response.data.email || '',
          dob: response.data.dob || '',
          phone: response.data.phone || '',
          isWhatsApp: response.data.isWhatsApp || false,
          nickname: response.data.nickname || '',
        }));
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError('Erro ao carregar dados do usuário.');
      }
    };
    fetchUserData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    console.log('Dados enviados:', formData); // Log dos dados que serão enviados
  
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      await api.put(`/api/users/${userId}`, formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Dados atualizados com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar os dados:', err.message);
      setError('Erro ao atualizar os dados.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir sua conta?');
    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      await api.delete(`/api/users/${userId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Conta excluída com sucesso!');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      setError('Erro ao excluir a conta.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="minha-conta-container">
      {/* Adiciona o HamburgerMenu */}
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Ajusta o layout para levar em conta o menu */}
      <div className={`minha-conta-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Logo className="minha-conta-logo" />
        <h1 className="minha-conta-title">Minha Conta</h1>
        <Input
          label="Nome Completo"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="minha-conta-input"
        />
        <Input
          label="Endereço"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="minha-conta-input"
        />
        <Input
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="minha-conta-input"
        />
        <div className="minha-conta-flex-container">
          <div className='tel-date'>
            <div className="dob-container">
              <label className="dob-label">Data de Nascimento</label>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="minha-conta-input"
              />
            </div>
            <div className="dob-container">
              <label className="dob-label-tel">Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
                className="minha-conta-input"
              >
                {(inputProps) => (
                  <input {...inputProps} type="tel" placeholder="Digite o telefone" />
                )}
              </InputMask>
              <div className="whatsapp-container">
                <label>
                  <input
                    type="checkbox"
                    name="isWhatsApp"
                    checked={formData.isWhatsApp}
                    onChange={handleChange}
                  />
                  Este número é WhatsApp
                </label>
              </div>
            </div>
          </div>
        </div>
        <Input
          label="Nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="minha-conta-input"
        />
        <div className="minha-conta-buttons">
          <button onClick={handleUpdate} className="update-button" disabled={loading}>
            {loading ? 'Atualizando...' : 'Atualizar Dados'}
          </button>
          <button onClick={handleDelete} className="delete-button">
            Excluir Conta
          </button>
          <button onClick={handleCancel} className="cancel-button-mc">
            Cancelar
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default MinhaConta;
