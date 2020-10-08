import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from './Home';
import About from './About';
import Session from './Session';
import Profile from './Profile';
import Contact from './Contact';
import Maintenance from './Maintenance';
import Shop from './Shop';
import Favorites from './Favorites';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
