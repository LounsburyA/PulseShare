const editPostReducer = (state = {}, action) => {
    if (action.type === 'SET_POST_TO_EDIT') {
        return action.payload;
    } else if (action.type === 'EDIT_POST_ON_CHANGE') {
        return {
            ...state,
            [action.payload.property]: action.payload.value
        };
    } else if (action.type === 'CLEAR_POST_EDIT') {
        return {};
    } else if (action.type === 'LOGOUT') {
        return {};
    }
    return state;
}



export default editPostReducer;