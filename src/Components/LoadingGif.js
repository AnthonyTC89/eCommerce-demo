import React from 'react';
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
});

const LoadingGif = () => {
  const classes = useStyles();
  return (
    <picture className={classes.big}>
      <CircularProgress />
    </picture>
  );
};

export default LoadingGif;
