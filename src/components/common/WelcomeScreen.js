import React from 'react';
import { usePopularMovies } from '../../hooks/usePopularMovies';
import MovieCard from '../movies/MovieCard';
import SkeletonLoader from './SkeletonLoader';

function WelcomeScreen({ onViewDetail, onToggleFavorite, onToggleWatchlist, isFavorite, isInWatchlist }) {
  const { popularMovies, loading, error } = usePopularMovies();

  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <div className="welcome-icon">
          <div className="film-icon">🎬</div>
        </div>
        <h1 className="welcome-title">
          <span className="gradient-text">Discover</span> Your Next Favorite Movie
        </h1>
        <p className="welcome-subtitle">
          Cari film favoritmu dengan mudah. Explore, save, dan nikmati pengalaman menonton yang lebih baik! ✨
        </p>
        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Fast Search</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💜</span>
            <span className="feature-text">Save Faves</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span className="feature-text">Mobile Ready</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌙</span>
            <span className="feature-text">Dark Mode</span>
          </div>
        </div>
      </div>

      <div className="popular-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="fire-emoji">🔥</span> Trending Now
          </h2>
          <p className="section-subtitle">Film-film populer yang sedang trending</p>
        </div>

        {loading && <SkeletonLoader count={6} />}
        
        {error && !loading && (
          <div className="popular-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && popularMovies.length > 0 && (
          <div className="popular-movies-grid">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onViewDetail={onViewDetail}
                isFavorite={isFavorite ? isFavorite(movie.imdbID) : false}
                isInWatchlist={isInWatchlist ? isInWatchlist(movie.imdbID) : false}
                onToggleFavorite={onToggleFavorite}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        )}

        {!loading && !error && popularMovies.length === 0 && (
          <div className="popular-empty">
            <p>Belum ada film populer tersedia</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;

