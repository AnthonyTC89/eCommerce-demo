const defaultSocialNetworks = [];

const socialNetworks = (state = defaultSocialNetworks, { type, data }) => {
  switch (type) {
    case 'UPDATE_SOCIAL_NETWORKS':
      return data;
    default:
      return state;
  }
};

export default socialNetworks;
