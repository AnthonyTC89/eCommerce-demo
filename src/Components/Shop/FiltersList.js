import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import updateFilters from '../../redux/actions/updateFilters';

const FiltersList = ({ categories, filters, updatingFilters }) => {
  const handleFeatured = () => {
    updatingFilters({ ...filters, category_id: null, featured: true });
  };

  const handleCategory = (category) => {
    updatingFilters({ ...filters, category_id: category.id, featured: false });
  };

  return (
    <List component="nav">
      <ListItem button onClick={handleFeatured}>
        <ListItemIcon>
          <StarIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Featured" />
      </ListItem>
      <Divider />
      {categories.map((category) => (
        <Fragment key={uuidv4()}>
          <ListItem button onClick={() => handleCategory(category)}>
            <ListItemText primary={category.name} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

FiltersList.propTypes = {
  categories: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  updatingFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFilters: (data) => dispatch(updateFilters(data)),
});

const FiltersListWrapper = connect(mapStateToProps, mapDispatchToProps)(FiltersList);

export default FiltersListWrapper;
