import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import updateSession from '../../redux/actions/updateSession';
import { SignUpInfo, buttons } from '../../Info.json';

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
}));

const defaultInputForm = {
  // username: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const SignIn = ({history, changeSession, handleComponent }) => {
  const [inputForm, setInputForm] = useState(defaultInputForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const classes = useStyles();
  const { title } = SignUpInfo;
  const { signup, wait } = buttons;

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
      const res = await axios.post('/api/customers', { token }, config);
      console.log(res);
      localStorage.setItem('customer_token', res.data.token);
      setMessage(res.statusText);
      setInputForm(defaultInputForm);
      setLoading(false);
      changeSession(res.data.customer);
      history.push('/shop');
    } catch (err) {
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
            {title}
          </Typography>
          {message === null ? null : (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {message}
            </Typography>
          )}
          <form className={classes.form} onSubmit={handleSubmit}>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={SignUpInfo.username}
              name="username"
              value={inputForm.username}
              autoComplete="username"
              onChange={handleChange}
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              label={SignUpInfo.email}
              name="email"
              value={inputForm.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={SignUpInfo.password}
              type="password"
              value={inputForm.password}
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label={SignUpInfo.confirmation}
              type="password"
              value={inputForm.password_confirmation}
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
              {loading ? wait : signup}
            </Button>
            <Button
              className={classes.link}
              type="button"
              onClick={handleComponent}
            >
              {SignUpInfo.signin}
            </Button>
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
