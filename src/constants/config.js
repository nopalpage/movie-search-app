// API Configuration
export const API_KEY = 'your-api-key-here';
export const API_BASE_URL = 'http://www.omdbapi.com/';
export const API_URL = `${API_BASE_URL}?apikey=${API_KEY}&`;

// LocalStorage Keys
export const STORAGE_KEYS = {
  FAVORITES: 'movieFavorites',
  WATCHLIST: 'movieWatchlist',
  SEARCH_HISTORY: 'searchHistory',
  MOVIE_NOTES: 'movieNotes',
  DARK_MODE: 'darkMode',
  PREFERENCES: 'moviePreferences',
};

// Filter Options
export const FILTER_OPTIONS = {
  TYPE: {
    ALL: '',
    MOVIE: 'movie',
    SERIES: 'series',
    EPISODE: 'episode',
  },
  YEAR_DECADES: {
    ALL: '',
    '2020s': '2020s',
    '2010s': '2010s',
    '2000s': '2000s',
    '1990s': '1990s',
    '1980s': '1980s',
    OLDER: 'older',
  },
};

// Sort Options
export const SORT_OPTIONS = {
  DEFAULT: 'default',
  YEAR_ASC: 'year-asc',
  YEAR_DESC: 'year-desc',
  TITLE_ASC: 'title-asc',
  TITLE_DESC: 'title-desc',
  RATING_DESC: 'rating-desc',
};

// Pagination
export const ITEMS_PER_PAGE = 12;
export const MAX_SEARCH_HISTORY = 10;

// Debounce delay for search
export const SEARCH_DEBOUNCE_DELAY = 500;

