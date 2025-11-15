import React from 'react';
import FavoritesButton from '../favorites/FavoritesButton';
import WatchlistButton from '../watchlist/WatchlistButton';

function MovieCard({ movie, onViewDetail, isFavorite, isInWatchlist, onToggleFavorite, onToggleWatchlist }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  };

  const handleCardClick = () => {
    if (onViewDetail) {
      onViewDetail(movie.imdbID);
    }
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          onError={handleImageError}
        />
        <div className="movie-overlay">
          <div className="movie-actions">
            <FavoritesButton
              movie={movie}
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
            />
            <WatchlistButton
              movie={movie}
              isInWatchlist={isInWatchlist}
              onToggle={onToggleWatchlist}
            />
          </div>
          <button
            className="detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            title="Lihat Detail"
          >
            📋 Detail
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">Tahun: {movie.Year}</p>
        <p className="movie-type">Tipe: {movie.Type}</p>
      </div>
    </div>
  );
}

export default MovieCard;

