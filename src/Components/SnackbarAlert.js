import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const SnackbarAlert = ({ open, message, severity, onClose, anchorOrigin }) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

SnackbarAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
};

export default SnackbarAlert;
