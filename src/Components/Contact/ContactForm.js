import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { buttons } from '../../Info.json';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  form: {
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
  const [message, setMessage] = useState(null);
  const { wait, send } = buttons;

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const token = jwt.sign(inputForm, privateKey);
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
      const res = await axios.post('/api/mailer/sendgrid', { token }, config);
      setInputForm(defaultInputForm);
      setMessage(res.statusText);
    } catch (err) {
      console.log(err);
      setMessage('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        margin="dense"
        name="username"
        variant="outlined"
        value={inputForm.username}
        label="your name (optional)"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
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
      {message === null ? null : (
        <Typography variant="subtitle2" color="error" gutterBottom>
          {message}
        </Typography>
      )}
    </form>
  );
};

export default ContactForm;
