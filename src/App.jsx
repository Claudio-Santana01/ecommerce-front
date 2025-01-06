import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AnunciarLivro from './pages/AnunciarLivro';
import MeusFavoritos from './pages/MeusFavoritos';
import Contact from './pages/Contact'; // Importa a página Contact
import TopBooks from './pages/TopBooks'; // Importa a página TopBooks
import MeusAnuncios from './pages/MeusAnuncios'; // Importa a nova página Meus Anúncios
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Página Login */}
          <Route path="/" element={<Login />} />

          {/* Página de Cadastro */}
          <Route path="/signup" element={<Signup />} />

          {/* Página Home - Protegida por PrivateRoute */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Página AnunciarLivro - Protegida por PrivateRoute */}
          <Route
            path="/anunciar"
            element={
              <PrivateRoute>
                <AnunciarLivro />
              </PrivateRoute>
            }
          />

          {/* Página MeusFavoritos - Protegida por PrivateRoute */}
          <Route
            path="/favoritos"
            element={
              <PrivateRoute>
                <MeusFavoritos />
              </PrivateRoute>
            }
          />

          {/* Página de Contato - Protegida por PrivateRoute */}
          <Route
            path="/contact/:id" // Aceita o ID do livro como parâmetro
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />

          {/* Página TopBooks - Protegida por PrivateRoute */}
          <Route
            path="/top-books"
            element={
              <PrivateRoute>
                <TopBooks />
              </PrivateRoute>
            }
          />

          {/* Página Meus Anúncios - Protegida por PrivateRoute */}
          <Route
            path="/meus-anuncios"
            element={
              <PrivateRoute>
                <MeusAnuncios />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
