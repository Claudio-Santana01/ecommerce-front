import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useAuth } from '../context/AuthContext'; 
import './HamburgerMenu.css'; // Importa o CSS

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  return (
    <div className="hamburger-container">
      {/* Botão do menu hamburguer */}
      {!isOpen ? (
        <button
          className={`hamburger-button ${isOpen ? 'open' : ''}`} // Classe 'open' é adicionada quando isOpen = true
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      ) : (
        /* Menu hamburguer com animação */
        <div className={`hamburger-menu ${isOpen ? 'show' : ''}`}>
          {/* Botão de fechar */}
          <button
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          
          {/* Lista de links do menu */}
          <div className="menu-list">
            <button
              className="menu-item"
              onClick={() => {
                navigate('/home'); // Redireciona para a Home
                setIsOpen(false); // Fecha o menu
              }}
            >
              Home
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/anunciar'); // Redireciona para a rota AnunciarLivro
                setIsOpen(false); // Fecha o menu
              }}
            >
              Anunciar
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/favoritos'); // Redireciona para a rota Meus Favoritos
                setIsOpen(false); // Fecha o menu
              }}
            >
              Meus Favoritos
            </button>
            <button
              className="menu-item"
              onClick={() => {
                navigate('/top-books'); // Redireciona para a rota dos Top Livros Mais Buscados
                setIsOpen(false); // Fecha o menu
              }}
            >
              Top Livros
            </button>
          </div>
          
          {/* Botão de Logout */}
          <button
            onClick={() => {
              setIsOpen(false);
              logout(); // Realiza o logout
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
