import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { buttons } from '../../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    padding: '2rem',
  },
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
  from_name: '',
  from_email: '',
  message_html: '',
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
    // eslint-disable-next-line no-console
    console.log(inputForm);
    setMessage(null);
    setInputForm(defaultInputForm);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        margin="dense"
        name="from_name"
        variant="outlined"
        id="from_name"
        value={inputForm.from_name}
        label="your name (optional)"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        type="email"
        name="from_email"
        variant="outlined"
        id="from_email"
        value={inputForm.from_email}
        label="email"
        onChange={handleChange}
        required
      />
      <TextField
        margin="dense"
        multiline
        rows="8"
        name="message_html"
        variant="outlined"
        id="message_html"
        value={inputForm.message_html}
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
