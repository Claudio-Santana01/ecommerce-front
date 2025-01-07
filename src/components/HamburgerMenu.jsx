import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HamburgerMenu.css';

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="hamburger-container">
      {/* Botão do menu hambúrguer */}
      <button
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Menu hambúrguer */}
      {isOpen && (
        <div className={`hamburger-menu ${isOpen ? 'show' : ''}`}>
          {/* Lista de links do menu */}
          <div className="menu-list">
            <button
              className="menu-item"
              onClick={() => {
                navigate('/home');
                setIsOpen(false);
              }}
            >
              Home
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/anunciar');
                setIsOpen(false);
              }}
            >
              Anunciar Livro
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/favoritos');
                setIsOpen(false);
              }}
            >
              Meus Favoritos
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/top-books');
                setIsOpen(false);
              }}
            >
              Top Livros
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/meus-anuncios');
                setIsOpen(false);
              }}
            >
              Meus Anúncios
            </button>
          </div>

          {/* Botão de Logout */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
              navigate('/'); // Redireciona para a página de login
            }}
            className="logout-button"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
