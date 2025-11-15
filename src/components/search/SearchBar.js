import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder = 'Cari film...' }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        🔍 Cari
      </button>
    </form>
  );
}

export default SearchBar;

