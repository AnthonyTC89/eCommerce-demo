import React from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

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
});

const ArticlesTable = ({ articles, shoppingCart }) => {
  const classes = useStyles();
  const arrayShoppingCart = shoppingCart.reduce((array, cart) => {
    if (cart.status) {
      array.push(cart.article_id);
    }
    return array;
  }, []);
  const shoppingCartArticles = articles.filter((article) => arrayShoppingCart.includes(article.id));

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography variant="h4" align="center" className={classes.title}>
        Favorite Articles
      </Typography>
      <Table className={classes.table} aria-label="articles table">
        <TableBody>
          {shoppingCartArticles.map((article) => (
            <p>{article.name}</p>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ArticlesTable.propTypes = {
  articles: PropTypes.array.isRequired,
  shoppingCart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  shoppingCart: state.shoppingCart,
  categories: state.categories,
});

const ArticleListWrapper = connect(mapStateToProps, null)(ArticlesTable);

export default ArticleListWrapper;
