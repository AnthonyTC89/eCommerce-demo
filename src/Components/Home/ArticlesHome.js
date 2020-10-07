import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from '../LoadingGif';
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

const ArticlesHome = () => {
  const classes = useStyles();
  const { title, defaultArticles } = ArticlesInfo;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    setLoading(true);
    try {
      const config = {
        timeout: 10000,
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      };
      const res = await axios.get('/api/articles_home', config);
      setArticles(res.data);
    } catch (err) {
      setArticles(defaultArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif big />;
  }
  return (
    <section id="articles" className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <Grid container>
        {articles.map((item) => (
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

export default ArticlesHome;
