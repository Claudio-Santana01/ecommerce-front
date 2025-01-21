import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import SearchBar from '../components/SearchBar';
import './Home.css'; // Importa o CSS
import Logo from '../components/Logo'; // Importe o componente Logo
import api from '../api';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const didFetch = React.useRef(false);

  useEffect(() => {
     // Recupera o token e o ID do usuário do localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

  // Log para verificar os valores
    console.log('Token do usuário:', token);
    console.log('ID do usuário:', userId);

    const fetchBooks = async () => {
      if (didFetch.current) return; // Se já executou, não faz nada
      didFetch.current = true;

      try {
        const response = await api.get('api/books');
        setBooks(response.data);
        setFilteredBooks(response.data); // Inicializa os livros filtrados com todos os livros
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtra os livros conforme o texto digitado na barra de pesquisa
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredBooks(books); // Se o campo de busca estiver vazio, retorna todos os livros
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseQuery) ||
          book.author.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBooks(filtered);
    }
  };

  const handleFavorite = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para favoritar um livro.');
        return;
      }

      const response = await api.post(
        '/api/users/favorite',
        { bookId },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      alert('Livro favoritado com sucesso!');
    } catch (error) {
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
  };

  return (
    <div className="home-container">
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Barra de Pesquisa no topo direito */}
      <div className="search-bar-container">
        <SearchBar
          placeholder="Pesquisar por título ou autor..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className={`home-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Logo />

        <h1 className="home-title">Bem-vindo à Home</h1>

        {loading ? (
          <p className="home-loading">Carregando livros...</p>
        ) : (
          <div className="home-card-grid-container">
            <div className="home-card-grid">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="home-card"
                  onClick={() => handleCardClick(book._id)}
                >
                  <div className="home-card-image-container">
                    {book.imageUrl ? (
                      <img
                        src={`http://localhost:8080${book.imageUrl}`}
                        alt={book.title}
                        className="home-card-image"
                      />
                    ) : (
                      <img
                        src={'https://www.moveisdoportinho.com.br/v2.1/ui/fotosprincipal/imagens/imagens/produto-sem-imagem.png'}
                        alt={book.title}
                        className="home-card-image"
                      />
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
                        e.stopPropagation();
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
