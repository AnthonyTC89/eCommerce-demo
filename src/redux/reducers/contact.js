const defaultContact = {
  id: null,
  title: '',
  email: '',
  mobile: '',
  address: '',
  zoom: '10',
  lat: '0',
  lng: '0',
  image_id: null,
  location: '',
  key: '',
};

const contact = (state = defaultContact, { type, item }) => {
  switch (type) {
    case 'UPDATE_CONTACT':
      return item;
    default:
      return state;
  }
};

export default contact;
