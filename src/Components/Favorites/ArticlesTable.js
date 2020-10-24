import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import updateFavorites from '../../redux/actions/updateFavorites';
import SnackbarAlert from '../SnackbarAlert';

const useStyles = makeStyles({
  root: {
    margin: '2rem',
  },
  title: {
    marginTop: '1rem',
  },
  table: {
    minWidth: 650,
  },
  row: {
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

const ArticlesTable = ({ session, articles, favorites, categories, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const arrayFavorites = favorites.reduce((array, favorite) => {
    if (favorite.status) {
      array.push(favorite.article_id);
    }
    return array;
  }, []);

  const handleSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleDelete = async (article) => {
    try {
      setLoading(true);
      const { customer } = session;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
      const favorite = favorites.find((favorite) => favorite.article_id === article.id && favorite.customer_id === customer.id);
      const payload = { status: !favorite.status };
      const token = jwt.sign(payload, process.env.REACT_APP_PRIVATE_KEY_JWT);
      await axios.put(`/api/customers/${customer.id}/favorites/${favorite.id}`, { token }, config);     
      const index = favorites.findIndex((f) => f.id === favorite.id);
      const auxFavorites = [...favorites];
      auxFavorites[index] = { ...auxFavorites[index], status: !auxFavorites[index].status };
      setLoading(false);
      updatingFavorites(auxFavorites);
      handleSnackbar(`Success!`, 'success');
    } catch (err) {
      handleSnackbar(`Error!`, 'error');
      setLoading(false);
    }
  };

  const favoriteArticles = articles.filter((article) => arrayFavorites.includes(article.id));
  const title = favoriteArticles.length === 0 ? 
    "You don't have Favorite Articles" : 'Favorite Articles';

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography variant="h4" align="center" className={classes.title}>
        {title}
      </Typography>
      <Table className={classes.table} aria-label="articles table">
        <TableBody>
          {favoriteArticles.map((article) => (
            <TableRow key={uuidv4()} className={classes.row}>
              <TableCell align="right">
                <img className={classes.img} src={article.location} alt={article.name} />
              </TableCell>
              <TableCell>
                <Typography variant="caption" gutterBottom component="small">
                  {console.log(categories)}
                  category name
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
                <IconButton aria-label="more info" onClick={() => handleDelete(article)}>
                  {loading ? <CircularProgress /> : <DeleteIcon />}
                </IconButton>
                <IconButton aria-label="more info">
                  {loading ? <CircularProgress /> : <AddShoppingCartIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </TableContainer>
  );
};

ArticlesTable.propTypes = {
  session: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  articles: state.articles,
  favorites: state.favorites,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
});

const ArticleListWrapper = connect(mapStateToProps, mapDispatchToProps)(ArticlesTable);

export default ArticleListWrapper;
