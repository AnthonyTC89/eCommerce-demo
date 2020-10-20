import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GoogleMapsAPI from '../Components/Contact/GoogleMapsAPI';
import ContactForm from '../Components/Contact/ContactForm';
import LoadingGif from '../Components/LoadingGif';
import updateContact from '../redux/actions/updateContact';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.text.primary,
  },
  picture: {
    textAlign: 'center',
  },
  image: {
    width: '10rem',
  },
}));

const Contact = ({ history, contact, updatingContact }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const getContact = async () => {
    setLoading(true);
    try {
      const TOKEN = process.env.REACT_APP_TOKEN;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };
      const res = await axios.get('/api/contacts_shop', config);
      if (res.data.length !== 0) {
        updatingContact(res.data[0]);
        setLoading(false);
      } else {
        setLoading(false);
        history.push('/maintenance')
      }
    } catch (err) {
      setLoading(false);
        history.push('/maintenance')
    }
  };

  useEffect(() => {
    if (contact.id === null) {
      getContact();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif />;
  }
  return (
    <>
      <Navbar history={history} />
      <Grow in timeout={2000}>
        <Grid container justify="space-evenly" alignItems="center" component="main">
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2">
              {contact.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6} className={classes.picture}>
            {contact.googleMapsKey === ''
              ? <img className={classes.image} src={contact.location} alt="contact" />
              : (
                <GoogleMapsAPI
                  zoom={contact.zoom}
                  lat={contact.lat}
                  lng={contact.lng}
                  googleMapsKey={contact.googleMapsKey}
                />
              )}
          </Grid>
        </Grid>
      </Grow>
      <Footer />
    </>
  );
};

Contact.propTypes = {
  history: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  updatingAbout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

const mapDispatchToProps = (dispatch) => ({
  updatingContact: (data) => dispatch(updateContact(data)),
});

const AboutWrapper = connect(mapStateToProps, mapDispatchToProps)(Contact);

export default AboutWrapper;