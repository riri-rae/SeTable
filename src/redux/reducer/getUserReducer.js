// A reducer need 2 pars : a initial state and action. Then need to declare action.type

const getUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'User':
            return state = action.payload;
        default:
            return state
    }
}

export default getUserReducer;