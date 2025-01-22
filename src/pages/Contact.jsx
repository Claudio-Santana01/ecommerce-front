import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo';
import HamburgerMenu from '../components/HamburgerMenu';
import { FaStar } from 'react-icons/fa';
import api from '../api';
import './Contact.css';

const Contact = () => {
  const { id } = useParams();
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/api/users/contact/${id}`, {
          headers: { 'x-auth-token': token },
        });
        setContactDetails(response.data);

        const reviewResponse = await api.get(`/api/reviews/${id}`);
        setReviews(reviewResponse.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes:', error);
        setError('Erro ao carregar os dados do contato.');
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert('Por favor, insira uma nota e um comentário.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/api/reviews',
        { bookId: id, rating, comment },
        {
          headers: { 'x-auth-token': token },
        }
      );

      alert('Avaliação enviada com sucesso!');
      setRating(0);
      setComment('');

      const reviewResponse = await api.get(`/api/reviews/${id}`);
      setReviews(reviewResponse.data);
    } catch (error) {
      console.error('Erro ao enviar a avaliação:', error);
      alert('Erro ao enviar a avaliação. Tente novamente.');
    }
  };

  if (loading) return <div className="contact-loading">Carregando...</div>;
  if (error) return <div className="contact-error">{error}</div>;

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
          <p>
            <strong>Telefone:</strong> {contact.phone}{' '}
            {contact.isWhatsApp && (
              <img
                src="/icons/whatsapp-icon.png"
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

        <div className="reviews-section">
          <h2 className="reviews-title">Avaliações</h2>
          <div className="review-input">
            <div className="rating-container">
              <select
                className="star-select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="0">Selecione uma nota</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              maxLength={100}
              placeholder="Escreva um comentário (máx. 100 caracteres)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="review-textbox"
            />
            <button className="review-submit-button" onClick={handleReviewSubmit}>
              Comentar
            </button>
          </div>

          <div className="review-list">
            {reviews.map((review) => (
              <div key={review._id} className="review-item">
                <p>
                  <strong>{review.userId.nickname}:</strong> {review.comment}
                </p>
                <p>
                  Nota:{' '}
                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar key={index} size={15} color="#ffc107" />
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
