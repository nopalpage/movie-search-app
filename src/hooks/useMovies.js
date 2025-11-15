import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';
import { SEARCH_DEBOUNCE_DELAY } from '../constants/config';

/**
 * Custom hook for movie search functionality
 */
export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchMovies = useCallback(async (title, page = 1) => {
    if (!title.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await movieService.searchMovies(title, page);

    if (result.success) {
      setMovies(result.movies);
      setTotalResults(result.totalResults);
      setCurrentPage(result.currentPage);
    } else {
      setMovies([]);
      setTotalResults(0);
      setError(result.error);
    }

    setLoading(false);
  }, []);

  const resetMovies = useCallback(() => {
    setMovies([]);
    setTotalResults(0);
    setCurrentPage(1);
    setError(null);
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

