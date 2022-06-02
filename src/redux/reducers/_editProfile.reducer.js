const editProfileReducer = (state = {}, action) => {
    if (action.type === 'SET_PROFILE_TO_EDIT') {
        console.log(action.payload);
        return action.payload;
    } else if (action.type === 'EDIT_PRIVACY') {
        return {
            ...state,
            [action.payload.property]: action.payload.value
        };
    } else if (action.type === 'EDIT_ON_CHANGE') {
        return {
            ...state,
            [action.payload.property]: action.payload.value
        };
    } else if (action.type === 'CLEAR_EDIT') {
        return {};
    } else if (action.type === 'LOGOUT') {
        return {};
    }
    return state;
}



export default editProfileReducer;
