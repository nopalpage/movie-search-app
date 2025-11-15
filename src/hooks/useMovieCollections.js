import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/config';

/**
 * Custom hook for managing movie collections (Favorites, Watchlist)
 */
export const useMovieCollections = () => {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);
  const [watchlist, setWatchlist] = useLocalStorage(STORAGE_KEYS.WATCHLIST, []);

  // Favorites operations
  const addToFavorites = (movie) => {
    if (!isFavorite(movie.imdbID)) {
      setFavorites(prev => [...prev, movie]);
      return true;
    }
    return false;
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== movieId));
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
      return false;
    } else {
      addToFavorites(movie);
      return true;
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };

  // Watchlist operations
  const addToWatchlist = (movie) => {
    if (!isInWatchlist(movie.imdbID)) {
      setWatchlist(prev => [...prev, movie]);
      return true;
    }
    return false;
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.imdbID !== movieId));
  };

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.imdbID)) {
      removeFromWatchlist(movie.imdbID);
      return false;
    } else {
      addToWatchlist(movie);
      return true;
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.imdbID === movieId);
  };

  // Clear all
  const clearFavorites = () => {
    setFavorites([]);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return {
    favorites,
    watchlist,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearFavorites,
    clearWatchlist,
  };
};

