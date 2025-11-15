import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, MAX_SEARCH_HISTORY } from '../constants/config';

/**
 * Custom hook for managing search history
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.SEARCH_HISTORY, []);

  const addToHistory = (term) => {
    if (!term || !term.trim()) return;

    const trimmedTerm = term.trim();
    setHistory(prev => {
      // Remove existing occurrence
      const filtered = prev.filter(item => 
        item.toLowerCase() !== trimmedTerm.toLowerCase()
      );
      // Add to beginning and limit to MAX_SEARCH_HISTORY
      return [trimmedTerm, ...filtered].slice(0, MAX_SEARCH_HISTORY);
    });
  };

  const removeFromHistory = (term) => {
    setHistory(prev => prev.filter(item => item !== term));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};

