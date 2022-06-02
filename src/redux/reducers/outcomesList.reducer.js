const outcomesListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OUTCOMES_LIST':
            return action.payload;
        default:
            return state;
    }
};
    
export default outcomesListReducer;