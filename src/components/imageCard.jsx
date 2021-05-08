/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ imageSrc, imageAlt, showImageModal }) => (
  <>
    <div className="col">
      <div className="card mx-3 my-3" style={{ border: 'none' }}>
        <img
          src={imageSrc}
          className="card-img-top"
          alt={imageAlt}
          style={{ borderRadius: '10px' }}
          onClick={() => showImageModal(imageSrc, imageAlt)}
        />
      </div>
    </div>
  </>
);

Card.defaultProps = {
  imageAlt: 'alt image title',
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  showImageModal: PropTypes.func.isRequired,
  imageAlt: PropTypes.string,
};

export default Card;
