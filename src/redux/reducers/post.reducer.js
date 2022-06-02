const postReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_POST':
      return action.payload;
    case 'CLEAR_POST':
      return {};
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default postReducer;