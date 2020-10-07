import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import updateCategories from '../../redux/actions/updateCategories';
import Category from './Category';

const useStyles = makeStyles({
  root: {

  },
});

const TOKEN = process.env.REACT_APP_TOKEN;

const CategoriesBoard = ({ categories, updatingCategories }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getCategories = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };
      const res = await axios.get('/api/categories_full', config);
      if (res.data.length !== 0) {
        updatingCategories(res.data);
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    // eslint-disable-next-line
  }, [categories]);

  return (
    <Grid container className={classes.root}>
      {message ? <h6>{message}</h6> : null}
      {loading ? <CircularProgress /> : null}
      <Grid item xs={12}>
        <h2>All Categories</h2>
      </Grid>
      {categories.map((category) => (
        <Grid item key={uuidv4()} xs={6} sm={4} md={3} lg={2} xl={1}>
          <Category category={category} />
        </Grid>
      ))}
    </Grid>
  );
};

CategoriesBoard.propTypes = {
  categories: PropTypes.array.isRequired,
  updatingCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingCategories: (data) => dispatch(updateCategories(data)),
});

const CategoriesBoardWrapper = connect(mapStateToProps, mapDispatchToProps)(CategoriesBoard);

export default CategoriesBoardWrapper;
