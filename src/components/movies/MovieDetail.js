import React, { useState, useEffect, useRef } from 'react';
import { movieService } from '../../services/movieService';
import ShareButton from '../share/ShareButton';
import MovieNotes from '../notes/MovieNotes';

function MovieDetail({ movieId, isOpen, onClose }) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchMovieDetail = React.useCallback(async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const result = await movieService.getMovieDetails(movieId, abortController.signal);

      // Check if request was aborted
      if (abortController.signal.aborted) {
        return;
      }

      if (result.success) {
        setMovieDetail(result.movie);
        setError(null);
      } else {
        setMovieDetail(null);
        setError(result.error);
      }
    } catch (err) {
      // Ignore abort errors
      if (err.name !== 'AbortError' && !abortController.signal.aborted) {
        setMovieDetail(null);
        setError('Terjadi kesalahan saat mengambil detail film');
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, [movieId]);

  useEffect(() => {
    if (isOpen && movieId) {
      fetchMovieDetail();
    } else {
      setMovieDetail(null);
      setError(null);
      // Cancel any pending requests when modal closes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isOpen, movieId, fetchMovieDetail]);

  if (!isOpen) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Memuat detail film...</div>
          </div>
        )}

        {error && !loading && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <div className="error-title">Gagal Memuat Detail</div>
            <div className="error-message">{error}</div>
            <button 
              className="error-retry-btn"
              onClick={fetchMovieDetail}
            >
              Coba Lagi
            </button>
          </div>
        )}
        
        {movieDetail && !loading && !error && (
          <div className="movie-detail">
            <div className="detail-poster">
              <img
                src={movieDetail.Poster !== 'N/A' ? movieDetail.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movieDetail.Title}
                onError={handleImageError}
              />
              <ShareButton movie={movieDetail} />
            </div>
            
            <div className="detail-info">
              <h2>{movieDetail.Title}</h2>
              
              <div className="detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Tahun:</span>
                  <span className="meta-value">{movieDetail.Year}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Tipe:</span>
                  <span className="meta-value">{movieDetail.Type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Genre:</span>
                  <span className="meta-value">{movieDetail.Genre || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Durasi:</span>
                  <span className="meta-value">{movieDetail.Runtime || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Direktur:</span>
                  <span className="meta-value">{movieDetail.Director || 'N/A'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Aktor:</span>
                  <span className="meta-value">{movieDetail.Actors || 'N/A'}</span>
                </div>
              </div>

              {movieDetail.Ratings && movieDetail.Ratings.length > 0 && (
                <div className="ratings">
                  <h3>Rating</h3>
                  <div className="ratings-list">
                    {movieDetail.Ratings.map((rating, index) => (
                      <div key={index} className="rating-item">
                        <span className="rating-source">{rating.Source}:</span>
                        <span className="rating-value">{rating.Value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {movieDetail.imdbRating !== 'N/A' && (
                <div className="imdb-rating">
                  <span className="rating-label">IMDB Rating:</span>
                  <span className="rating-badge">{movieDetail.imdbRating}/10</span>
                </div>
              )}

              {movieDetail.Plot && movieDetail.Plot !== 'N/A' && (
                <div className="plot">
                  <h3>Sinopsis</h3>
                  <p>{movieDetail.Plot}</p>
                </div>
              )}

              {movieDetail.Website && movieDetail.Website !== 'N/A' && (
                <a 
                  href={movieDetail.Website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  Kunjungi Website Resmi
                </a>
              )}

              <MovieNotes movieId={movieDetail.imdbID} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;

