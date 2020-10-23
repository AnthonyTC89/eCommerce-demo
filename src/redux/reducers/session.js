const defaultSession = {
  customer: null,
  isLoggedIn: false,
};

const session = (state = defaultSession, { type, customer }) => {
  switch (type) {
    case 'UPDATE_SESSION':
      if (customer === null) {
        return defaultSession;
      }
      return { customer, isLoggedIn: true };
    default:
      return state;
  }
};

export default session;
