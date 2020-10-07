import React from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

const Gravatar = ({ email }) => {
  const hash = CryptoJS.MD5(email);
  const gravatar = `https://www.gravatar.com/avatar/${hash}`;
  const hrefGravatar = 'https://en.gravatar.com/site/login';
  return (
    <Link href={hrefGravatar} target="_blank" rel="noopener noreferrer">
      <Avatar src={gravatar} alt="gravatar" />
    </Link>
  );
};

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Gravatar;
