import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './banner.css';
import { setSearchItem } from '../../../Storage/Redux/menuItemSlice';
function Banner() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
    setSearch(e.target.value);
  };
  return (
    <div className="custom-banner ">
      <div
        className="m-auto d-flex align-items-center "
        style={{
          width: '400px',
          height: '40vh',
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
            value={search}
            onChange={handleChange}
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
