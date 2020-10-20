import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from '../Components/LoadingGif';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import updateAbout from '../redux/actions/updateAbout';
import { AboutInfo } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    maxHeight: window.innerHeight,
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '60%',
    boxShadow: `0px 10px 15px 0px ${theme.palette.text.primary}`,
  },
  columnImg: {
    textAlign: 'center',
  },
  columnText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    padding: '0 2rem',
    color: theme.palette.text.primary,
  },
}));

const About = ({ history, about, updatingAbout }) => {
  const classes = useStyles();
  const { title } = AboutInfo;
  const [loading, setLoading] = useState(true);

  const getAbout = async () => {
    setLoading(true);
    try {
      const TOKEN = process.env.REACT_APP_TOKEN;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };
      const res = await axios.get('/api/abouts_shop', config);
      
      if (res.data.length !== 0) {
        updatingAbout(res.data[0]);
        setLoading(false);
      } else {
        setLoading(false);
        history.push('/maintenance')
      }
    } catch (err) {
      history.push('/maintenance')
    }
  };

  useEffect(() => {
    if (about.id === null) {
      getAbout();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif />;
  }
  return (
    <>
      <Navbar history={history} />
      <main className={classes.root}>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={classes.columnText}>
            <Typography
              className={classes.text}
              component="article"
            >
              {about.text}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.columnImg}>
            <Grow in timeout={2000} appear>
              <picture className={classes.picture}>
                <img className={classes.img} src={about.location} alt={about.key} />
              </picture>
            </Grow>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </>
  );
};

About.propTypes = {
  history: PropTypes.object.isRequired,
  about: PropTypes.object.isRequired,
  updatingAbout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  about: state.about,
});

const mapDispatchToProps = (dispatch) => ({
  updatingAbout: (data) => dispatch(updateAbout(data)),
});

const AboutWrapper = connect(mapStateToProps, mapDispatchToProps)(About);

export default AboutWrapper;