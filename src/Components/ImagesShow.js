import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import axios from 'axios';
import LoadingGif from './LoadingGif';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2rem auto',
    padding: '2rem',
    background: '#F2F9FF',
  },
  gridList: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    margin: '1rem',
    color: theme.palette.primary.dark,
  },
  img: {
    padding: '1rem',
  },
}));

const ImagesShow = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();

  const getImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/images_home');
      setImages(res.data);
    } catch (err) {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const getGridListCols = () => {
    if (window.innerWidth > theme.breakpoints.width('xl')) {
      return 5.5;
    }

    if (window.innerWidth > theme.breakpoints.width('lg')) {
      return 4.5;
    }

    if (window.innerWidth > theme.breakpoints.width('md')) {
      return 3.5;
    }

    if (window.innerWidth > theme.breakpoints.width('sm')) {
      return 2.5;
    }
    return 1.5;
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif visible={loading} home />;
  }
  if (images.length === 0) {
    return null;
  }
  return (
    <section className={classes.root} id="gallery">
      <Typography className={classes.title} variant="h2">
        Gallery
      </Typography>
      <GridList className={classes.gridList} cols={getGridListCols()}>
        {images.map((tile) => (
          <GridListTile key={uuidv4()}>
            <img className={classes.img} src={tile.location} alt={tile.key} />
          </GridListTile>
        ))}
      </GridList>
    </section>
  );
};

export default ImagesShow;
