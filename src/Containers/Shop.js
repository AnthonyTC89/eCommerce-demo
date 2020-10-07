import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import FiltersList from '../Components/Shop/FiltersList';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CategoriesBoard from '../Components/Shop/CategoriesBoard';
import ArticlesBoard from '../Components/Shop/ArticlesBoard';
import updateArticles from '../redux/actions/updateArticles';
import updateCategories from '../redux/actions/updateCategories';
import updateFavorites from '../redux/actions/updateFavorites';
import updateSession from '../redux/actions/updateSession';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  snackbar: {
    position: 'absolute',
  },
});

const Shop = ({ history, session, updatingSession,
  updatingArticles, updatingCategories, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const anchorOriginSnackbar = { horizontal: 'center', vertical: 'top' };

  const configAxios = {
    timeout: 10000,
    headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
  };

  const checkLocalStorage = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const config = {
          timeout: 10000,
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        };
        const res = await axios.post('/api/users/auto_login', { token }, config);
        updatingSession(res.data);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  };

  const getArticles = async () => {
    // setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/articles_full', configAxios);
      updatingArticles(res.data);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
    } finally {
      // setLoading(false);
    }
  };

  const getCategories = async () => {
    // setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/categories_full', configAxios);
      updatingCategories(res.data);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
    } finally {
      // setLoading(false);
    }
  };

  const getFavorites = async () => {
    if (!session.user) {
      return;
    }
    // setLoading(true);
    setMessage(null);
    try {
      const { id } = session.user;
      const res = await axios.get(`/api/users/${id}/favorites`, configAxios);
      updatingFavorites(res.data);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
    } finally {
      // setLoading(false);
    }
  };

  // const handleCloseBackdrop = () => {
  //   setLoading(false);
  // };

  const handleCloseSnackbar = () => {
    setMessage(null);
  };

  useEffect(() => {
    checkLocalStorage();
    getArticles();
    getCategories();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line
  }, [session]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Navbar history={history} />
      <Grow in timeout={2000}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={2}>
            <FiltersList />
          </Grid>
          <Grid item xs={10}>
            <ArticlesBoard />
            <CategoriesBoard />
          </Grid>
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={anchorOriginSnackbar}
            open={message !== null}
            onClose={handleCloseSnackbar}
            message={message}
          />
        </Grid>
      </Grow>
      <Footer />
    </>
  );
};

Shop.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  updatingArticles: PropTypes.func.isRequired,
  updatingCategories: PropTypes.func.isRequired,
  updatingFavorites: PropTypes.func.isRequired,
  updatingSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingArticles: (data) => dispatch(updateArticles(data)),
  updatingCategories: (data) => dispatch(updateCategories(data)),
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
  updatingSession: (session) => dispatch(updateSession(session)),
});

const ShopWrapper = connect(mapStateToProps, mapDispatchToProps)(Shop);

export default ShopWrapper;
