const defaultBanner = {
  id: null,
  title: '',
  subtitle: '',
  body: '',
  caption: '',
  image_id: null,
  location: '',
  key: '',
};

const banner = (state = defaultBanner, { type, item }) => {
  switch (type) {
    case 'UPDATE_BANNER':
      return item;
    default:
      return state;
  }
};

export default banner;
