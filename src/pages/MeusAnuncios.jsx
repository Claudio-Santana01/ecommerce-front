import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import './MeusAnuncios.css';
import Logo from '../components/Logo';
import api from '../api';

const MeusAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]); // Estado para os anúncios
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(''); // Estado para capturar erros

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        // Obtenha o userId do localStorage
        const userId = localStorage.getItem('userId');
        
        // Verifica se o userId existe
        if (!userId) {
          setError('ID do usuário não encontrado. Faça login novamente.');
          return;
        }

        // Faz a requisição ao backend
        const response = await api.get(`/api/books/my-ads?userId=${userId}`);
        setAnuncios(response.data); // Atualiza o estado com os anúncios retornados
      } catch (error) {
        console.error('Erro ao buscar anúncios:', error);
        setError('Erro ao carregar anúncios. Tente novamente mais tarde.');
      }
    };

    fetchMyAds(); // Chama a função para buscar os anúncios
  }, []);

  return (
    <div className="meus-anuncios-container">
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`meus-anuncios-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="meus-anuncios-header">
          <Logo />
        </div>
        <h1 className="meus-anuncios-title">Meus Anúncios</h1>
        {error ? (
          <p className="meus-anuncios-error">{error}</p>
        ) : anuncios.length > 0 ? (
          <div className="meus-anuncios-list">
            {anuncios.map((anuncio) => (
              <div key={anuncio._id} className="meus-anuncios-card">
                <img
                  src={`http://localhost:8080${anuncio.image || '/sem-imagem.png'}`}
                  alt={anuncio.title}
                />
                <div className="meus-anuncios-info">
                  <h2>{anuncio.title}</h2>
                  <p><strong>Autor:</strong> {anuncio.author}</p>
                  <p><strong>Editora:</strong> {anuncio.publisher}</p>
                  <p><strong>Preço:</strong> R${anuncio.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="meus-anuncios-empty">Você não possui anúncios no momento.</p>
        )}
      </div>
    </div>
  );
};

export default MeusAnuncios;
