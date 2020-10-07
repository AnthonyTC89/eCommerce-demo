import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({ title, content, handleClose }) => (
  <Dialog
    open
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    {content ? (
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
    ) : null}
    <DialogActions>
      <Button onClick={() => handleClose(false)} color="primary">
        No
      </Button>
      <Button onClick={() => handleClose(true)} color="primary" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);


AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

AlertDialog.defaultProps = {
  content: null,
};

export default AlertDialog;
