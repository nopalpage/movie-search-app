import React from 'react';

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
      onClick={onToggle}
      title={darkMode ? 'Nonaktifkan Dark Mode' : 'Aktifkan Dark Mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;

