import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import RouterDom from './RouterDom';

const App = () => (
  <Provider store={store}>
    <RouterDom />
  </Provider>
);

export default App;
