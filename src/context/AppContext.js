import React, { createContext, useContext } from 'react';
import { useMovies, useDebouncedSearch } from '../hooks/useMovies';
import { useMovieCollections } from '../hooks/useMovieCollections';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useDarkMode } from '../hooks/useDarkMode';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const movies = useMovies();
  const collections = useMovieCollections();
  const searchHistory = useSearchHistory();
  const darkMode = useDarkMode();

  const value = {
    movies,
    collections,
    searchHistory,
    darkMode,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

