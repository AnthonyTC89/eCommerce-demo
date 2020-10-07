const defaultAbout = {
  id: null,
  title: '',
  text: '',
  image_id: null,
  location: '',
  key: '',
};

const about = (state = defaultAbout, { type, item }) => {
  switch (type) {
    case 'UPDATE_ABOUT':
      return item;
    default:
      return state;
  }
};

export default about;
