import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { buttons } from '../../Info.json';
import SnackbarAlert from '../SnackbarAlert';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  form: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const defaultInputForm = {
  username: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const classes = useStyles();
  const [inputForm, setInputForm] = useState(defaultInputForm);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const { wait, send } = buttons;

  const handleSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = jwt.sign(inputForm, process.env.REACT_APP_PRIVATE_KEY_JWT);
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
      await axios.post('/api/mailer/sendgrid', { token }, config);
      setInputForm(defaultInputForm);
      handleSnackbar(`Email Sent. Thank you!`, 'success');
    } catch (err) {
      handleSnackbar('Email not sent. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        margin="dense"
        fullWidth
        name="username"
        variant="outlined"
        value={inputForm.username}
        label="your name (optional)"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        fullWidth
        type="email"
        name="email"
        variant="outlined"
        value={inputForm.email}
        label="email"
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        fullWidth
        multiline
        rows="8"
        name="message"
        variant="outlined"
        value={inputForm.message}
        label="type here"
        onChange={handleChange}
        required
      />
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        startIcon={loading ? <CircularProgress size="1rem" /> : null}
      >
        {loading ? wait : send}
      </Button>
      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </form>
  );
};

export default ContactForm;
