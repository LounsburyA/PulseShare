const videoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VIDEO':
            return action.payload;
        case 'CLEAR_VIDEO':
            return {};
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export default videoReducer;