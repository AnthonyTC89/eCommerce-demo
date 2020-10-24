/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Typography } from '@material-ui/core';
import updateFavorites from '../../redux/actions/updateFavorites';

const useStyles = makeStyles({
  root: {
    margin: '1rem',
  },
  img: {
    width: '100%',
    minWidth: '10rem',
    maxWidth: '20rem',
  },
  cellCost: {
    minWidth: '10rem',
  },
});

const ArticleRow = ({ session, article, categories, favorites, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const category = categories.find((c) => c.id === article.category_id);
  const favorite = favorites.find((f) => f.article_id === article.id);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const config = {
        timeout: 10000,
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      };
      const { customer } = session;
      const payload = { status: !favorite.status };
      const token = jwt.sign(payload, process.env.REACT_APP_PRIVATE_KEY_JWT);
      await axios.put(`/api/customers/${customer.id}/favorites/${favorite.id}`, { token }, config);     
      const index = favorites.findIndex((f) => f.id === favorite.id);
      const auxFavorites = [...favorites];
      auxFavorites[index] = { ...auxFavorites[index], status: !auxFavorites[index].status };
      setLoading(false);
      updatingFavorites(auxFavorites);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1000} appear>
      <TableRow className={classes.root}>
        <TableCell align="right">
          <img className={classes.img} src={article.location} alt={article.name} />
        </TableCell>
        <TableCell>
          <Typography variant="caption" gutterBottom component="small">
            {category.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {article.name}
          </Typography>
          <Typography gutterBottom>
            {article.text}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.cellCost}>
          <Typography variant="h6" gutterBottom>
            Price (S/)
          </Typography>
          <Typography gutterBottom>
            {article.cost}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="more info" onClick={handleDelete}>
            {loading ? <CircularProgress /> : <DeleteIcon />}
          </IconButton>
          <IconButton aria-label="more info">
            {loading ? <CircularProgress /> : <AddShoppingCartIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </Grow>
  );
};

ArticleRow.propTypes = {
  session: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  updatingFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
});

const ArticleListWrapper = connect(mapStateToProps, mapDispatchToProps)(ArticleRow);

export default ArticleListWrapper;
