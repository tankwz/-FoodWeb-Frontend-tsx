import React from 'react';

function LoaderSmall({ type = 'info', size = 100 }) {
  return (
    <div>
      <div
        className={`spinner-border  text-${type}`}
        role="status"
        style={{ scale: `${size}%` }}
      ></div>
    </div>
  );
}

export default LoaderSmall;
