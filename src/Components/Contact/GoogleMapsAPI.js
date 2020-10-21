import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import GoogleMaps from './GoogleMaps';

const GoogleMapsAPI = ({ zoom, lat, lng, googleMapsKey }) => {
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleMapsKey}`;
  const containerElement = <div style={{ height: '100%' }} />;
  const mapElement = <div style={{ height: '100%' }} />;
  const loadingElement = <CircularProgress />;

  return (
    <GoogleMaps
      googleMapURL={googleMapURL}
      containerElement={containerElement}
      mapElement={mapElement}
      loadingElement={loadingElement}
      zoom={zoom}
      lat={parseFloat(lat)}
      lng={parseFloat(lng)}
    />
  );
};

GoogleMapsAPI.propTypes = {
  zoom: PropTypes.number.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  googleMapsKey: PropTypes.string.isRequired,
};

export default GoogleMapsAPI;
