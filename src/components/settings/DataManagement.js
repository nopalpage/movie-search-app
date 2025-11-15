import React, { useState } from 'react';
import { exportData, importData } from '../../utils/localStorage';

function DataManagement() {
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `movie-app-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const result = importData(importText);
      if (result.success) {
        alert('Data berhasil diimpor! Halaman akan dimuat ulang.');
        window.location.reload();
      } else {
        setImportError(result.error || 'Terjadi kesalahan saat mengimpor data');
      }
    } catch (error) {
      setImportError('Format data tidak valid');
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImportText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="data-management">
      <h3>Kelola Data</h3>
      
      <div className="data-actions">
        <button className="btn btn-primary" onClick={handleExport}>
          💾 Export Data
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => setShowImport(!showImport)}
        >
          📥 Import Data
        </button>
      </div>

      {showImport && (
        <div className="import-section">
          <div className="file-upload">
            <label htmlFor="file-import" className="file-upload-label">
              Pilih File JSON
            </label>
            <input
              type="file"
              id="file-import"
              accept=".json"
              onChange={handleFileImport}
              className="file-input"
            />
          </div>

          <textarea
            className="import-textarea"
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value);
              setImportError('');
            }}
            placeholder="Atau paste data JSON di sini..."
            rows={6}
          />

          {importError && (
            <div className="import-error">{importError}</div>
          )}

          <div className="import-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowImport(false);
                setImportText('');
                setImportError('');
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary"
              onClick={handleImport}
              disabled={!importText.trim()}
            >
              Import
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataManagement;

