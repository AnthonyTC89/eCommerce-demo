import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Typography } from '@material-ui/core';
import updateFilters from '../../redux/actions/updateFilters';

const useStyles = makeStyles({
  root: {
    margin: '0.5rem',
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: 'x-large',
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
  },
});

const Category = ({ category, filters, updatingFilters }) => {
  const classes = useStyles();

  const handleClick = () => {
    updatingFilters({ ...filters, category_id: category.id });
    window.scrollTo(0, 0);
  };

  return (
    <ButtonBase onClick={handleClick} className={classes.root}>
      <img className={classes.img} src={category.location} alt={category.name} />
      <Typography component="span" className={classes.text}>
        {category.name}
      </Typography>
    </ButtonBase>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updatingFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFilters: (data) => dispatch(updateFilters(data)),
});

const CategoryWrapper = connect(mapStateToProps, mapDispatchToProps)(Category);

export default CategoryWrapper;
