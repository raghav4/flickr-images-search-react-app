/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
import Card from './card';

const CardGrid = ({ images }) => {
  const fetchImage = () => {};

  return (
    <div className="mx-5 my-5 row row-cols-1 row-cols-md-3 g-4">
      {images.map((_image) => <Card imageSrc={`https://live.staticflickr.com/${_image.server}/${_image.id}_${_image.secret}_w.jpg`} imageAlt={_image.title} key={_image.id} />)}
    </div>
  );
};

// CardGrid.propTypes = {
//   images: PropTypes.array.isRequired,
// };

export default CardGrid;
