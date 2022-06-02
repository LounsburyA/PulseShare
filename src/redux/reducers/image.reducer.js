const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_IMAGE':
            return action.payload;
        case 'CLEAR_IMAGE':
            return {};
        default:
            return state;
    }
};
    
export default imageReducer;
    