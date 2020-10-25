import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Category from './Category';

const CategoriesBoard = ({ categories }) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="h4" align="center">
        All Categories
      </Typography>
    </Grid>
    {categories.map((category) => (
      <Grid item key={uuidv4()} xs={6} sm={4} md={3} lg={2} xl={1}>
        <Category category={category} />
      </Grid>
    ))}
  </Grid>
);

CategoriesBoard.propTypes = {
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const CategoriesBoardWrapper = connect(mapStateToProps, null)(CategoriesBoard);

export default CategoriesBoardWrapper;
