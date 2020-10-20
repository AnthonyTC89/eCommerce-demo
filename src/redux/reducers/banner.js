const defaultBanner = {
  id: null,
  title: '',
  subtitle: '',
  body: '',
  caption: '',
  location: 'https://ecommerce-atc.s3-sa-east-1.amazonaws.com/banner01.jpg',
  key: "Banner",
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
