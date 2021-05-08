/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';

const SearchBox = () => {
  const showPastSearches = () => {
    console.log('History Exists');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Pressed Enter');
    }
  };

  return (
    <div style={{ background: '#0F2027', paddingBottom: '10px' }}>
      <h1 style={{ color: 'white', paddingTop: '20px', textAlign: 'center' }}>Search Photos</h1>
      <div className="active-cyan-4 mx-5 my-4">
        <input className="form-control" type="text" placeholder="Search Photos" onClick={showPastSearches} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};

export default SearchBox;
