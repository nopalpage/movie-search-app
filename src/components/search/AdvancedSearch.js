import React, { useState } from 'react';
import { FILTER_OPTIONS } from '../../constants/config';

function AdvancedSearch({ onSearch, onClose }) {
  const [filters, setFilters] = useState({
    title: '',
    type: FILTER_OPTIONS.TYPE.ALL,
    year: '',
  });

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      title: '',
      type: FILTER_OPTIONS.TYPE.ALL,
      year: '',
    });
  };

  return (
    <div className="advanced-search">
      <div className="advanced-search-header">
        <h2>Pencarian Lanjutan</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>×</button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="advanced-search-form">
        <div className="form-group">
          <label htmlFor="title">Judul Film</label>
          <input
            type="text"
            id="title"
            value={filters.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Masukkan judul film"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipe</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value={FILTER_OPTIONS.TYPE.ALL}>Semua Tipe</option>
            <option value={FILTER_OPTIONS.TYPE.MOVIE}>Movie</option>
            <option value={FILTER_OPTIONS.TYPE.SERIES}>Series</option>
            <option value={FILTER_OPTIONS.TYPE.EPISODE}>Episode</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Tahun</label>
          <input
            type="number"
            id="year"
            value={filters.year}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="Contoh: 2020"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Cari
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdvancedSearch;

