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
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('ID do usuário não encontrado. Faça login novamente.');
          return;
        }
        const response = await api.get(`/api/books/my-ads?userId=${userId}`);
        setAnuncios(response.data);
      } catch (error) {
        console.error('Erro ao buscar anúncios:', error);
        setError('Erro ao carregar anúncios. Tente novamente mais tarde.');
      }
    };

    fetchMyAds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este anúncio?')) {
      try {
        await api.delete(`/api/books/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setAnuncios((prevAnuncios) => prevAnuncios.filter((anuncio) => anuncio._id !== id)); // Atualiza a lista de anúncios
        alert('Anúncio excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir anúncio:', error);
        alert('Erro ao excluir o anúncio. Tente novamente mais tarde.');
      }
    }
  };

  const handleEdit = (anuncio) => {
    // Redireciona para a página de edição com os dados do anúncio
    localStorage.setItem('anuncioParaEditar', JSON.stringify(anuncio));
    window.location.href = '/editar-anuncio';
  };

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
                <div className="meus-anuncios-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(anuncio)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(anuncio._id)}
                  >
                    Excluir
                  </button>
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
