import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/books/search?search=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(() => fetchSuggestions(), 300); // Debounce de 300ms
    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '' && suggestions.length > 0) {
      window.location.href = `/contact/${suggestions[0]._id}`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    window.location.href = `/contact/${suggestion._id}`; // Redireciona para a página de contato
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={handleChange}
        className="search-bar-input"
      />
      <button className="search-bar-button" onClick={handleSearch}>
        Buscar
      </button>
      {suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="search-suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={`http://localhost:8080${suggestion.imageUrl}`}
                alt={suggestion.title}
                className="suggestion-image"
              />
              <div className="suggestion-details">
                <span className="suggestion-title">{suggestion.title}</span>
                <span className="suggestion-author"> - {suggestion.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
