const postHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POST_HISTORY':
            return action.payload;
        case 'RESET_ALL':
            return [];
        default:
            return state;
    }
};

export default postHistoryReducer;