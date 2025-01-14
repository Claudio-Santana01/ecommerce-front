import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ books, onSearchSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = books.filter(
        (book) =>
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.author.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setSuggestions([]);
    onSearchSelect(suggestion);
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
      <div className="search-suggestions">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="search-suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.title} - {suggestion.author}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
