import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import SignIn from '../Components/Session/SignIn';
import SignUp from '../Components/Session/SignUp';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Session = ({ history, session }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  const checkSession = () => {
    if (session.isLoggedIn) {
      history.push('/profile');
    }
  };

  useEffect(() => {
    checkSession();
  });

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
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const SessionWrapper = connect(mapStateToProps, null)(Session);

export default SessionWrapper;
