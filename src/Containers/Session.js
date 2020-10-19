import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import SignIn from '../Components/Session/SignIn';
import SignUp from '../Components/Session/SignUp';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import updateSession from '../redux/actions/updateSession';

const Session = ({ history, session, updatingSession }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const checkSession = () => {
    if (session.isLoggedIn) {
      history.push('/profile');
    }
  };

  const checkLocalStorage = async () => {
    const token = localStorage.getItem('user_token');
    if (token) {
      try {
        const config = {
          timeout: 10000,
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        };
        const res = await axios.post('/api/users/auto_login', { token }, config);
        updatingSession(res.data);
      } catch (err) {
        localStorage.removeItem('user_token');
      }
    }
  };

  const handleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  useEffect(() => {
    checkSession();
  });

  useEffect(() => {
    checkLocalStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar history={history} />
      <Grid container justify="center" alignItems="center" component="main">
        <Grid item>
          {showSignIn ? <SignIn history={history} handleComponent={handleComponent} />
            : <SignUp history={history} handleComponent={handleComponent} />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

Session.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  updatingSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingSession: (session) => dispatch(updateSession(session)),
});

const SessionWrapper = connect(mapStateToProps, mapDispatchToProps)(Session);

export default SessionWrapper;
