const postListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST_LIST':
            return action.payload;
        case 'SET_KEYWORD_POSTS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default postListReducer;