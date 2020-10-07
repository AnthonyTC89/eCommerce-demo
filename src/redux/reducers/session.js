const defaultSession = {
  user: {
    id: 1,
    email: 'user1@gmail.com',
    status: 3,
    username: 'user1',
  },
  isLoggedIn: true,
};

const session = (state = defaultSession, { type, user }) => {
  switch (type) {
    case 'UPDATE_SESSION':
      if (user === null) {
        return defaultSession;
      }
      return { user, isLoggedIn: true };
    default:
      return state;
  }
};

export default session;
