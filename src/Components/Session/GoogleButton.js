/* eslint-disable no-console */
import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

const GoggleButton = ({ buttonText }) => {
  const onSuccessGoogle = (res) => {
    console.log('res', res);
  };

  const onFailureGoogle = (res) => {
    console.log('res', res);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_KEY}
      buttonText={buttonText}
      onSuccess={onSuccessGoogle}
      onFailure={onFailureGoogle}
    />
  );
};

GoggleButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default GoggleButton;
