const defaultFilters = {
  featured: true,
  favorites: false,
  category_id: null,
  search: '',
};

const filters = (state = defaultFilters, { type, inFilters }) => {
  switch (type) {
    case 'UPDATE_FILTERS':
      return inFilters;
    default:
      return state;
  }
};

export default filters;
