import React, { useState, useEffect } from 'react';
import api from '../api';
import './EditarAnuncio.css';

const EditarAnuncio = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedYear: '',
    genre: '',
    price: '',
    description: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Carregar os dados do anúncio salvos no localStorage
    const anuncioParaEditar = localStorage.getItem('anuncioParaEditar');
    if (anuncioParaEditar) {
      const anuncio = JSON.parse(anuncioParaEditar);
      setFormData({
        title: anuncio.title || '',
        author: anuncio.author || '',
        publisher: anuncio.publisher || '',
        publishedYear: anuncio.publishedYear || '',
        genre: anuncio.genre || '',
        price: anuncio.price || '',
        description: anuncio.description || '',
        image: null, // Imagem não é carregada diretamente
      });
    } else {
      setError('Nenhum anúncio encontrado para editar.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
  
    try {
      const { title, author, publisher, publishedYear, genre, price, description, image } = formData;
  
      // Cria um FormData para enviar a imagem junto com os outros dados
      const formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('author', author);
      formDataToSend.append('publisher', publisher);
      formDataToSend.append('publishedYear', publishedYear);
      formDataToSend.append('genre', genre);
      formDataToSend.append('price', price);
      formDataToSend.append('description', description);
      if (image) {
        formDataToSend.append('image', image);
      }
  
      // Obtém o ID do anúncio armazenado no localStorage
      const anuncioId = JSON.parse(localStorage.getItem('anuncioParaEditar'))._id;
  
      // Faz a requisição PUT para o backend
      await api.put(`/api/books/${anuncioId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSuccess('Alterações salvas com sucesso!');
      setError('');
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
      setError('Erro ao salvar as alterações. Tente novamente mais tarde.');
    }
  };
  

  return (
    <div className="editar-anuncio-container">
      <h1 className="editar-anuncio-title">Editar Anúncio</h1>

      {error && <p className="editar-anuncio-error">{error}</p>}
      {success && <p className="editar-anuncio-success">{success}</p>}

      {!error && (
        <form className="editar-form" onSubmit={handleSubmit}>
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

          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Digite uma descrição"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="image">Capa do Livro:</label>
          <input type="file" id="image" onChange={handleInputChange} />

          <button type="submit">Salvar Alterações</button>
        </form>
      )}
    </div>
  );
};

export default EditarAnuncio;
