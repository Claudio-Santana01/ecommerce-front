import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import './AnunciarLivro.css';
import Logo from '../components/Logo';
import api from '../api';


const AnunciarLivro = () => {
  const navigate = useNavigate(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedYear: '',
    genre: '',
    price: '',
    description: '',
  });

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target; // Captura o id (name) e o valor do campo
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Atualiza o campo correspondente no estado
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    try {
      const response = await api.post('/api/books/add', formData); // Faz o POST
      console.log('Livro anunciado com sucesso:', response.data);
      alert('Livro anunciado com sucesso!');
      navigate('/home');
    } catch (error) {
      console.error('Erro ao anunciar o livro:', error);
      alert('Ocorreu um erro ao anunciar o livro. Tente novamente.');
    }
  };

  return (
    <div className="anunciar-container">
      {/* Menu Hambúrguer */}
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`anunciar-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Logo />

        {/* Título */}
        <h1 className="anunciar-title">Anunciar Livro</h1>

        {/* Formulário de Anúncio */}
        <form className="anunciar-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Nome da Obra:</label>
          <input
            type="text"
            id="title"
            placeholder="Digite o nome da obra"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            placeholder="Digite o nome do autor"
            value={formData.author}
            onChange={handleInputChange}
          />

          <label htmlFor="publisher">Editora:</label>
          <input
            type="text"
            id="publisher"
            placeholder="Digite a editora"
            value={formData.publisher}
            onChange={handleInputChange}
          />

          <label htmlFor="publishedYear">Ano de Publicação:</label>
          <input
            type="number"
            id="publishedYear"
            placeholder="Digite o ano de publicação"
            value={formData.publishedYear}
            onChange={handleInputChange}
          />

          <label htmlFor="genre">Gênero:</label>
          <input
            type="text"
            id="genre"
            placeholder="Digite o gênero"
            value={formData.genre}
            onChange={handleInputChange}
          />

          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            placeholder="Digite o preço"
            value={formData.price}
            onChange={handleInputChange}
          />

          {/* <label htmlFor="image">Inserir Imagem:</label>
          <input type="file" id="image" accept="image/*" /> */}

          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Digite uma descrição"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit">Anunciar</button>
        </form>
      </div>
    </div>
  );
};

export default AnunciarLivro;
