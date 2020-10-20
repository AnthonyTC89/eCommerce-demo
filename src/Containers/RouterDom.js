import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import updateSession from '../redux/actions/updateSession';
import Home from './Home';
import About from './About';
import Session from './Session';
import Profile from './Profile';
import Contact from './Contact';
import Maintenance from './Maintenance';
import Shop from './Shop';
import Favorites from './Favorites';

const RouterDom = ({ updatingSession }) => {

  const checkLocalStorage = async () => {
    const token = localStorage.getItem('user_token');
    if (token) {
      try {
        const config = {
          timeout: 10000,
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        };
        const res = await axios.post('/api/users/auto_login', { token }, config);
        updatingSession(res.data);
      } catch (err) {
        localStorage.removeItem('user_token');
      }
    }
  };

  useEffect(() => {
    checkLocalStorage();
    // eslint-disable-next-line
  }, []);

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
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updatingSession: (session) => dispatch(updateSession(session)),
});

const RouterDomWrapper = connect(mapStateToProps, mapDispatchToProps)(RouterDom);

export default RouterDomWrapper;
