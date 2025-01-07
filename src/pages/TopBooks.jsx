import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import './TopBooks.css';
import Logo from '../components/Logo';
import api from '../api';

const TopBooks = () => {
  const [books, setBooks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await api.get('/api/books/most-searched');
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros mais buscados:', error);
      }
    };

    fetchTopBooks();
  }, []);

  const getImageUrl = (imageUrl) => {
    // Verifica se há uma URL válida para a imagem
    if (imageUrl) {
      // Adiciona a URL base do backend (ajuste conforme sua configuração)
      return `http://localhost:8080${imageUrl}`;
    }
    // Retorna o caminho da imagem genérica
    return 'https://www.moveisdoportinho.com.br/v2.1/ui/fotosprincipal/imagens/imagens/produto-sem-imagem.png';
  };

  return (
    <div className="top-books-container">
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`top-books-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="top-books-header">
          <Logo />
        </div>
        <h1 className="top-books-title">Top Livros Mais Buscados</h1>
        <ul className="top-books-list">
          {books.map((book, index) => (
            <li key={book._id} className="top-books-item">
              <div className="top-books-rank">
                <strong>{index + 1}</strong>
              </div>
              <div className="top-books-image">
                <img src={getImageUrl(book.imageUrl)} alt={book.title} />
              </div>
              <div className="top-books-info">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.publisher}</p>
              </div>
              <div className="top-books-views">
                <p>{book.views}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopBooks;
