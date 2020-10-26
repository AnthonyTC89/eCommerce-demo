import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';

const FacebookButton = ({ handleCallback, textButton }) => (
  <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_KEY}
    fields="name,email,picture"
    size="small"
    textButton={textButton}
    icon="fa-facebook"
    callback={handleCallback}
  />
);

FacebookButton.propTypes = {
  handleCallback: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
};

export default FacebookButton;
