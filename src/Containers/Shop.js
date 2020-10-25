import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import LoadingGif from '../Components/LoadingGif';
import FiltersList from '../Components/Shop/FiltersList';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CategoriesBoard from '../Components/Shop/CategoriesBoard';
import ArticlesBoard from '../Components/Shop/ArticlesBoard';
import updateArticles from '../redux/actions/updateArticles';
import updateCategories from '../redux/actions/updateCategories';
import updateFavorites from '../redux/actions/updateFavorites';
import SnackbarAlert from '../Components/SnackbarAlert';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
});

const Shop = ({ history, session, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getFavorites = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { customer } = session;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
      const res = await axios.get(`/api/customers/${customer.id}/favorites`, config);
      updatingFavorites(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.isLoggedIn) {
      getFavorites();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif />;
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
            <ArticlesBoard history={history}/>
            <CategoriesBoard />
          </Grid>
          <SnackbarAlert
            open={message !== ''}
            message={message}
            severity='error'
            onClose={() => setMessage('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
