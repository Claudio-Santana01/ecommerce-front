import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  // Função para validar o token
  const isTokenValid = (token) => {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      return decoded.exp * 1000 > Date.now(); // Verifica se o token ainda não expirou
    } catch (error) {
      return false;
    }
  };

  // Verifica o token e restaura o estado do usuário
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);

      // Verifique a validade do token
      const token = userData.token;
      if (token && isTokenValid(token)) {
        setUser(userData);
      } else {
        localStorage.removeItem('user'); // Remove o usuário inválido
      }
    }
  }, []);

  // Função de login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Salva no localStorage
    navigate('/home');
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove do localStorage
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
