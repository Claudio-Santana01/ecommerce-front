import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import './Home.css'; // Importa o CSS
import Logo from '../components/Logo'; // Importe o componente Logo
import api from "../api";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleFavorite = async (bookId) => {
    try {
      // Verifique e log os dados antes de enviar a requisição
      const token = localStorage.getItem('token');
      console.log('Book ID:', bookId);
      console.log('Token JWT:', token);

      if (!token) {
        alert('Você precisa estar logado para favoritar um livro.');
        return;
      }

      // Enviar requisição para favoritar o livro
      const response = await api.post(
        '/api/users/favorite',
        { bookId }, // Corpo da requisição
        {
          headers: {
            'x-auth-token': token, // Cabeçalho com o token
          },
        }
      );

      // Verifique a resposta e notifique o usuário
      console.log('Resposta da API:', response.data);
      alert('Livro favoritado com sucesso!');
    } catch (error) {
      // Exibir mensagens de erro detalhadas para facilitar o debug
      console.error('Erro ao favoritar o livro:', error.response?.data || error.message);
      alert(
        `Erro ao favoritar o livro: ${
          error.response?.data?.message || 'Erro desconhecido'
        }`
      );
    }
  };

  const handleCardClick = (id) => {
    window.location.href = `/contact/${id}`; // Redireciona para a página de contato
    console.log('Redirecionando para o livro com ID:', id);

  };

  return (
    <div className="home-container">
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`home-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* A linha abaixo utiliza o componente Logo */}
        <Logo />

        <h1 className="home-title">Bem-vindo à Home</h1>

        {loading ? (
          <p className="home-loading">Carregando livros...</p>
        ) : (
          <div className='home-card-grid-container'>
            <div className="home-card-grid">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="home-card"
                  onClick={() => handleCardClick(book._id)}
                >
                  <div className="home-card-image-container">
                    {book.imageUrl ? (
                      <img
                        src={`http://localhost:8080${book.imageUrl}`} // Adicione o domínio do backend
                        alt={book.title}
                        className="home-card-image"
                      />
                    ) : (
                      <div className="home-card-no-image">Sem imagem</div>
                    )}
                  </div>
                  <div className="home-card-content">
                    <h3 className="home-card-title">{book.title}</h3>
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>Gênero:</strong> {book.genre}</p>
                    <p><strong>Editora:</strong> {book.publisher}</p>
                    <p><strong>Preço:</strong> R${book.price ? Number(book.price).toFixed(2) : '0.00'}</p>
                    <button
                      className="favorite-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Impede a propagação do clique para o card
                        handleFavorite(book._id);
                      }}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
