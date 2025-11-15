import { useState, useEffect, useRef } from 'react';
import { movieService } from '../services/movieService';

/**
 * Custom hook for popular movies
 */
export const usePopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
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
        const result = await movieService.getPopularMovies(abortController.signal);

        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        if (result.success) {
          setPopularMovies(result.movies);
          setError(null);
        } else {
          setPopularMovies([]);
          setError(result.error);
        }
      } catch (err) {
        // Ignore abort errors
        if (err.name !== 'AbortError' && !abortController.signal.aborted) {
          setPopularMovies([]);
          setError('Terjadi kesalahan saat memuat film populer');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPopularMovies();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    popularMovies,
    loading,
    error,
  };
};

