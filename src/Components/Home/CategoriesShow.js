import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CategoriesInfo } from '../../Info.json';
import LoadingGif from '../LoadingGif';

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
    color: theme.palette.text.primary,
    width: '80%',
    margin: 'auto',
  },
  picture: {
    width: '100%',
  },
  img: {
    maxHeight: '8rem',
    boxShadow: `0px 10px 15px 0px ${theme.palette.text.primary}`,
  },
}));

const CategoriesShow = () => {
  const classes = useStyles();
  const { title, defaultCategories } = CategoriesInfo;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    setLoading(true);
    try {
      const TOKEN = process.env.REACT_APP_TOKEN;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };
      const res = await axios.get('/api/categories_shop', config);
      setCategories(res.data);
    } catch (err) {
      setCategories(defaultCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif big />;
  }
  return (
    <section id="categories" className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <Grid container>
        {categories.map((item) => (
          <Grid item key={uuidv4()} xs={12} sm={6} md component="article">
            <Grow in timeout={2000} appear mountOnEnter>
              <picture className={classes.picture}>
                <img className={classes.img} src={item.location} alt={item.key} />
              </picture>
            </Grow>
            <Typography className={classes.subtitle} variant="subtitle2">
              {item.title}
            </Typography>
            <Typography className={classes.text}>
              {item.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default CategoriesShow;
