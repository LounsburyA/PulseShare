const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default commentReducer;