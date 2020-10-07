const defaultArticles = [];

const articles = (state = defaultArticles, { type, data }) => {
  switch (type) {
    case 'UPDATE_ARTICLES':
      return data;
    default:
      return state;
  }
};

export default articles;
