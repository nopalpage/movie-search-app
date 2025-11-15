import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../constants/config';

function MovieNotes({ movieId }) {
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.MOVIE_NOTES, {});
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (notes[movieId]) {
      setNote(notes[movieId]);
    } else {
      setNote('');
    }
  }, [movieId, notes]);

  const handleSave = () => {
    if (note.trim()) {
      setNotes(prev => ({
        ...prev,
        [movieId]: note.trim(),
      }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    const newNotes = { ...notes };
    delete newNotes[movieId];
    setNotes(newNotes);
    setNote('');
    setIsEditing(false);
  };

  if (!isEditing && !note) {
    return (
      <div className="movie-notes">
        <button 
          className="add-note-btn"
          onClick={() => setIsEditing(true)}
        >
          📝 Tambah Catatan
        </button>
      </div>
    );
  }

  if (!isEditing && note) {
    return (
      <div className="movie-notes">
        <div className="notes-header">
          <h3>Catatan Saya</h3>
          <button 
            className="edit-note-btn"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        </div>
        <div className="note-content">{note}</div>
      </div>
    );
  }

  return (
    <div className="movie-notes editing">
      <div className="notes-header">
        <h3>Catatan Saya</h3>
        <button 
          className="cancel-note-btn"
          onClick={() => {
            setIsEditing(false);
            if (notes[movieId]) {
              setNote(notes[movieId]);
            } else {
              setNote('');
            }
          }}
        >
          ✕ Batal
        </button>
      </div>
      <textarea
        className="note-input"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Tulis catatan tentang film ini..."
        rows={4}
      />
      <div className="note-actions">
        {notes[movieId] && (
          <button 
            className="delete-note-btn"
            onClick={handleDelete}
          >
            🗑️ Hapus
          </button>
        )}
        <button 
          className="save-note-btn"
          onClick={handleSave}
          disabled={!note.trim()}
        >
          💾 Simpan
        </button>
      </div>
    </div>
  );
}

export default MovieNotes;

