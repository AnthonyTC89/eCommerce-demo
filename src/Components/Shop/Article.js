/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import updateFavorites from '../../redux/actions/updateFavorites';

const useStyles = makeStyles({
  root: {
    margin: '0.5rem',
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});
const noCategory = { id: null, name: 'no category' };

const Article = ({ history, article, categories, session, favorites, updatingFavorites }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { category_id, name, location, text } = article;
  
  const category = categories.find((item) => item.id === category_id) || noCategory;
  const favorite = favorites.find((f) => f.article_id === article.id);
  const isFavorite = favorite && favorite.status;
  
  const handleClickFavorite = async (e) => {
    e.preventDefault();
    const { user, isLoggedIn } = session;
    if (isLoggedIn) {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };
        if (favorite) {
          const payload = { status: !favorite.status };
          const token = jwt.sign(payload, process.env.REACT_APP_PRIVATE_KEY_JWT);
          const res = await axios.put(`/api/favorites/${favorite.id}`, { token }, config);
          console.log(res.statusText);
          const index = favorites.findIndex((f) => f.id === favorite.id);
          const auxFavorites = [...favorites];
          auxFavorites[index] = { ...auxFavorites[index], status: !auxFavorites[index].status };
          updatingFavorites(auxFavorites);
        } else {
          const payload = { article_id: article.id, user_id: user.id };
          const token = jwt.sign(payload, process.env.REACT_APP_PRIVATE_KEY_JWT);
          const res = await axios.post('/api/favorites', { token }, config);
          updatingFavorites([...favorites, res.data]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      history.push('/session');
    }
  };

  const handleClickAddToCart = async (e) => {
    e.preventDefault();
    const { isLoggedIn } = session;
    if (isLoggedIn) {
      console.log('Add To Cart');
    } else {
      history.push('/session');
    }
  };

  return (
    <Grow in timeout={1000} appear>
      <Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={category.name}
          action={(
            <IconButton onClick={handleClickFavorite}>
              {loading ? <CircularProgress size="1rem" /> : (
                <FavoriteIcon color={isFavorite ? 'primary' : 'inherit'} />
              )}
            </IconButton>
          )}
        />
        <CardMedia image={location} title={name} className={classes.media} />
        <CardContent>
          {text}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="more info">
            <InfoIcon />
          </IconButton>
          <IconButton aria-label="add to cart" onClick={handleClickAddToCart}>
            {loading ? <CircularProgress size="1rem" /> : (
              <AddShoppingCartIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

Article.propTypes = {
  history: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  updatingFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.favorites,
  categories: state.categories,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingFavorites: (data) => dispatch(updateFavorites(data)),
});

const ArticleWrapper = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ArticleWrapper;
