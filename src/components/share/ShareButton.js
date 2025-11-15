import React, { useState } from 'react';

function ShareButton({ movie }) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = `https://www.imdb.com/title/${movie.imdbID}`;
  const shareText = `Cek film ini: ${movie.Title} (${movie.Year})`;

  const handleShare = async (platform) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case 'copy':
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl);
          alert('Link berhasil disalin!');
          setShowShareMenu(false);
          return;
        }
        break;
      default:
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  // Check if Web Share API is available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.Title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <div className="share-container">
      <button 
        className="share-btn"
        onClick={handleNativeShare}
        title="Bagikan film"
      >
        📤 Bagikan
      </button>

      {showShareMenu && (
        <>
          <div 
            className="share-overlay"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="share-menu">
            <button onClick={() => handleShare('facebook')}>
              📘 Facebook
            </button>
            <button onClick={() => handleShare('twitter')}>
              🐦 Twitter
            </button>
            <button onClick={() => handleShare('whatsapp')}>
              💬 WhatsApp
            </button>
            <button onClick={() => handleShare('telegram')}>
              ✈️ Telegram
            </button>
            <button onClick={() => handleShare('copy')}>
              📋 Salin Link
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShareButton;

