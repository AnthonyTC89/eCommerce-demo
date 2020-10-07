import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import images from './reducers/images';
import logo from './reducers/logo';
import banner from './reducers/banner';
import about from './reducers/about';
import contact from './reducers/contact';
import categories from './reducers/categories';
import articles from './reducers/articles';
import socialNetworks from './reducers/socialNetworks';
import filters from './reducers/filters';
import favorites from './reducers/favorites';

const reducer = combineReducers({
  session,
  images,
  logo,
  banner,
  about,
  contact,
  categories,
  articles,
  socialNetworks,
  filters,
  favorites,
});

const store = createStore(reducer);

export default store;
