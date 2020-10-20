import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Article from './Article';

const useStyles = makeStyles({
  root: {
    margin: '1rem',
  },
  title: {
    textAlign: 'center',
  },
});

const getArticlesFiltered = (articles, filters) => {
  const { category_id, featured } = filters;
  if (featured) {
    return articles.filter((article) => article.featured === true);
  }
  return articles.filter((article) => article.category_id === category_id);
};

const ArticlesBoard = ({ history, articles, categories, filters }) => {
  const classes = useStyles();
  const articlesFiltered = getArticlesFiltered(articles, filters);
  const category = categories.find((c) => c.id === filters.category_id)
    || { name: 'Featured Articles' };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <h2>{category.name}</h2>
      </Grid>
      {articlesFiltered.map((article) => (
        <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Article history={history} article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

ArticlesBoard.propTypes = {
  history: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
  filters: state.filters,
});

const ArticlesBoardWrapper = connect(mapStateToProps, null)(ArticlesBoard);

export default ArticlesBoardWrapper;
