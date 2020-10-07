import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  big: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    height: window.innerHeight,
    marginTop: window.innerHeight / 3,
  },
  small: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
});

const LoadingGif = ({ big }) => {
  const classes = useStyles();
  return (
    <picture className={big ? classes.big : classes.small}>
      <CircularProgress />
    </picture>
  );
};

LoadingGif.propTypes = {
  big: PropTypes.bool,
};

LoadingGif.defaultProps = {
  big: false,
};

export default LoadingGif;
