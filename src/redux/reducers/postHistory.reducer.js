const postHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST_HISTORY':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default postHistoryReducer;