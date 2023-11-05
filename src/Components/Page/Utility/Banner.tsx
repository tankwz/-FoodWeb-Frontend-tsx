import React from 'react';
import './banner.css';

function Banner() {
  return (
    <div className="custom-banner ">
      <div
        className="m-auto d-flex align-items-center "
        style={{
          width: '400px',
          height: '50vh',
        }}
      >
        <div
          className="d-flex align-items-center mb-5 mt-0"
          style={{ width: '100%' }}
        >
          <input
            type={'text'}
            className="form-control rounded-pill mb-5"
            style={{
              width: '100%',
              padding: '20px 20px',
            }}
            placeholder="Search for Food Items!"
          />
          <span style={{ position: 'relative', left: '-43px' }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Banner;
