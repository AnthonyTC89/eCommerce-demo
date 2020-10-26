import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Category from './Category';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
  },
  title: {
    margin: '1rem',
  },
});

const CategoriesBoard = ({ categories }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4" align="center">
          All Categories
        </Typography>
      </Grid>
      {categories.map((category) => (
        <Grid item key={uuidv4()} xs={6} sm={4} md>
          <Category category={category} />
        </Grid>
      ))}
    </Grid>
  );
};

CategoriesBoard.propTypes = {
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const CategoriesBoardWrapper = connect(mapStateToProps, null)(CategoriesBoard);

export default CategoriesBoardWrapper;
