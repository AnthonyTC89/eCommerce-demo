import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SignIn from '../Components/Session/SignIn';
import SignUp from '../Components/Session/SignUp';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const useStyles = makeStyles({
  paper: {
    width: 'fit-content',
    margin: '1rem auto',
    padding: '1rem',
  },
});

const Session = ({ history, session }) => {
  const classes = useStyles();
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
      <Paper component="main" className={classes.paper}>
        {showSignIn ? <SignIn history={history} handleComponent={handleComponent} />
          : <SignUp history={history} handleComponent={handleComponent} />}
      </Paper>
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
