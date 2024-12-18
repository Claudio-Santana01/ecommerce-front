import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AnunciarLivro from './pages/AnunciarLivro';
import MeusFavoritos from './pages/MeusFavoritos'; // Importe a nova página
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
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
          
          {/* Nova Rota para MeusFavoritos - Protegida por PrivateRoute */}
          <Route
            path="/favoritos"
            element={
              <PrivateRoute>
                <MeusFavoritos />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
