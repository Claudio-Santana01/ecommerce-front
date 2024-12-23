import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import HamburgerMenu from '../components/HamburgerMenu';
import api from '../api';
import './MeusFavoritos.css';

const MeusFavoritos = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await api.get('/api/users/favorite', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setFavoritos(response.data);
      } catch (err) {
        setError('Erro ao carregar favoritos.');
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, []);
  

  return (
    <div className="favoritos-container">
      {/* Menu Hamburguer */}
      <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Conteúdo principal */}
      <div className={`favoritos-content ${isMenuOpen ? 'menu-open' : ''}`}>
        <Logo className="favoritos-logo" />
        <h1 className="favoritos-title">Meus Favoritos</h1>
        {loading ? (
          <div className="favoritos-loading">Carregando...</div>
        ) : error ? (
          <div className="favoritos-error">{error}</div>
        ) : (
          <div className="favoritos-card-grid">
            {favoritos.map((book) => (
              <div key={book._id} className="favoritos-card">
                <h2>{book.title}</h2>
                <p><strong>Autor:</strong> {book.author}</p>
                <p><strong>Gênero:</strong> {book.genre}</p>
                <p><strong>Editora:</strong> {book.publisher}</p>
                <p><strong>Preço:</strong> R${book.price ? Number(book.price).toFixed(2) : '0.00'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusFavoritos;
