import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import './HamburgerMenu.css';

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="hamburger-container">
      {/* Hamburger button */}
      <button
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Hamburger menu */}
      {isOpen && (
        <div className={`hamburger-menu ${isOpen ? 'show' : ''}`}>
          {/* Menu list */}
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
            {/*  "Minha Conta" opção nova */}
            <button
              className="menu-item"
              onClick={() => {
                navigate('/minha-conta');
                setIsOpen(false);
              }}
            >
              <FaUserCircle className="menu-icon" /> Minha Conta
            </button>
          </div>

          {/* Logout button */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
              navigate('/'); // Redirect to login page
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
