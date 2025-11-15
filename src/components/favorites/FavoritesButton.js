import React, { useState, useEffect } from 'react';

function FavoritesButton({ movie, isFavorite, onToggle }) {
  const [favorited, setFavorited] = useState(isFavorite);

  useEffect(() => {
    setFavorited(isFavorite);
  }, [isFavorite]);

  const handleClick = (e) => {
    e.stopPropagation();
    const newState = !favorited;
    setFavorited(newState);
    onToggle(movie, newState);
  };

  return (
    <button
      className={`favorite-btn ${favorited ? 'active' : ''}`}
      onClick={handleClick}
      title={favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
    >
      {favorited ? '❤️' : '🤍'}
    </button>
  );
}

export default FavoritesButton;

