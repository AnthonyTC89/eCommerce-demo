import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import maintenance from '../Images/maintenance.jpg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxHeight: window.innerHeight,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
});

const Maintenance = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Navbar history={history} />
      <main className={classes.root}>
        <Grow in timeout={2000}>
          <picture className={classes.picture}>
            <img className={classes.img} src={maintenance} alt="maintenance" />
          </picture>
        </Grow>
      </main>
      <Footer />
    </>
  );
};

Maintenance.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Maintenance;
