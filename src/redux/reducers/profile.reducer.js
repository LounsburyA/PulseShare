const profileReducer = (state= {}, action )=>{
    if (action.type === 'CLEAR_PROFILE')
    return {};
    else if (action.type === 'SET_PROFILE'){
        return action.payload;
    }else{
        return state;
    }
}
export default profileReducer;