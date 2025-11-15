import { API_URL } from '../constants/config';

/**
 * Movie API Service with improved error handling, timeout, and retry logic
 */

// Configuration
const API_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

/**
 * Create a fetch request with timeout
 */
const fetchWithTimeout = (url, options = {}, timeout = API_TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

/**
 * Retry a function with exponential backoff
 */
const retryWithBackoff = async (fn, retries = MAX_RETRIES) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
    }
  }
};

/**
 * Parse and validate API response
 */
const parseResponse = (data) => {
  // Check if response is valid JSON object
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  // Check for API errors
  if (data.Response === 'False') {
    const errorMessage = data.Error || 'Terjadi kesalahan pada API';
    
    // Map common API errors to user-friendly messages
    const errorMap = {
      'Movie not found!': 'Film tidak ditemukan',
      'Too many results.': 'Terlalu banyak hasil. Coba gunakan kata kunci yang lebih spesifik.',
      'Invalid API key!': 'API key tidak valid. Silakan periksa konfigurasi.',
      'Request limit reached!': 'Batas request harian telah tercapai. Silakan coba lagi besok.',
    };

    return {
      success: false,
      error: errorMap[errorMessage] || errorMessage,
      movies: [],
      totalResults: 0,
    };
  }

  // Validate successful response
  if (data.Response === 'True') {
    return {
      success: true,
      movies: Array.isArray(data.Search) ? data.Search : [],
      totalResults: parseInt(data.totalResults) || 0,
    };
  }

  throw new Error('Unexpected response format');
};

export const movieService = {
  /**
   * Search movies by title
   * @param {string} title - Movie title to search
   * @param {number} page - Page number (optional)
   * @param {AbortSignal} signal - Abort signal for request cancellation
   * @returns {Promise} API response
   */
  searchMovies: async (title, page = 1, signal = null) => {
    if (!title || !title.trim()) {
      return {
        success: false,
        error: 'Masukkan judul film untuk mencari',
        movies: [],
        totalResults: 0,
        currentPage: page,
      };
    }

    try {
      const url = `${API_URL}s=${encodeURIComponent(title.trim())}&page=${page}`;
      
      const fetchFn = () => fetchWithTimeout(
        url,
        { 
          signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        },
        API_TIMEOUT
      );

      const response = await retryWithBackoff(fetchFn);

      // Check if request was aborted
      if (signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movies: [],
          totalResults: 0,
          currentPage: page,
        };
      }

      // Check HTTP status
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API key tidak valid');
        } else if (response.status === 429) {
          throw new Error('Terlalu banyak request. Silakan coba lagi nanti.');
        } else if (response.status >= 500) {
          throw new Error('Server sedang mengalami masalah. Silakan coba lagi nanti.');
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      }

      const data = await response.json();
      const result = parseResponse(data);
      
      return {
        ...result,
        currentPage: page,
      };
    } catch (error) {
      // Handle different error types
      if (error.name === 'AbortError' || signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movies: [],
          totalResults: 0,
          currentPage: page,
        };
      }

      if (error.message === 'Request timeout') {
        return {
          success: false,
          error: 'Request timeout. Koneksi terlalu lambat atau server tidak merespon.',
          movies: [],
          totalResults: 0,
          currentPage: page,
        };
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
          movies: [],
          totalResults: 0,
          currentPage: page,
        };
      }

      return {
        success: false,
        error: error.message || 'Terjadi kesalahan saat mencari film. Silakan coba lagi.',
        movies: [],
        totalResults: 0,
        currentPage: page,
      };
    }
  },

  /**
   * Get movie details by IMDb ID
   * @param {string} imdbID - IMDb ID
   * @param {AbortSignal} signal - Abort signal for request cancellation
   * @returns {Promise} Movie details
   */
  getMovieDetails: async (imdbID, signal = null) => {
    if (!imdbID || !imdbID.trim()) {
      return {
        success: false,
        error: 'ID film tidak valid',
        movie: null,
      };
    }

    try {
      const url = `${API_URL}i=${imdbID.trim()}&plot=full`;
      
      const fetchFn = () => fetchWithTimeout(
        url,
        { 
          signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        },
        API_TIMEOUT
      );

      const response = await retryWithBackoff(fetchFn);

      // Check if request was aborted
      if (signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movie: null,
        };
      }

      // Check HTTP status
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API key tidak valid');
        } else if (response.status === 429) {
          throw new Error('Terlalu banyak request. Silakan coba lagi nanti.');
        } else if (response.status >= 500) {
          throw new Error('Server sedang mengalami masalah. Silakan coba lagi nanti.');
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      }

      const data = await response.json();
      
      if (data.Response === 'True') {
        return {
          success: true,
          movie: data,
        };
      } else {
        return {
          success: false,
          error: data.Error || 'Detail film tidak ditemukan',
          movie: null,
        };
      }
    } catch (error) {
      // Handle different error types
      if (error.name === 'AbortError' || signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movie: null,
        };
      }

      if (error.message === 'Request timeout') {
        return {
          success: false,
          error: 'Request timeout. Koneksi terlalu lambat atau server tidak merespon.',
          movie: null,
        };
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
          movie: null,
        };
      }

      return {
        success: false,
        error: error.message || 'Terjadi kesalahan saat mengambil detail film. Silakan coba lagi.',
        movie: null,
      };
    }
  },

  /**
   * Advanced search with filters
   * @param {Object} params - Search parameters
   * @param {AbortSignal} signal - Abort signal for request cancellation
   * @returns {Promise} Search results
   */
  advancedSearch: async (params, signal = null) => {
    if (!params || (!params.title && !params.type && !params.year)) {
      return {
        success: false,
        error: 'Masukkan minimal satu parameter pencarian',
        movies: [],
        totalResults: 0,
      };
    }

    try {
      let queryString = '';
      if (params.title) queryString += `s=${encodeURIComponent(params.title.trim())}&`;
      if (params.type) queryString += `type=${params.type}&`;
      if (params.year) queryString += `y=${params.year}&`;
      if (params.page) queryString += `page=${params.page}&`;
      
      const url = `${API_URL}${queryString}`;
      
      const fetchFn = () => fetchWithTimeout(
        url,
        { 
          signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        },
        API_TIMEOUT
      );

      const response = await retryWithBackoff(fetchFn);

      // Check if request was aborted
      if (signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movies: [],
          totalResults: 0,
        };
      }

      // Check HTTP status
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API key tidak valid');
        } else if (response.status === 429) {
          throw new Error('Terlalu banyak request. Silakan coba lagi nanti.');
        } else if (response.status >= 500) {
          throw new Error('Server sedang mengalami masalah. Silakan coba lagi nanti.');
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      }

      const data = await response.json();
      return parseResponse(data);
    } catch (error) {
      // Handle different error types
      if (error.name === 'AbortError' || signal?.aborted) {
        return {
          success: false,
          error: 'Request dibatalkan',
          movies: [],
          totalResults: 0,
        };
      }

      if (error.message === 'Request timeout') {
        return {
          success: false,
          error: 'Request timeout. Koneksi terlalu lambat atau server tidak merespon.',
          movies: [],
          totalResults: 0,
        };
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
          movies: [],
          totalResults: 0,
        };
      }

      return {
        success: false,
        error: error.message || 'Terjadi kesalahan saat melakukan pencarian. Silakan coba lagi.',
        movies: [],
        totalResults: 0,
      };
    }
  },

  /**
   * Get popular movies by fetching specific IMDb IDs
   * @param {AbortSignal} signal - Abort signal for request cancellation
   * @returns {Promise} Popular movies
   */
  getPopularMovies: async (signal = null) => {
    // List of popular IMDb IDs to fetch
    const popularMovieIds = [
      'tt3896198', // Guardians of the Galaxy Vol. 2
      'tt4154756', // Avengers: Infinity War
      'tt4154796', // Avengers: Endgame
      'tt0816692', // Interstellar
      'tt1375666', // Inception
      'tt0468569', // The Dark Knight
      'tt0111161', // The Shawshank Redemption
      'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
      'tt0133093', // The Matrix
      'tt0816711', // The Dark Knight Rises
      'tt0110912', // Pulp Fiction
      'tt0167260', // The Lord of the Rings: The Return of the King
    ];

    try {
      // Fetch multiple movies in parallel
      const moviePromises = popularMovieIds.slice(0, 12).map(id => 
        movieService.getMovieDetails(id, signal)
      );

      const results = await Promise.allSettled(moviePromises);
      
      const popularMovies = results
        .filter(result => result.status === 'fulfilled' && result.value.success)
        .map(result => result.value.movie)
        .filter(movie => movie !== null);

      return {
        success: true,
        movies: popularMovies,
        totalResults: popularMovies.length,
      };
    } catch (error) {
      // Fallback: try to get movies by searching "movie"
      try {
        const fallbackResult = await movieService.searchMovies('movie', 1, signal);
        return {
          success: fallbackResult.success,
          movies: fallbackResult.movies.slice(0, 12),
          totalResults: fallbackResult.movies.length,
        };
      } catch (fallbackError) {
        return {
          success: false,
          error: 'Gagal memuat film populer',
          movies: [],
          totalResults: 0,
        };
      }
    }
  },
};


