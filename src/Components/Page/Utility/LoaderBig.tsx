import React from 'react';

function LoaderBig({ type = 'info', message = '' }) {
  return (
    <div>
      <div className="text-center mt-5">
        <span
          className="text-info h1 mt-5
        "
        >
          Loading... {message}
        </span>
        <div
          className={`spinner-border  text-${type}`}
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LoaderBig;
