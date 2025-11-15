import { FILTER_OPTIONS } from '../constants/config';

/**
 * Filter movies based on criteria
 */
export const filterMovies = (movies, filters) => {
  let filtered = [...movies];

  // Filter by type
  if (filters.type && filters.type !== FILTER_OPTIONS.TYPE.ALL) {
    filtered = filtered.filter(movie => movie.Type === filters.type);
  }

  // Filter by year
  if (filters.year && filters.year !== FILTER_OPTIONS.YEAR_DECADES.ALL) {
    const currentYear = new Date().getFullYear();
    filtered = filtered.filter(movie => {
      const year = parseInt(movie.Year);
      switch (filters.year) {
        case FILTER_OPTIONS.YEAR_DECADES['2020s']:
          return year >= 2020 && year <= currentYear;
        case FILTER_OPTIONS.YEAR_DECADES['2010s']:
          return year >= 2010 && year < 2020;
        case FILTER_OPTIONS.YEAR_DECADES['2000s']:
          return year >= 2000 && year < 2010;
        case FILTER_OPTIONS.YEAR_DECADES['1990s']:
          return year >= 1990 && year < 2000;
        case FILTER_OPTIONS.YEAR_DECADES['1980s']:
          return year >= 1980 && year < 1990;
        case FILTER_OPTIONS.YEAR_DECADES.OLDER:
          return year < 1980;
        default:
          return true;
      }
    });
  }

  return filtered;
};

/**
 * Sort movies based on sort option
 */
export const sortMovies = (movies, sortBy) => {
  const sorted = [...movies];

  switch (sortBy) {
    case 'year-asc':
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearA - yearB;
      });

    case 'year-desc':
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        return yearB - yearA;
      });

    case 'title-asc':
      return sorted.sort((a, b) => 
        a.Title.localeCompare(b.Title, 'id', { numeric: true, sensitivity: 'base' })
      );

    case 'title-desc':
      return sorted.sort((a, b) => 
        b.Title.localeCompare(a.Title, 'id', { numeric: true, sensitivity: 'base' })
      );

    default:
      return sorted;
  }
};

/**
 * Get total pages for pagination
 */
export const getTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Paginate array
 */
export const paginate = (array, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
};

