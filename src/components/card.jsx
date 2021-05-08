import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ imageSrc, imageAlt }) => (
  <div className="col">
    <div className="card mx-3 my-3" style={{ border: 'none' }}>
      <img
        src={imageSrc}
        className="card-img-top"
        alt={imageAlt}
        style={{ borderRadius: '10px' }}
      />
    </div>
  </div>
);

Card.defaultProps = {
  imageAlt: 'alt image title',
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

export default Card;
