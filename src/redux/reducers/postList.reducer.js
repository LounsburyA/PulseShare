const postListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default postListReducer;