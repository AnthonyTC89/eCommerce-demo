import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
  },
});

const SnackbarAlert = ({ open, message, severity, onClose, anchorOrigin }) => {
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
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
