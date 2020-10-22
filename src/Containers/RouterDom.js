import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Home from './Home';
import About from './About';
import Session from './Session';
import Profile from './Profile';
import Contact from './Contact';
import Maintenance from './Maintenance';
import Shop from './Shop';
import Favorites from './Favorites';
import LoadingGif from '../Components/LoadingGif';
import updateSession from '../redux/actions/updateSession';
import updateLogo from '../redux/actions/updateLogo';
import updateBanner from '../redux/actions/updateBanner';
import updateArticles from '../redux/actions/updateArticles';
import updateCategories from '../redux/actions/updateCategories';
import updateSocialNetworks from '../redux/actions/updateSocialNetworks';

const RouterDom = ({ updatingSession, updatingLogo, updatingBanner,
  updatingArticles, updatingCategories, updatingSocialNetworks }) => {
  const [loading, setLoading] = useState(true);
  const TOKEN = process.env.REACT_APP_TOKEN;
  const config = { timeout: 50000, headers: { Authorization: `Bearer ${TOKEN}` } };

  const getLogo = async () => {
    try {
      const res = await axios.get('/api/logos_shop', config);
      if (res.data.length !== 0) {
        updatingLogo(res.data[0]);
      } 
    } catch (err) {
      // no actions
    }
  };

  const getBanner = async () => {
    try {
      const res = await axios.get('/api/banners_shop', config);
      if (res.data.length !== 0) {
        updatingBanner(res.data[0]);
      }
    } catch (err) {
      // no actions
    }
  };

  const getArticles = async () => {
    try {
      const res = await axios.get('/api/articles_shop', config);
      updatingArticles(res.data);
    } catch (err) {
      // no actions
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories_shop', config);
      updatingCategories(res.data);
    } catch (err) {
      // no actions
    }
  };

  const getSocialNetworks = async () => {
    try {
      const res = await axios.get('/api/social_networks_shop', config);
      console.log(res);
      updatingSocialNetworks(res.data);
    } catch (err) {
      // no actions
    }
  };

  const checkLocalStorage = async () => {
    const token = localStorage.getItem('customer_token');
    if (token) {
      try {
        const res = await axios.post('/api/customers/auto_login', { token }, config);
        updatingSession(res.data);
      } catch (err) {
        localStorage.removeItem('customer_token');
      }
    }
  };

  const getInfo = async () => {
    await checkLocalStorage();
    await getLogo();
    await getBanner();
    await getCategories();
    await getArticles();
    await getSocialNetworks();
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/session" component={Session} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/maintenance" component={Maintenance} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/favorites" component={Favorites} exact />
      </Switch>
    </BrowserRouter>
  );
};

RouterDom.propTypes = {
  session: PropTypes.object.isRequired,
  updatingSession: PropTypes.func.isRequired,
  updatingLogo: PropTypes.func.isRequired,
  updatingBanner: PropTypes.func.isRequired,
  updatingArticles: PropTypes.func.isRequired,
  updatingCategories: PropTypes.func.isRequired,
  updatingSocialNetworks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingSession: (session) => dispatch(updateSession(session)),
  updatingLogo: (logo) => dispatch(updateLogo(logo)),
  updatingBanner: (banner) => dispatch(updateBanner(banner)),
  updatingArticles: (data) => dispatch(updateArticles(data)),
  updatingCategories: (data) => dispatch(updateCategories(data)),
  updatingSocialNetworks: (data) => dispatch(updateSocialNetworks(data)),
});

const RouterDomWrapper = connect(mapStateToProps, mapDispatchToProps)(RouterDom);

export default RouterDomWrapper;
