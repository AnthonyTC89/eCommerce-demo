/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import updateSession from '../../redux/actions/updateSession';
import Gravatar from '../Gravatar';
import { UserFormInfo, buttons } from '../../Info.json';

const defaultInputForm = {
  id: '',
  // username: '',
  email: '',
  password: '',
  password_confirmation: '',
};

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const UserForm = ({ session, changeSession }) => {
  const classes = useStyles();
  const [inputForm, setInputForm] = useState(defaultInputForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { update, wait } = buttons;

  const getUser = () => {
    if (session.user) {
      try {
        setLoading(true);
        const { id, username, email } = session.user;
        setInputForm({ id, username, email, password: '', password_confirmation: '' });
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
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
      const { id, username, email, password, password_confirmation } = inputForm;
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const payload = { id, username, email };
      if (password.trim() !== '') {
        if (password.trim() !== password_confirmation.trim()) {
          throw new Error(UserFormInfo.errorConfirmation);
        }
        payload.password = password;
        payload.password_confirmation = password_confirmation;
      }
      const token = jwt.sign(payload, privateKey);
      const res = await axios.put(`/api/users/${id}`, { token });
      setMessage(res.statusText);
      changeSession(res.data);
      setInputForm({ id, username, email, password: '', password_confirmation: '' });
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Gravatar email={inputForm.email} />
      {/* <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        required
        value={inputForm.username}
        name="username"
        label="username"
        onChange={handleChange}
      /> */}
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        required
        disabled
        value={inputForm.email}
        label="email"
        name="email"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        variant="outlined"
        fullWidth
        value={inputForm.password}
        name="password"
        label="password"
        type="password"
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        variant="outlined"
        required={inputForm.password !== ''}
        disabled={inputForm.password === ''}
        fullWidth
        name="password_confirmation"
        label="confirmation"
        type="password"
        value={inputForm.password_confirmation}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size="1rem" /> : null}
      >
        {loading ? wait : update}
      </Button>
      <Typography variant="subtitle2" color="error" align="center" gutterBottom>
        {message}
      </Typography>
    </form>
  );
};

UserForm.propTypes = {
  session: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const UserFormWrapper = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default UserFormWrapper;
