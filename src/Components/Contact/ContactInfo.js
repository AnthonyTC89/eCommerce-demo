import React from 'react';
import PropTypes from 'prop-types';

const ContactInfo = ({ contact }) => {
  return (
    <div>
      Contact Info
    </div>
  )
}

ContactInfo.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactInfo;
