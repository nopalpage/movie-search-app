import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useDebouncedSearch } from './hooks/useMovies';
import { filterMovies, sortMovies, getTotalPages, paginate } from './utils/filters';
import { FILTER_OPTIONS, SORT_OPTIONS, ITEMS_PER_PAGE } from './constants/config';

// Components
import SearchBar from './components/search/SearchBar';
import AdvancedSearch from './components/search/AdvancedSearch';
import SearchHistory from './components/search/SearchHistory';
import MovieCard from './components/movies/MovieCard';
import MovieDetail from './components/movies/MovieDetail';
import Filters from './components/filters/Filters';
import Pagination from './components/pagination/Pagination';
import DarkModeToggle from './components/settings/DarkModeToggle';
import DataManagement from './components/settings/DataManagement';
import Modal from './components/common/Modal';
import WelcomeScreen from './components/common/WelcomeScreen';
import SkeletonLoader from './components/common/SkeletonLoader';

import './App.css';

function AppContent() {
  const { movies, collections, searchHistory, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewMode, setViewMode] = useState('search'); // 'search', 'favorites', 'watchlist'
  const [filters, setFilters] = useState({ type: FILTER_OPTIONS.TYPE.ALL, year: FILTER_OPTIONS.YEAR_DECADES.ALL });
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEFAULT);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm);

  // Handle search
  useEffect(() => {
    if (debouncedSearchTerm) {
      movies.searchMovies(debouncedSearchTerm, 1);
      searchHistory.addToHistory(debouncedSearchTerm);
      setCurrentPage(1);
    } else {
      movies.resetMovies();
    }
  }, [debouncedSearchTerm]);

  // Filter and sort movies
  const getDisplayedMovies = () => {
    let moviesToDisplay = [];

    switch (viewMode) {
      case 'favorites':
        moviesToDisplay = [...collections.favorites];
        break;
      case 'watchlist':
        moviesToDisplay = [...collections.watchlist];
        break;
      default:
        moviesToDisplay = [...movies.movies];
    }

    // Apply filters
    if (viewMode === 'search') {
      moviesToDisplay = filterMovies(moviesToDisplay, filters);
    }

    // Apply sort
    moviesToDisplay = sortMovies(moviesToDisplay, sortBy);

    return moviesToDisplay;
  };

  const displayedMovies = getDisplayedMovies();
  const totalPages = getTotalPages(displayedMovies.length, ITEMS_PER_PAGE);
  const paginatedMovies = paginate(displayedMovies, currentPage, ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, viewMode]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setViewMode('search');
  };

  const handleAdvancedSearch = (filters) => {
    if (filters.title) {
      movies.searchMovies(filters.title);
      searchHistory.addToHistory(filters.title);
      setShowAdvancedSearch(false);
    }
  };

  const handleViewDetail = (movieId) => {
    setSelectedMovieId(movieId);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedMovieId(null);
  };

  const handleToggleFavorite = (movie) => {
    collections.toggleFavorite(movie);
  };

  const handleToggleWatchlist = (movie) => {
    collections.toggleWatchlist(movie);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSelectHistory = (term) => {
    setSearchTerm(term);
    movies.searchMovies(term, 1);
    setViewMode('search');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app ${darkMode.darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-top">
          <h1>Movie Search App</h1>
          <div className="header-controls">
            <button
              className="advanced-search-btn"
              onClick={() => setShowAdvancedSearch(true)}
              title="Pencarian Lanjutan"
            >
              🔍⚙️
            </button>
            <DarkModeToggle
              darkMode={darkMode.darkMode}
              onToggle={darkMode.toggleDarkMode}
            />
            <button
              className="settings-btn"
              onClick={() => setShowSettings(!showSettings)}
              title="Pengaturan"
            >
              ⚙️
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {showSettings && (
          <div className="settings-panel">
            <DataManagement />
          </div>
        )}

        <div className="header-actions">
          <button
            className={`view-toggle ${viewMode === 'search' ? 'active' : ''}`}
            onClick={() => setViewMode('search')}
          >
            🔍 Pencarian
          </button>
          <button
            className={`view-toggle ${viewMode === 'favorites' ? 'active' : ''}`}
            onClick={() => setViewMode('favorites')}
          >
            ❤️ Favorit ({collections.favorites.length})
          </button>
          <button
            className={`view-toggle ${viewMode === 'watchlist' ? 'active' : ''}`}
            onClick={() => setViewMode('watchlist')}
          >
            ➕ Watchlist ({collections.watchlist.length})
          </button>
        </div>

        {viewMode === 'search' && movies.movies.length > 0 && (
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={setSortBy}
            sortBy={sortBy}
          />
        )}

        {viewMode === 'search' && (
          <SearchHistory
            history={searchHistory.history}
            onSelectHistory={handleSelectHistory}
            onRemoveHistory={searchHistory.removeFromHistory}
            onClearHistory={searchHistory.clearHistory}
          />
        )}
      </header>

      <main className="app-main">
        {/* Welcome Screen - Show when no search term and not loading */}
        {!movies.loading && !movies.error && !searchTerm && viewMode === 'search' && (
          <WelcomeScreen
            onViewDetail={handleViewDetail}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatchlist={handleToggleWatchlist}
            isFavorite={collections.isFavorite}
            isInWatchlist={collections.isInWatchlist}
          />
        )}

        {/* Loading State with Skeleton */}
        {movies.loading && <SkeletonLoader count={ITEMS_PER_PAGE} />}
        
        {/* Error State */}
        {movies.error && !movies.loading && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <div className="error-title">Oops! Terjadi Kesalahan</div>
            <div className="error-message">{movies.error}</div>
            <button 
              className="error-retry-btn"
              onClick={() => searchTerm && movies.searchMovies(searchTerm, currentPage)}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty States */}
        {!movies.loading && !movies.error && paginatedMovies.length === 0 && viewMode === 'search' && searchTerm && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Tidak ada hasil ditemukan</div>
            <div className="empty-message">
              Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda.
            </div>
          </div>
        )}

        {!movies.loading && !movies.error && paginatedMovies.length === 0 && viewMode === 'favorites' && (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <div className="empty-title">Belum ada film favorit</div>
            <div className="empty-message">
              Klik tombol hati pada film untuk menambahkannya ke favorit.
            </div>
          </div>
        )}

        {!movies.loading && !movies.error && paginatedMovies.length === 0 && viewMode === 'watchlist' && (
          <div className="empty-state">
            <div className="empty-icon">➕</div>
            <div className="empty-title">Belum ada film di watchlist</div>
            <div className="empty-message">
              Klik tombol plus pada film untuk menambahkannya ke watchlist.
            </div>
          </div>
        )}

        {displayedMovies.length > 0 && (
          <div className="results-count">
            {viewMode === 'search' && (
              <>Menampilkan {paginatedMovies.length} dari {displayedMovies.length} hasil (Total: {movies.totalResults || displayedMovies.length})</>
            )}
            {viewMode === 'favorites' && (
              <>{collections.favorites.length} Film Favorit</>
            )}
            {viewMode === 'watchlist' && (
              <>{collections.watchlist.length} Film di Watchlist</>
            )}
          </div>
        )}

        <div className="movies-container">
          {paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onViewDetail={handleViewDetail}
              isFavorite={collections.isFavorite(movie.imdbID)}
              isInWatchlist={collections.isInWatchlist(movie.imdbID)}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatchlist={handleToggleWatchlist}
            />
          ))}
        </div>

        {displayedMovies.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={displayedMovies.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </main>

      <MovieDetail
        movieId={selectedMovieId}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />

      <Modal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        title="Pencarian Lanjutan"
        size="medium"
      >
        <AdvancedSearch
          onSearch={handleAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
        />
      </Modal>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
