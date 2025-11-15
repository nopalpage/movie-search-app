import { useState, useEffect, useCallback, useRef } from 'react';
import { movieService } from '../services/movieService';
import { SEARCH_DEBOUNCE_DELAY } from '../constants/config';

/**
 * Custom hook for movie search functionality with request cancellation
 */
export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const abortControllerRef = useRef(null);

  const searchMovies = useCallback(async (title, page = 1) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    if (!title.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await movieService.searchMovies(title, page, abortController.signal);

      // Check if request was aborted
      if (abortController.signal.aborted) {
        return;
      }

      if (result.success) {
        setMovies(result.movies);
        setTotalResults(result.totalResults);
        setCurrentPage(result.currentPage);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(result.error);
      }
    } catch (err) {
      // Ignore abort errors
      if (err.name !== 'AbortError' && !abortController.signal.aborted) {
        setMovies([]);
        setTotalResults(0);
        setError('Terjadi kesalahan saat mencari film');
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const resetMovies = useCallback(() => {
    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setMovies([]);
    setTotalResults(0);
    setCurrentPage(1);
    setError(null);
    setLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    searchMovies,
    resetMovies,
    setCurrentPage,
  };
};

/**
 * Custom hook for debounced movie search
 */
export const useDebouncedSearch = (searchTerm, delay = SEARCH_DEBOUNCE_DELAY) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return debouncedTerm;
};

