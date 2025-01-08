import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo';
import HamburgerMenu from '../components/HamburgerMenu';
import api from '../api';
import './Contact.css';

const Contact = () => {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [contactDetails, setContactDetails] = useState(null); // Armazena os dados do contato (livro e usuário)
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState('');

  const didFetch = React.useRef(false);

  useEffect(() => {
    const fetchContactDetails = async () => {

      if (didFetch.current) return; // Se já executou, não faz nada
      didFetch.current = true;
      
      try {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        if (!token) {
          setError('Usuário não autenticado. Faça login.');
          setLoading(false);
          return;
        }

        // Faz a chamada para a API
        const response = await api.get(`/api/users/contact/${id}`, {
          headers: { 'x-auth-token': token },
        });

        setContactDetails(response.data); // Define os dados retornados
      } catch (error) {
        console.error('Erro ao buscar os detalhes:', error);
        const errorMessage =
          error.response?.data?.message || 'Erro ao carregar os dados do contato.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  // useEffect(() => {
  //   const fetchAddViewInBook = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Obtém o token do localStorage
  //       if (!token) {
  //         setError('Usuário não autenticado. Faça login.');
  //         setLoading(false);
  //         return;
  //       }

  //       // Faz a chamada para a API
  //       await api.get(`/api/books/${id}`, {
  //         headers: { 'x-auth-token': token },
  //       });
  //     } catch (error) {
  //       console.error('Erro ao visualizar o livro:', error);
  //       const errorMessage =
  //         error.response?.data?.message || 'Erro ao visualizar o livro';
  //       setError(errorMessage);
  //     }
  //   };

  //   fetchAddViewInBook();
  // }, []);

  if (loading) {
    return <div className="contact-loading">Carregando...</div>;
  }

  if (error) {
    return <div className="contact-error">{error}</div>;
  }

  const { book, contact } = contactDetails || {};

  return (
    <div className="contact-container">
      <HamburgerMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="contact-content">
        <Logo />
        <h1 className="contact-title">Detalhes do Contato</h1>

        <div className="contact-details">
          <h2>Informações do Anunciante</h2>
          <p>
            <strong>Nickname:</strong> {contact?.nickname || 'Não informado'}
          </p>
          <p>
            <strong>Nome Completo:</strong> {contact?.fullName || 'Não informado'}
          </p>
          <p><strong>Telefone:</strong> {contact.phone}{' '}
              {contact.isWhatsApp && (
                <img
                  src="/icons/whatsapp-icon.png" // Use o caminho correto para o ícone
                  alt="WhatsApp"
                  style={{ width: '20px', marginLeft: '8px' }}
                />
              )}
            </p>
          <p>
            <strong>E-mail:</strong> {contact?.email || 'Não informado'}
          </p>

          <h2>Informações do Livro</h2>
          <p>
            <strong>Nome:</strong> {book?.title || 'Não informado'}
          </p>
          <p>
            <strong>Autor:</strong> {book?.author || 'Não informado'}
          </p>
          <p>
            <strong>Gênero:</strong> {book?.genre || 'Não informado'}
          </p>
          <p>
            <strong>Editora:</strong> {book?.publisher || 'Não informado'}
          </p>
          <p>
            <strong>Preço:</strong> R${book?.price ? book.price.toFixed(2) : '0.00'}
          </p>
          <p>
            <strong>Descrição:</strong> {book?.description || 'Não informado'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
