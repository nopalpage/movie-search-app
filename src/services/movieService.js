import { API_URL } from '../constants/config';

/**
 * Movie API Service
 */

export const movieService = {
  /**
   * Search movies by title
   * @param {string} title - Movie title to search
   * @param {number} page - Page number (optional)
   * @returns {Promise} API response
   */
  searchMovies: async (title, page = 1) => {
    try {
      const response = await fetch(`${API_URL}s=${encodeURIComponent(title)}&page=${page}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        return {
          success: true,
          movies: data.Search || [],
          totalResults: parseInt(data.totalResults) || 0,
          currentPage: page,
        };
      } else {
        return {
          success: false,
          error: data.Error || 'Film tidak ditemukan',
          movies: [],
          totalResults: 0,
          currentPage: page,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Terjadi kesalahan saat mencari film',
        movies: [],
        totalResults: 0,
        currentPage: page,
      };
    }
  },

  /**
   * Get movie details by IMDb ID
   * @param {string} imdbID - IMDb ID
   * @returns {Promise} Movie details
   */
  getMovieDetails: async (imdbID) => {
    try {
      const response = await fetch(`${API_URL}i=${imdbID}&plot=full`);
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
      return {
        success: false,
        error: 'Terjadi kesalahan saat mengambil detail film',
        movie: null,
      };
    }
  },

  /**
   * Advanced search with filters
   * @param {Object} params - Search parameters
   * @returns {Promise} Search results
   */
  advancedSearch: async (params) => {
    try {
      let queryString = '';
      if (params.title) queryString += `s=${encodeURIComponent(params.title)}&`;
      if (params.type) queryString += `type=${params.type}&`;
      if (params.year) queryString += `y=${params.year}&`;
      if (params.page) queryString += `page=${params.page}&`;
      
      const response = await fetch(`${API_URL}${queryString}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        return {
          success: true,
          movies: data.Search || [],
          totalResults: parseInt(data.totalResults) || 0,
        };
      } else {
        return {
          success: false,
          error: data.Error || 'Tidak ada hasil ditemukan',
          movies: [],
          totalResults: 0,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Terjadi kesalahan saat melakukan pencarian',
        movies: [],
        totalResults: 0,
      };
    }
  },
};


