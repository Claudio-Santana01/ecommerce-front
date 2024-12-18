import React, { useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import './AnunciarLivro.css';
import Logo from '../components/Logo';


const AnunciarLivro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="anunciar-container">
      {/* Menu Hambúrguer */}
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`anunciar-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Logo />

        {/* Título */}
        <h1 className="anunciar-title">Anunciar Livro</h1>

         {/* Formulário de Anúncio */}
         <form className="anunciar-form">
          <label htmlFor="title">Nome da Obra:</label>
          <input type="text" id="title" placeholder="Digite o nome da obra" />

          <label htmlFor="author">Autor:</label>
          <input type="text" id="author" placeholder="Digite o nome do autor" />

          <label htmlFor="publisher">Editora:</label>
          <input type="text" id="publisher" placeholder="Digite a editora" />

          <label htmlFor="genre">Gênero:</label>
          <input type="text" id="genre" placeholder="Digite o gênero" />

          <label htmlFor="price">Preço:</label>
          <input type="number" id="price" placeholder="Digite o preço" />

          <label htmlFor="image">Inserir Imagem:</label>
          <input type="file" id="image" accept="image/*" />

          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Digite uma descrição"
          ></textarea>

          <button type="submit">Anunciar</button>
        </form>
      </div>
    </div>
  );
};

export default AnunciarLivro;
