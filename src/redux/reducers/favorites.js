const defaultFavorites = [];

const socialNetworks = (state = defaultFavorites, { type, data }) => {
  switch (type) {
    case 'UPDATE_FAVORITES':
      return data;
    default:
      return state;
  }
};

export default socialNetworks;
