import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import updateSession from '../redux/actions/updateSession';
import LoadingGif from './LoadingGif';
import { NavbarInfo } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    width: '1.5rem',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    marginLeft: '0',
  },
  nav: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    width: 'auto',
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 'auto',
    marginRight: '0',
  },
  link: {
    margin: '1rem',
    alignSelf: 'center',
    display: 'flex',
  },
  img: {
    width: '2rem',
  },
}));

const Navbar = ({ history, changeSession }) => {
  const classes = useStyles();
  const [logo, setLogo] = useState({});
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { navItems, defaultLogo } = NavbarInfo;

  const handleLogout = () => {
    changeSession(null);
    history.push('/');
  };

  const handleHistory = (path) => {
    history.push(path);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getLogo = async () => {
    setLoading(true);
    try {
      const config = {
        timeout: 10000,
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      };
      const res = await axios.get('/api/logos_home', config);
      if (res.data.length !== 0) {
        setLogo(res.data[0]);
      } else {
        setLogo(defaultLogo);
      }
    } catch (err) {
      setLogo(defaultLogo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogo();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif big />;
  }
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Container disableGutters className={classes.menu}>
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              color="inherit"
              aria-label="open drawer"
              className={classes.drawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              {logo.text}
            </Typography>
          </Container>
          <Hidden smDown>
            <Grid container className={classes.nav}>
              <Button
                onClick={() => handleHistory('/about')}
                className={classes.navItem}
                color="inherit"
              >
                {navItems.about}
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                onClick={() => handleHistory('/maintenance')}
                className={classes.navItem}
                color="inherit"
              >
                {navItems.blog}
              </Button>
              <Divider orientation="vertical" flexItem />
              <IconButton onClick={() => handleHistory('/')} color="inherit" aria-label="shopping-cart">
                {logo.location === '' || logo.location === null ? <HomeIcon />
                  : <img className={classes.logo} src={logo.location} alt={logo.key} />}
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <Button
                onClick={() => handleHistory('/shop')}
                className={classes.navItem}
                color="inherit"
              >
                {navItems.shop}
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                onClick={() => handleHistory('/contact')}
                className={classes.navItem}
                color="inherit"
              >
                {navItems.contact}
              </Button>
            </Grid>
          </Hidden>
          <Container className={classes.icons} disableGutters>
            <IconButton onClick={() => handleHistory('/favorites')} color="inherit">
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleHistory('/maintenance')} color="inherit">
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleHistory('/maintenance')} color="inherit">
              <LocalShippingIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleHistory('/session')} color="inherit">
              <AccountCircleIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleHistory('/dashboard')} color="inherit">
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleLogout} color="inherit">
              <ExitToAppIcon fontSize="small" />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Button
          onClick={handleDrawerClose}
          className={classes.link}
        >
          About Us
        </Button>
        <Button
          onClick={handleDrawerClose}
          className={classes.link}
        >
          Shop
        </Button>
        <Button
          onClick={handleDrawerClose}
          className={classes.link}
        >
          Contact
        </Button>
      </Drawer>
    </>
  );
};

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const NavbarWrapper = connect(null, mapDispatchToProps)(Navbar);

export default NavbarWrapper;
