import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import BannerHome from '../Components/Home/BannerHome';
import ArticlesHome from '../Components/Home/ArticlesHome';
import CategoriesHome from '../Components/Home/CategoriesHome';
import Footer from '../Components/Footer';

const Home = ({ history }) => (
  <>
    <Navbar history={history} />
    <main>
      <BannerHome />
      <CategoriesHome />
      <ArticlesHome />
    </main>
    <Footer />
  </>
);

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
