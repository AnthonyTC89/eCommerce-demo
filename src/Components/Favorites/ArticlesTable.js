import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import ArticleRow from './ArticleRow';

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

const ArticlesTable = ({ articles, favorites }) => {
  const classes = useStyles();

  const arrayFavorites = favorites.reduce((array, favorite) => {
    if (favorite.status) {
      array.push(favorite.article_id);
    }
    return array;
  }, []);
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
            <ArticleRow key={uuidv4()} article={article} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ArticlesTable.propTypes = {
  articles: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  favorites: state.favorites,
  categories: state.categories,
});

const ArticleListWrapper = connect(mapStateToProps, null)(ArticlesTable);

export default ArticleListWrapper;
