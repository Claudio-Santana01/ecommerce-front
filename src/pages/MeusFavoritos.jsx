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

  const didFetch = React.useRef(false);
  useEffect(() => {
    const fetchFavoritos = async () => {

      if (didFetch.current) return; // Se já executou, não faz nada
      didFetch.current = true;

      try {
        const response = await api.get('/api/users/favorites', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setFavoritos(response.data); // Salva os favoritos com todos os detalhes, incluindo imageUrl
      } catch (err) {
        setError('Erro ao carregar favoritos.');
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, []);

  const handleUnfavorite = async (bookId) => {
    try {
      const response = await api.post(
        '/api/users/unfavorite',
        { bookId },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      setFavoritos((prev) => prev.filter((book) => book._id !== bookId)); // Remove o livro da lista
      alert(response.data.message || 'Livro removido dos favoritos com sucesso!');
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      alert('Erro ao remover livro dos favoritos.');
    }
  };

  return (
    <div className="favoritos-container">
      <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

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
                <div className="favoritos-card-image-container">
                  {book.imageUrl ? (
                    <img
                      src={`http://localhost:8080${book.imageUrl}`} // URL completa para o backend
                      alt={book.title}
                      className="favoritos-card-image"
                    />
                  ) : (
                    <img
                      src={
                        'https://www.moveisdoportinho.com.br/v2.1/ui/fotosprincipal/imagens/imagens/produto-sem-imagem.png'
                      } // Imagem padrão
                      alt={book.title}
                      className="favoritos-card-image"
                    />
                  )}
                </div>
                <div className="favoritos-card-content">
                  <h2>{book.title}</h2>
                  <p>
                    <strong>Autor:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Editora:</strong> {book.publisher}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$
                    {book.price ? Number(book.price).toFixed(2) : '0.00'}
                  </p>
                </div>
                <button
                  className="unfavorite-button"
                  onClick={() => handleUnfavorite(book._id)}
                >
                  Remover 
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusFavoritos;
