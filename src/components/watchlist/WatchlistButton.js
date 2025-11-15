import React, { useState, useEffect } from 'react';

function WatchlistButton({ movie, isInWatchlist, onToggle }) {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  useEffect(() => {
    setInWatchlist(isInWatchlist);
  }, [isInWatchlist]);

  const handleClick = (e) => {
    e.stopPropagation();
    const newState = !inWatchlist;
    setInWatchlist(newState);
    onToggle(movie, newState);
  };

  return (
    <button
      className={`watchlist-btn ${inWatchlist ? 'active' : ''}`}
      onClick={handleClick}
      title={inWatchlist ? 'Hapus dari watchlist' : 'Tambah ke watchlist'}
    >
      {inWatchlist ? '✅' : '➕'}
    </button>
  );
}

export default WatchlistButton;

