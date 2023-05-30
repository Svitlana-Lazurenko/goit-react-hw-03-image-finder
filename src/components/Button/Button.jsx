import React from 'react';
// import PropTypes from 'prop-types';
// import  from '../../styles/styles.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Load more
  </button>
);

export default Button;

Button.propTypes = {};
