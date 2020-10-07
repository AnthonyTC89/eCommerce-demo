import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import BannerShow from '../Components/Home/BannerShow';
import ArticlesHome from '../Components/Home/ArticlesHome';
import CategoriesShow from '../Components/Home/CategoriesShow';
import Footer from '../Components/Footer';

const Home = ({ history }) => (
  <>
    <Navbar history={history} />
    <main>
      <BannerShow />
      <CategoriesShow />
      <ArticlesHome />
    </main>
    <Footer />
  </>
);

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
