/**
 * Utility functions for localStorage operations
 */

export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export const exportData = () => {
  const data = {
    favorites: getFromStorage('movieFavorites', []),
    watchlist: getFromStorage('movieWatchlist', []),
    notes: getFromStorage('movieNotes', {}),
    preferences: getFromStorage('moviePreferences', {}),
    timestamp: new Date().toISOString(),
  };
  
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.favorites) saveToStorage('movieFavorites', data.favorites);
    if (data.watchlist) saveToStorage('movieWatchlist', data.watchlist);
    if (data.notes) saveToStorage('movieNotes', data.notes);
    if (data.preferences) saveToStorage('moviePreferences', data.preferences);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error importing data:', error);
    return { success: false, error: error.message };
  }
};

