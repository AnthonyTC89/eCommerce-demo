import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grow from '@material-ui/core/Grow';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import updateSession from '../../redux/actions/updateSession';
import { SignInInfo, buttons } from '../../Info.json';
import FacebookButton from './FacebookButton';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnLink: {
    textTransform: 'none',
  },
  oAuthGroup: {
    textAlign: 'center',
    marginTop: '1rem',
  },
}));

const defaultInputForm = {
  email: '',
  password: '',
};

const SignIn = ({ history, changeSession, handleComponent }) => {
  const classes = useStyles();
  const [inputForm, setInputForm] = useState(defaultInputForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { signin, wait } = buttons;

  const handleCallbackFacebook = (response) => {
    console.log(response);
  };

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const token = jwt.sign(inputForm, privateKey);
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
      const res = await axios.post('/api/customers/login', { token }, config);
      localStorage.setItem('customer_token', res.data.token);
      setMessage(res.statusText);
      setInputForm(defaultInputForm);
      setLoading(false);
      changeSession(res.data.customer);
      history.push('/shop');
    } catch (err) {
      console.log(err.response)
      setMessage(err.response.statusText);
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={2000}>
      <Container component="section" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h5" color="primary">
            {SignInInfo.title}
          </Typography>
          {message === null ? null : (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {message}
            </Typography>
          )}
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              type="email"
              label={SignInInfo.email}
              name="email"
              value={inputForm.email}
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label={SignInInfo.password}
              type="password"
              value={inputForm.password}
              autoComplete="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size="1rem" /> : null}
            >
              {loading ? wait : signin}
            </Button>
            <Button
              className={classes.btnLink}
              type="button"
              onClick={handleComponent}
            >
              {SignInInfo.signup}
            </Button>
            <Divider />
            <div className={classes.oAuthGroup}>
              <FacebookButton handleCallback={handleCallbackFacebook} textButton="Login with Facebook" />
            </div>
          </form>
        </div>
      </Container>
    </Grow>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
  handleComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const SignInWrapper = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInWrapper;
