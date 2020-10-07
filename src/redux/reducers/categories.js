const defaultCategories = [];

const products = (state = defaultCategories, { type, data }) => {
  switch (type) {
    case 'UPDATE_CATEGORIES':
      return data;
    default:
      return state;
  }
};

export default products;
