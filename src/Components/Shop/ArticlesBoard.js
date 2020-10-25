import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Article from './Article';


const useStyles = makeStyles({
  root: {
    padding: '1rem',
  },
  title: {
    margin: '1rem',
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

  const checkArticles = () => {
    if (articles.length === 0) {
      history.push('/maintenance');
    }
  };

  useEffect(() => {
    checkArticles();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4" align="center">
          {category.name}
        </Typography>
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
