const defaultLogo = {
  id: null,
  text: '',
  image_id: null,
  location: '',
  key: '',
};

const logo = (state = defaultLogo, { type, item }) => {
  switch (type) {
    case 'UPDATE_LOGO':
      return item;
    default:
      return state;
  }
};

export default logo;
