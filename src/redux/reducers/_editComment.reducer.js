const editCommentReducer = (state = {}, action) => {
    if (action.type === 'SET_COMMENT_TO_EDIT') {
        console.log(action.payload);
        return action.payload;
        // }  else if (action.type === 'EDIT_PRIVACY') {
        //     return {
        //         ...state, 
        //         [action.payload.property]: action.payload.value
        //     };
    } else if (action.type === 'EDIT_COMMENT_ON_CHANGE') {
        return {
            ...state,
            [action.payload.property]: action.payload.value
        };
    } else if (action.type === 'CLEAR_COMMENT_EDIT') {
        return {};
    } else if (action.type === 'LOGOUT') {
        return {};
    }
    return state;
}



export default editCommentReducer;