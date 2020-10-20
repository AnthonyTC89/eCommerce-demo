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

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  snackbar: {
    position: 'absolute',
  },
});

const Shop = ({ history, session, updatingArticles, updatingCategories, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const anchorOriginSnackbar = { horizontal: 'center', vertical: 'top' };

  const config = {
    timeout: 10000,
    headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
  };

  const getArticles = async () => {
    setMessage(null);
    try {
      const res = await axios.get('/api/articles_shop', config);
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
      const res = await axios.get('/api/categories_shop', config);
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
    if (!session.user) {
      return;
    }
    setMessage(null);
    try {
      const { id } = session.user;
      const res = await axios.get(`/api/customers/${id}/favorites`, config);
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

  useEffect(() => {
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
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingArticles: (data) => dispatch(updateArticles(data)),
  updatingCategories: (data) => dispatch(updateCategories(data)),
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
});

const ShopWrapper = connect(mapStateToProps, mapDispatchToProps)(Shop);

export default ShopWrapper;
