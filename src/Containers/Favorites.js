import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ArticlesTable from '../Components/Favorites/ArticlesTable';
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

const Favorites = ({ history, session, updatingSession, articles, categories, favorites,
  updatingArticles, updatingCategories, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const anchorOriginSnackbar = { horizontal: 'center', vertical: 'top' };

  const configAxios = {
    timeout: 10000,
    headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
  };

  const checkSession = () => {
    if (!session.isLoggedIn) {
      history.push('/');
    }
  };

  const checkLocalStorage = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.post('/api/users/auto_login', { token }, configAxios);
        updatingSession(res.data);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  };

  const getArticles = async () => {
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
    }
  };

  const getCategories = async () => {
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
    }
  };

  const getFavorites = async () => {
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
    }
  };

  const handleCloseSnackbar = () => {
    setMessage(null);
  };

  const getInfo = async () => {
    if (articles.length === 0) {
      await getArticles();
    }
    if (categories.length === 0) {
      await getCategories();
    }
    if (favorites.length === 0) {
      await getFavorites();
    }
    setLoading(false);
  };

  useEffect(() => {
    checkSession();
  });

  useEffect(() => {
    checkLocalStorage();
    getInfo();
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

Favorites.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  updatingArticles: PropTypes.func.isRequired,
  updatingCategories: PropTypes.func.isRequired,
  updatingFavorites: PropTypes.func.isRequired,
  updatingSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  articles: state.articles,
  categories: state.categories,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  updatingArticles: (data) => dispatch(updateArticles(data)),
  updatingCategories: (data) => dispatch(updateCategories(data)),
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
  updatingSession: (session) => dispatch(updateSession(session)),
});

const FavoritesWrapper = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export default FavoritesWrapper;