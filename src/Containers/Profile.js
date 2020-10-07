import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserForm from '../Components/Profile/UserForm';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { ProfileInfo } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
}));

const Profile = ({ history, session }) => {
  const classes = useStyles();
  const { title } = ProfileInfo;

  const checkSession = () => {
    if (!session.isLoggedIn) {
      history.push('/session');
    }
  };

  useEffect(() => {
    checkSession();
  });

  return (
    <>
      <Navbar history={history} />
      <Container className={classes.root} component="main" maxWidth="xs">
        <Typography className={classes.title} variant="h2" gutterBottom>
          {title}
        </Typography>
        <UserForm />
      </Container>
      <Footer />
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const ProfileWrapper = connect(mapStateToProps, null)(Profile);

export default ProfileWrapper;
