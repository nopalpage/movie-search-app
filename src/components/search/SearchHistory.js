import React from 'react';

function SearchHistory({ history, onSelectHistory, onRemoveHistory, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>Riwayat Pencarian</h3>
        <button
          onClick={onClearHistory}
          className="clear-history-btn"
        >
          Hapus Semua
        </button>
      </div>
      <div className="history-items">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <span
              onClick={() => onSelectHistory(item)}
              className="history-term"
            >
              {item}
            </span>
            <button
              onClick={() => onRemoveHistory(item)}
              className="remove-history-btn"
              title="Hapus"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;

