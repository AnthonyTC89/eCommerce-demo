import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import './FacebookButton.css';

const FacebookButton = ({ handleCallback, textButton }) => (
  <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_KEY}
    fields="name,email,picture"
    size="small"
    textButton={textButton}
    icon="fa-facebook"
    cssClass="MuiButtonBase-root MuiButton-root MuiButton-contained btn-facebook"
    callback={handleCallback}
  />
);

FacebookButton.propTypes = {
  handleCallback: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
};

export default FacebookButton;
