import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { BannerInfo } from '../../Info.json';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxHeight: window.innerHeight * 0.8,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: '33%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'aliceblue',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '8vw',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '4.8vw',
  },
  body: {
    fontWeight: 'bold',
    fontSize: '3.2vw',
  },
  caption: {
    fontWeight: 'bold',
    fontSize: '1.6vw',
  },
});

const BannerHome = ({ banner }) => {
  const classes = useStyles();
  const { defaultBanner } = BannerInfo;
  const bannerShow = banner ? banner : defaultBanner;

  return (
    <section className={classes.root} id="home">
      <Grow in timeout={2000}>
        <picture className={classes.picture}>
          <img className={classes.img} src={bannerShow.location} alt={bannerShow.key} />
        </picture>
      </Grow>
      <div className={classes.text}>
        {bannerShow.subtitle.trim() === '' ? null : (
          <Typography className={classes.subtitle} variant="subtitle2" gutterBottom>
            {bannerShow.subtitle}
          </Typography>
        )}
        {bannerShow.title.trim() === '' ? null : (
          <Typography className={classes.title} variant="h2" gutterBottom>
            {bannerShow.title}
          </Typography>
        )}
        {bannerShow.body.trim() === '' ? null : (
          <Typography className={classes.body} variant="body1" gutterBottom>
            {bannerShow.body}
          </Typography>
        )}
        {bannerShow.caption.trim() === '' ? null : (
          <Typography className={classes.caption} variant="caption" gutterBottom>
            {bannerShow.caption}
          </Typography>
        )}
      </div>
    </section>
  );
};

BannerHome.propTypes = {
  banner: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  banner: state.banner,
});

const BannerHomeWrapper = connect(mapStateToProps, null)(BannerHome);

export default BannerHomeWrapper;
