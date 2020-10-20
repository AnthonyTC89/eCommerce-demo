const defaultBanner = null;

const banner = (state = defaultBanner, { type, item }) => {
  switch (type) {
    case 'UPDATE_BANNER':
      return item;
    default:
      return state;
  }
};

export default banner;
