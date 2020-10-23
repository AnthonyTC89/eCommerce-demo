import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Grow from '@material-ui/core/Grow';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FooterInfo } from '../Info.json';

const useStyles = makeStyles({
  footer: {
    margin: '1rem auto',
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


const Footer = ({ socialNetworks }) => {
  const classes = useStyles();
  const { copyright, company } = FooterInfo;
  const year = new Date().getFullYear();

  return (
    <Grow in timeout={2000}>
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
    </Grow>
  );
};

Footer.propTypes = {
  socialNetworks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  socialNetworks: state.socialNetworks,
});

const FooterWrapper = connect(mapStateToProps, null)(Footer);

export default FooterWrapper;