import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ArticlesTable from '../Components/Favorites/ArticlesTable';
import updateFavorites from '../redux/actions/updateFavorites';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  snackbar: {
    position: 'absolute',
  },
});

const Favorites = ({ history, session, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const TOKEN = process.env.REACT_APP_TOKEN;
  const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };

  const getFavorites = async () => {
    try {
      const { customer } = session;
      const res = await axios.get(`/api/customers/${customer.id}/favorites`, config);
      updatingFavorites(res.data);
    } catch (err) {
      // no actions
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session.isLoggedIn) {
      history.push('/session');
    } else {
      getFavorites();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Navbar history={history} />
      <Grow in timeout={2000}>
        <Grid container component="main" className={classes.root}>
          <ArticlesTable />
        </Grid>
      </Grow>
      <Footer />
    </>
  );
};

Favorites.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  updatingFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
});

const FavoritesWrapper = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export default FavoritesWrapper;
