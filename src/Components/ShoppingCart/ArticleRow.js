/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';

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

const ArticleRow = ({ article, categories }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const category = categories.find((c) => c.id === article.category_id);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const config = {
        timeout: 10000,
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      };
      console.log(config);
    } catch (err) {
      console.log(err);
    } finally {
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
          <IconButton aria-label="remove item" onClick={handleDelete}>
            {loading ? <CircularProgress /> : <RemoveShoppingCartIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
    </Grow>
  );
};

ArticleRow.propTypes = {
  article: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const ArticleListWrapper = connect(mapStateToProps, null)(ArticleRow);

export default ArticleListWrapper;
