import React from 'react';
// import PropTypes from 'prop-types';
// import  from '../../styles/styles.css';

const ImageGalleryItem = ({ webformatImage }) => (
  <li className="gallery-item">
    <button type="button">
      <img src={webformatImage} alt="" />
    </button>
  </li>
);

export default ImageGalleryItem;

// ImageGalleryItem.propTypes = {

// };
