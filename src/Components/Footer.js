import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoadingGif from './LoadingGif';
import { FooterInfo, SocialNetworksInfo } from '../Info.json';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
    bottom: 0,
    width: '100%',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '2rem',
    margin: '0.5rem',
  },
});


const Footer = () => {
  const classes = useStyles();
  const { copyright, company } = FooterInfo;
  const { socialNetworksDefault } = SocialNetworksInfo;
  const [loading, setLoading] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const year = new Date().getFullYear();

  const getSocialNetworks = async () => {
    setLoading(true);
    try {
      const TOKEN = process.env.REACT_APP_TOKEN;
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${TOKEN}` } };
      const res = await axios.get('/api/social_networks_shop', config);
      setSocialNetworks(res.data);
    } catch (err) {
      setSocialNetworks(socialNetworksDefault);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSocialNetworks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif big />;
  }
  return (
    <footer className={classes.footer}>
      <CssBaseline />
      {socialNetworks.length === 0 ? null : (
        <div className={classes.list}>
          {socialNetworks.map((item) => (
            <a
              key={uuidv4()}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.icon} src={item.src} alt={`${item.name}-icon`} />
            </a>
          ))}
        </div>
      )}
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          {`${year} © ${company}` }
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {copyright}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
