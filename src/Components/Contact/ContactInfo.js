import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
  info: {
    margin: '2rem auto',
  },
});

const ContactInfo = ({ contact }) => {
  const classes = useStyles();
  const { mobile, address, email } = contact;
  return (
    <Container className={classes.container}>
      <div className={classes.info}>
        <EmailIcon color="primary"/>
        <Typography variant="body1">
          {email}
        </Typography>
      </div>
      <div className={classes.info}>
        <PhoneIcon color="primary"/>
        <Typography variant="body1">
          {mobile}
        </Typography>
      </div>
      <div className={classes.info}>
        <LocationOnIcon color="primary" />
        <Typography variant="body1">
          {address}
        </Typography>
      </div>
    </Container>
  )
}

ContactInfo.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactInfo;
