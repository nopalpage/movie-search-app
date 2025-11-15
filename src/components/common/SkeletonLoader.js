import React from 'react';

function SkeletonLoader({ count = 12 }) {
  return (
    <div className="movies-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="movie-card skeleton-card">
          <div className="skeleton-poster">
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="skeleton-info">
            <div className="skeleton-title">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-meta">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-meta">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;

