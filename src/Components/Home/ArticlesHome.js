import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ArticlesInfo } from '../../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2rem auto',
    padding: '2rem',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  subtitle: {
    fontWeight: 300,
    fontSize: '2em',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  text: {
    color: theme.palette.text.secondary,
  },
  picture: {
    width: '100%',
  },
  img: {
    maxHeight: '5rem',
    boxShadow: `0px 10px 15px 0px ${theme.palette.text.primary}`,
  },
}));

const ArticlesHome = ({ articles }) => {
  const classes = useStyles();
  const { title } = ArticlesInfo;
  const articleHome = articles.filter((article) => article.featured === true);

  if (articleHome.length === 0) {
    return null;
  }
  return (
    <section id="articles" className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <Grid container>
        {articleHome.map((item) => (
          <Grid item key={uuidv4()} xs={6} sm={4} md component="article">
            <Grow in timeout={2000} appear mountOnEnter>
              <picture className={classes.picture}>
                <img className={classes.img} src={item.location} alt={item.key} />
              </picture>
            </Grow>
            <Typography className={classes.subtitle} variant="body1">
              {item.title}
            </Typography>
            <Typography className={classes.text}>
              {item.price}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

ArticlesHome.propTypes = {
  articles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
});

const ArticlesHomeWrapper = connect(mapStateToProps, null)(ArticlesHome);

export default ArticlesHomeWrapper;