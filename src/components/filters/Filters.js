import React from 'react';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../constants/config';

function Filters({ filters, onFilterChange, onSortChange, sortBy }) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="type-filter">Filter Tipe:</label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="filter-select"
        >
          <option value={FILTER_OPTIONS.TYPE.ALL}>Semua</option>
          <option value={FILTER_OPTIONS.TYPE.MOVIE}>Movie</option>
          <option value={FILTER_OPTIONS.TYPE.SERIES}>Series</option>
          <option value={FILTER_OPTIONS.TYPE.EPISODE}>Episode</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-filter">Filter Tahun:</label>
        <select
          id="year-filter"
          value={filters.year}
          onChange={(e) => onFilterChange('year', e.target.value)}
          className="filter-select"
        >
          <option value={FILTER_OPTIONS.YEAR_DECADES.ALL}>Semua Tahun</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES['2020s']}>2020-an</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES['2010s']}>2010-an</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES['2000s']}>2000-an</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES['1990s']}>1990-an</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES['1980s']}>1980-an</option>
          <option value={FILTER_OPTIONS.YEAR_DECADES.OLDER}>Lebih Tua</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Urutkan:</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value={SORT_OPTIONS.DEFAULT}>Default</option>
          <option value={SORT_OPTIONS.YEAR_ASC}>Tahun (Terlama)</option>
          <option value={SORT_OPTIONS.YEAR_DESC}>Tahun (Terbaru)</option>
          <option value={SORT_OPTIONS.TITLE_ASC}>Judul (A-Z)</option>
          <option value={SORT_OPTIONS.TITLE_DESC}>Judul (Z-A)</option>
        </select>
      </div>

      <button
        onClick={() => {
          onFilterChange('type', FILTER_OPTIONS.TYPE.ALL);
          onFilterChange('year', FILTER_OPTIONS.YEAR_DECADES.ALL);
          onSortChange(SORT_OPTIONS.DEFAULT);
        }}
        className="clear-filters-btn"
      >
        Reset Filter
      </button>
    </div>
  );
}

export default Filters;

